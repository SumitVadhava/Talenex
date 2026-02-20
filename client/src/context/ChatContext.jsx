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
    // pendingChannelCid: the channel that should be pinned to top + opened
    // when navigating from a profile's "Message" button
    const [pendingChannelCid, setPendingChannelCid] = useState(null);
    const { userData, authVersion } = useContext(UserContext);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // We need both a userId from our backend and a signal that auth is ready
        if (!userId || !token || authVersion === 0) {
            return;
        }

        const init = async () => {
            console.log("[ChatContext] Auth ready (v" + authVersion + "), initializing Stream...");
            try {
                // Fetch the latest profile data from our backend to ensure Stream has correct name/image
                const res = await api.get(`/User/Details/${userId}`, {
                    params: { include: ["Profile"] },
                    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
                });
                const backendUserData = res.data;
                console.log("[ChatContext] Backend user data fetched for Stream profile sync.");

                const chatClient = StreamChat.getInstance(apiKey);

                // If already connected with same user, just set client
                if (chatClient.userID === userId) {
                    console.log("[ChatContext] User already connected to Stream:", userId);
                    setClient(chatClient);
                    return;
                }

                // If connected with different user, disconnect first
                if (chatClient.userID) {
                    console.log("[ChatContext] Connection mismatch, disconnecting old user:", chatClient.userID);
                    await chatClient.disconnectUser();
                }

                // Get the Stream-specific token
                console.log("[ChatContext] Requesting Stream token from backend...");
                const streamTokenRes = await api.get("/stream/token");
                const streamToken = streamTokenRes.data.token;

                if (!streamToken) {
                    throw new Error("Stream token came back null/empty");
                }

                console.log("[ChatContext] Connecting to Stream...");
                await chatClient.connectUser(
                    {
                        id: userId,
                        name: backendUserData.profile?.fullName || backendUserData.fullName || "User",
                        image: backendUserData.profile?.profilePhotoUrl || backendUserData.profilePhotoUrl || "",
                    },
                    streamToken
                );

                console.log("[ChatContext] Stream connected successfully for:", userId);
                setClient(chatClient);
            } catch (err) {
                console.error("[ChatContext] STREAM ERROR:", err);
            }
        };

        init();

        return () => {
            // Only disconnect if we have a client and the component is truly unmounting
            // or the userId changes. Stream connectivity can be sensitive to rapid disconnects.
        };
    }, [authVersion]); // authVersion is our primary trigger for (re)connection

    return (
        <ChatContext.Provider
            value={{ client, setClient, activeChannel, setActiveChannel, pendingChannelCid, setPendingChannelCid }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useTalenexChat = () => useContext(ChatContext);
