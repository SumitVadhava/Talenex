import { createContext, useContext, useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { UserContext } from "./UserContext";
import api from "@/api/axios";

const ChatContext = createContext();

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export const ChatProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [activeChannel, setActiveChannel] = useState(null);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log(userId);


        if (!userData?.fullName || !userData?.profilePhotoUrl || !userId) {
            console.log("Chat sync: Waiting for complete user data...", {
                hasName: !!userData?.fullName,
                hasImage: !!userData?.profilePhotoUrl,
                hasUserId: !!userId
            });
            return;
        }

        const init = async () => {
            try {
                const chatClient = StreamChat.getInstance(apiKey);

                // If already connected with same user, just set client
                if (chatClient.userID === userId) {
                    setClient(chatClient);
                    return;
                }

                // If connected with different user, disconnect first
                if (chatClient.userID) {
                    await chatClient.disconnectUser();
                }

                console.log("Connecting user to Stream:", userId);

                const response = await api.get("/stream/token")

                const token = response.data.token;
                console.log("stream token", token);


                await chatClient.connectUser(
                    {
                        id: userId,
                        name: userData.fullName,
                        image: userData.profilePhotoUrl,
                    },
                    token
                );

                console.log("User connected to Stream successfully");
                setClient(chatClient);
            } catch (err) {
                console.error("STREAM ERROR:", err);
            }
        };

        init();

        return () => {
            if (client) {
                console.log("Disconnecting Stream user");
                client.disconnectUser();
                setClient(null);
            }
        };
    }, [userData, localStorage.getItem("userId")]); // Note: localStorage isn't reactive, but userData changes often trigger this

    return (
        <ChatContext.Provider
            value={{ client, setClient, activeChannel, setActiveChannel }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useTalenexChat = () => useContext(ChatContext);
