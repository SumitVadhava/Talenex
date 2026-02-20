import { SwapStatus } from "../constants/swapStatus";

export const formatProposedTime = (proposedTime) => {
    if (!proposedTime) return { date: "TBD", time: "TBD" };

    if (proposedTime.includes('T')) {
        let [datePart, timePart] = proposedTime.split('T');

        let displayDate = datePart;
        // Handle YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
            const [y, m, d] = datePart.split('-');
            const dateObj = new Date(y, m - 1, d);
            if (!isNaN(dateObj)) {
                displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        }

        // Handle DD-MM-YYYY
        else if (/^\d{2}-\d{2}-\d{4}$/.test(datePart)) {
            const [d, m, y] = datePart.split('-');
            const dateObj = new Date(y, m - 1, d);
            if (!isNaN(dateObj)) {
                displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        }

        let displayTime = timePart;
        // Clean up time: "4:00 PM:00" -> "4:00 PM", "6:00PM" -> "6:00 PM"
        const timeRegex = /^(\d{1,2}:\d{2})\s*(AM|PM)?/i;
        const match = timePart.match(timeRegex);
        if (match) {
            displayTime = match[1] + (match[2] ? ' ' + match[2].toUpperCase() : '');
        } else {
            displayTime = timePart.replace(/:00$/, '').trim();
        }

        return { date: displayDate, time: displayTime };
    }

    const standardDate = new Date(proposedTime);
    if (!isNaN(standardDate)) {
        return {
            date: standardDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: standardDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
    }

    return { date: proposedTime, time: "" };
};

export const mapBackendToFrontend = (request) => {
    // Role can be "Requester" or "Receiver"
    const isRequester = request.role === "Requester";
    const partner = isRequester ? request.receiver : request.requester;

    let frontendStatus;
    if (isRequester) {
        // As per requirement: if requester, show in Sent tab
        frontendStatus = SwapStatus.SENT;
    } else {
        // If receiver, map according to backend status status
        const statusMap = {
            "Pending": SwapStatus.PENDING,
            "Accepted": SwapStatus.ACCEPTED,
            "Completed": SwapStatus.COMPLETED,
            "Cancelled": SwapStatus.CANCELLED
        };
        frontendStatus = statusMap[request.status] || SwapStatus.PENDING;
    }

    const { date, time } = formatProposedTime(request.proposedTime);

    return {
        id: request.id,
        partnerId: partner.userId || partner.id, // Store partner's userId for review submission
        partnerName: partner.fullName,
        partnerAvatar: partner.profilePhotoUrl,
        giveSkill: isRequester ? request.skillToOffer : request.skillToLearn,
        getSkill: isRequester ? request.skillToLearn : request.skillToOffer,
        date: date,
        time: time,
        duration: request.durationMinutes + ' min',
        status: frontendStatus,
        subStatus: isRequester ? (request.status === "Accepted" ? "Accepted" : (request.status === "Rejected" ? "Rejected" : request.status)) : request.status
    };
};
