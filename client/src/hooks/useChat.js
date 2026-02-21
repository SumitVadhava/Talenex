import { useNavigate } from "react-router-dom";
import { useTalenexChat } from "../context/ChatContext";
import api from "@/api/axios";

export const useChat = () => {
    const { client, activeChannel, setActiveChannel, setPendingChannelCid } = useTalenexChat();

    const navigate = useNavigate();

    const openChatWithUser = async (otherUserId) => {
        if (!client) {
            console.warn("Chat client not ready yet.");
            return;
        }

        try {
            // Ensure the other user exists in Stream Chat before creating a channel
            let targetUserId = otherUserId;
            try {
                const syncRes = await api.post(`/stream/user/sync/${otherUserId}`);
                console.log("[useChat] User sync success:", syncRes.data);
                if (syncRes.data?.userId) {
                    targetUserId = syncRes.data.userId;
                    console.log("[useChat] Using resolved UserId for chat:", targetUserId);
                }
            } catch (syncError) {
                console.error("[useChat] User sync failed for ID:", otherUserId, syncError.response?.data || syncError.message);
            }

            const channel = client.channel("messaging", {
                members: [client.userID, targetUserId],
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
