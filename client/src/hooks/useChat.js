import { useNavigate } from "react-router-dom";
import { useTalenexChat } from "../context/ChatContext";

export const useChat = () => {
    const { client, activeChannel, setActiveChannel, setPendingChannelCid } = useTalenexChat();

    const navigate = useNavigate();

    const openChatWithUser = async (otherUserId) => {
        if (!client) {
            console.warn("Chat client not ready yet.");
            return;
        }

        try {
            const channel = client.channel("messaging", {
                members: [client.userID, otherUserId],
                distinct: true,
            });

            await channel.watch();

            setPendingChannelCid(channel.cid);
            setActiveChannel(channel);

            const url = window.location.origin + `/messages?cid=${channel.cid}`;
            window.open(url, "_blank");
        } catch (error) {
            console.error("Error opening chat:", error);
        }
    };

    return { client, activeChannel, openChatWithUser, isChatReady: !!client };
};
