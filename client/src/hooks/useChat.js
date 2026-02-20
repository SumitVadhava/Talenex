import { useNavigate } from "react-router-dom";
import { useTalenexChat } from "../context/ChatContext";

export const useChat = () => {
    const { client, activeChannel, setActiveChannel } = useTalenexChat();

    const navigate = useNavigate();

    const openChatWithUser = async (otherUserId) => {
        if (!client) return;

        try {
            const channel = client.channel("messaging", {
                members: [client.userID, otherUserId],
                distinct: true,
            });

            await channel.watch();
            setActiveChannel(channel);
            navigate("/messages");
        }
        catch (error) {
            console.error("Error opening chat:", error);
        }
    };

    return { client, activeChannel, openChatWithUser };
};
