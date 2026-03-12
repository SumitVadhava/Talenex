import { createContext, useContext, useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { UserContext } from "./UserContext";
import api from "@/api/axios";
import qs from "qs";

const ChatContext = createContext();

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export const ChatProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [activeChannel, setActiveChannel] = useState(null);
    const [pendingChannelCid, setPendingChannelCid] = useState(null);
    const { userData, authVersion } = useContext(UserContext);
    const [totalUnreadCount, setTotalUnreadCount] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token || authVersion === 0) {
            return;
        }

        const init = async () => {
            // console.log("[ChatContext] Auth ready (v" + authVersion + "), initializing Stream...");
            try {

                const res = await api.get(`/User/Details/${userId}`, {
                    params: { include: ["Profile"] },
                    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
                });
                const backendUserData = res.data;
                // console.log("[ChatContext] Backend user data fetched for Stream profile sync.");

                const chatClient = StreamChat.getInstance(apiKey);

                if (chatClient.userID === userId) {
                    // console.log("[ChatContext] User already connected to Stream:", userId);
                    setClient(chatClient);
                    return;
                }

                if (chatClient.userID) {
                    // console.log("[ChatContext] Connection mismatch, disconnecting old user:", chatClient.userID);
                    await chatClient.disconnectUser();
                }
                // console.log("[ChatContext] Requesting Stream token from backend...");
                const streamTokenRes = await api.get("/stream/token");
                const streamToken = streamTokenRes.data.token;

                if (!streamToken) {
                    throw new Error("Stream token came back null/empty");
                }

                // console.log("[ChatContext] Connecting to Stream...");
                await chatClient.connectUser(
                    {
                        id: userId,
                        name: backendUserData.profile?.fullName || backendUserData.fullName || "User",
                        image: backendUserData.profile?.profilePhotoUrl || backendUserData.profilePhotoUrl || "",
                    },
                    streamToken,
                    { presence: true }
                );


                // console.log("[ChatContext] Stream connected successfully for:", userId);
                setClient(chatClient);
            } catch (err) {
                console.error("[ChatContext] STREAM ERROR:", err);
            }
        };

        init();

        return () => {
        };
    }, [authVersion]);

    useEffect(() => {
        if (!client) return;

        setTotalUnreadCount(client.user?.total_unread_count || 0);

        const handleUnreadChange = (e) => {
            setTotalUnreadCount(e.total_unread_count || 0);
        };

        client.on("notification.message_new", handleUnreadChange);
        client.on("notification.mark_read", handleUnreadChange);

        return () => {
            client.off("notification.message_new", handleUnreadChange);
            client.off("notification.mark_read", handleUnreadChange);
        };
    }, [client]);

    return (
        <ChatContext.Provider
            value={{ client, setClient, activeChannel, setActiveChannel, pendingChannelCid, setPendingChannelCid, totalUnreadCount }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useTalenexChat = () => useContext(ChatContext);
