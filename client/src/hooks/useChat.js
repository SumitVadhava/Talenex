import { useNavigate } from "react-router-dom";
import { useTalenexChat } from "../context/ChatContext";

export const useChat = () => {
    const { client, activeChannel, setActiveChannel, setPendingChannelCid } = useTalenexChat();

    const navigate = useNavigate();

    const openChatWithUser = async (otherUserId) => {
        if (!client) return;

        try {
            const channel = client.channel("messaging", {
                members: [client.userID, otherUserId],
                distinct: true,
            });

            // Watch (creates/joins) the channel
            await channel.watch();

            // Tell ChatsPage to:
            //   1. Pin this channel to the top of the ChannelList
            //   2. Open this channel's chat panel immediately
            setPendingChannelCid(channel.cid);
            setActiveChannel(channel);

            const url = window.location.origin + `/messages?cid=${channel.cid}`;
            window.open(url, "_blank");


        }
        catch (error) {
            console.error("Error opening chat:", error);
        }
    };

    return { client, activeChannel, openChatWithUser };
};
