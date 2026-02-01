export const SwapStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    SENT: 'SENT',
};

/**
 * @typedef {Object} Swap
 * @property {string} id
 * @property {string} partnerName
 * @property {string} partnerAvatar
 * @property {string} giveSkill
 * @property {string} getSkill
 * @property {string} date
 * @property {string} time
 * @property {string} duration
 * @property {string} status - Values from SwapStatus
 * @property {string} [subStatus] - e.g., "Awaiting Confirmation", "Confirmation Sent"
 */

// TabType is same as SwapStatus