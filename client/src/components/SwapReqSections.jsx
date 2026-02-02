// =================================

// Aapdo code che aela aato ......

// ===================================
// import React from 'react';
// import { SwapStatus } from './../constants/swapStatus';
// import {
//     Check,
//     X,
//     MessageSquare,
//     Calendar,
//     Clock,
//     CheckCircle2,
//     XCircle,
//     MoreVertical,
//     ArrowRight,
//     ThumbsUp,
//     AlertTriangle,
//     Info
// } from 'lucide-react';

// // --- Badge Component ---
// export const Badge = ({ text, color = 'yellow' }) => {
//     const colorClasses = {
//         yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//         green: 'bg-green-100 text-green-800 border-green-200',
//         red: 'bg-red-100 text-red-800 border-red-200',
//         blue: 'bg-blue-100 text-blue-800 border-blue-200',
//         gray: 'bg-slate-100 text-slate-800 border-slate-200',
//     };

//     return (
//         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses[color]}`}>
//             {text}
//         </span>
//     );
// };

// // --- Modal Component ---
// export const Modal = ({
//     isOpen,
//     onClose,
//     onConfirm,
//     title,
//     description,
//     actionLabel,
//     variant = 'neutral'
// }) => {
//     if (!isOpen) return null;

//     const getVariantStyles = () => {
//         switch (variant) {
//             case 'success':
//                 return {
//                     iconBg: 'bg-emerald-100 text-emerald-600',
//                     buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200',
//                     Icon: CheckCircle2
//                 };
//             case 'danger':
//                 return {
//                     iconBg: 'bg-rose-100 text-rose-600',
//                     buttonBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200',
//                     Icon: AlertTriangle
//                 };
//             case 'warning':
//                 return {
//                     iconBg: 'bg-amber-100 text-amber-600',
//                     buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200',
//                     Icon: AlertTriangle
//                 };
//             default:
//                 return {
//                     iconBg: 'bg-indigo-100 text-indigo-600',
//                     buttonBg: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200',
//                     Icon: Info
//                 };
//         }
//     };

//     const { iconBg, buttonBg, Icon } = getVariantStyles();

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in transition-opacity">
//             <div
//                 className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-scale-in"
//                 role="dialog"
//                 aria-modal="true"
//             >
//                 <div className="p-8">
//                     <div className="flex items-start justify-between mb-6">
//                         <div className={`p-3 rounded-2xl ${iconBg}`}>
//                             <Icon size={32} strokeWidth={2.5} />
//                         </div>
//                         <button
//                             onClick={onClose}
//                             className="p-2 -mr-2 text-slate-300 hover:text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
//                         >
//                             <X size={20} />
//                         </button>
//                     </div>

//                     <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h2>
//                     <p className="text-slate-500 mb-8 leading-relaxed text-lg">
//                         {description}
//                     </p>

//                     <div className="grid grid-cols-2 gap-4">
//                         <button
//                             onClick={onClose}
//                             className="px-6 py-3.5 text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-800 font-semibold transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={onConfirm}
//                             className={`px-6 py-3.5 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${buttonBg}`}
//                         >
//                             {actionLabel}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- SwapCard Component ---
// export const SwapCard = ({
//     swap,
//     onAccept,
//     onReject,
//     onComplete,
//     onCancel
// }) => {

//     const renderActions = () => {
//         switch (swap.status) {
//             case SwapStatus.PENDING:
//                 return (
//                     <div className="mt-4 flex flex-wrap items-center gap-3">
//                         <button
//                             onClick={() => onAccept?.(swap.id)}
//                             className="group flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-full font-semibold transition-all shadow-sm shadow-indigo-500/20 hover:shadow-md hover:shadow-indigo-500/30 hover:-translate-y-0.5"
//                         >
//                             <Check size={16} strokeWidth={3} className="transition-transform group-hover:scale-110" />
//                             Accept
//                         </button>
//                         <button
//                             onClick={() => onReject?.(swap.id)}
//                             className="group flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-500 text-sm hover:bg-rose-50 hover:border-rose-300 rounded-full font-medium transition-all hover:-translate-y-0.5"
//                         >
//                             <X size={16} strokeWidth={3} className="transition-transform group-hover:rotate-90" />
//                             Reject
//                         </button>
//                     </div>
//                 );

//             case SwapStatus.ACCEPTED:
//                 return (
//                     <div className="mt-4 flex flex-wrap items-center gap-3">
//                         <button
//                             onClick={() => onComplete?.(swap.id)}
//                             className="group flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-full font-semibold transition-all shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5"
//                         >
//                             <ThumbsUp size={16} className="transition-transform group-hover:-rotate-12" />
//                             Complete
//                         </button>
//                         <button
//                             onClick={() => onCancel?.(swap.id)}
//                             className="group flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-500 text-sm hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-full font-medium transition-all hover:-translate-y-0.5"
//                         >
//                             <XCircle size={16} />
//                             Cancel
//                         </button>
//                     </div>
//                 );

//             case SwapStatus.COMPLETED:
//                 return (
//                     <div className="mt-3 flex items-center gap-2 text-slate-500 text-xs sm:text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
//                         <div className="bg-emerald-100 p-0.5 rounded-full text-emerald-600">
//                             <CheckCircle2 size={14} />
//                         </div>
//                         <span>Completed on {swap.date}</span>
//                         <button className="ml-auto text-indigo-600 hover:text-indigo-700 font-semibold text-xs hover:underline">Write Review</button>
//                     </div>
//                 );

//             case SwapStatus.CANCELLED:
//                 return (
//                     <div className="mt-3 flex items-center gap-2 text-slate-500 text-xs sm:text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
//                         <div className="bg-rose-100 p-0.5 rounded-full text-rose-600">
//                             <XCircle size={14} />
//                         </div>
//                         <span>Swap cancelled</span>
//                     </div>
//                 );

//              case SwapStatus.SENT:
//                 return (
//                     <div className="mt-3 flex items-center gap-2 text-slate-500 text-xs sm:text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
//                         <div className={`p-0.5 rounded-full ${swap.subStatus === 'Accepted' ? 'bg-emerald-100 text-emerald-600' :
//                                 swap.subStatus === 'Rejected' ? 'bg-rose-100 text-rose-600' :
//                                     'bg-yellow-100 text-yellow-600'
//                             }`}>
//                             {swap.subStatus === 'Accepted' ? <CheckCircle2 size={14} /> :
//                                 swap.subStatus === 'Rejected' ? <XCircle size={14} /> :
//                                     <Clock  size={14} className="text-yellow-500"  />}
//                         </div>
//                         <span className="font-medium">{swap.subStatus}</span>
//                     </div>
//                 );

//             default:
//                 return null;
//         }
//     };

//     const renderStatusCorner = () => {
//         if (swap.status === SwapStatus.COMPLETED) {
//             return (
//                 <div className="absolute top-0 right-0 p-4">
//                     <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
//                         <Check size={12} strokeWidth={3} />
//                         Done
//                     </div>
//                 </div>
//             );
//         }
//         if (swap.status === SwapStatus.CANCELLED) {
//             return (
//                 <div className="absolute top-0 right-0 p-4">
//                     <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-rose-100">
//                         <X size={12} strokeWidth={3} />
//                         Cancelled
//                     </div>
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="relative bg-white rounded-2xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] border border-slate-100 p-5 transition-all hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
//             {renderStatusCorner()}

//             <div className="flex flex-col sm:flex-row items-start gap-4">
//                 {/* Avatar */}
//                 <div className="flex-shrink-0 relative">
//                     <img
//                         src={swap.partnerAvatar}
//                         alt={swap.partnerName}
//                         className="w-12 h-12 rounded-xl object-cover shadow-sm ring-2 ring-slate-50"
//                     />
//                     <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
//                         <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-grow w-full min-w-0">
//                     <div className="flex items-center justify-between mb-1.5">
//                         <div>
//                             <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
//                                 Swap Partner
//                             </h3>
//                             <h2 className="text-lg font-bold text-slate-900 leading-tight">
//                                 {swap.partnerName}
//                             </h2>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-2 my-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
//                         <div className="flex-1 text-center truncate">
//                             <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">You Give</div>
//                             <div className="text-sm font-bold text-slate-800 truncate">{swap.giveSkill}</div>
//                         </div>
//                         <div className="text-slate-300 flex-shrink-0">
//                             <ArrowRight size={16} />
//                         </div>
//                         <div className="flex-1 text-center truncate">
//                             <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">You Get</div>
//                             <div className="text-sm font-bold text-indigo-600 truncate">{swap.getSkill}</div>
//                         </div>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 mb-3">
//                         <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md">
//                             <Calendar size={14} className="text-slate-400" />
//                             <span className="font-medium">{swap.date}</span>
//                         </div>
//                         <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md">
//                             <Clock size={14} className="text-slate-400" />
//                             <span className="font-medium">{swap.time} • {swap.duration}</span>
//                         </div>
//                     </div>

//                     {renderActions()}
//                 </div>
//             </div>
//         </div>
//     );
// };





// =================================

// Antigravity no code che bro...

// ===================================


import React from 'react';
import { SwapStatus } from './../constants/swapStatus';
import {
    Check,
    X,
    MessageSquare,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    MoreVertical,
    ArrowRight,
    ThumbsUp,
    AlertTriangle,
    Info,
    Star,
    Video
} from 'lucide-react';



// --- Badge Component ---
export const Badge = ({ text, color = 'yellow' }) => {
    const colorClasses = {
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        green: 'bg-green-100 text-green-800 border-green-200',
        red: 'bg-red-100 text-red-800 border-red-200',
        blue: 'bg-blue-100 text-blue-800 border-blue-200',
        gray: 'bg-slate-100 text-slate-800 border-slate-200',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses[color]}`}>
            {text}
        </span>
    );
};

// --- Modal Component ---
export const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    actionLabel,
    variant = 'neutral'
}) => {
    if (!isOpen) return null;

    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return {
                    iconBg: 'bg-emerald-100 text-emerald-600',
                    buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200',
                    Icon: CheckCircle2
                };
            case 'danger':
                return {
                    iconBg: 'bg-rose-100 text-rose-600',
                    buttonBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200',
                    Icon: AlertTriangle
                };
            case 'warning':
                return {
                    iconBg: 'bg-amber-100 text-amber-600',
                    buttonBg: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200',
                    Icon: AlertTriangle
                };
            default:
                return {
                    iconBg: 'bg-indigo-100 text-indigo-600',
                    buttonBg: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200',
                    Icon: Info
                };
        }
    };

    const { iconBg, buttonBg, Icon } = getVariantStyles();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in transition-opacity">
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-scale-in"
                role="dialog"
                aria-modal="true"
            >
                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-2xl ${iconBg}`}>
                            <Icon size={32} strokeWidth={2.5} />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-slate-300 hover:text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h2>
                    <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                        {description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-3.5 text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-800 font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-6 py-3.5 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${buttonBg}`}
                        >
                            {actionLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- ReviewModal Component ---
export const ReviewModal = ({
    isOpen,
    onClose,
    onSubmit,
    partnerName
}) => {
    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState('');
    const [wordCount, setWordCount] = React.useState(0);

    const handleReviewChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setReview(text);
        setWordCount(words.length);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in transition-opacity">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 animate-scale-in">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Write a Review</h2>
                        <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-500 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <p className="text-slate-500 mb-6 leading-relaxed">
                        Share your experience swapping skills with <span className="font-semibold text-slate-700">{partnerName}</span>.
                    </p>

                    {/* Rating Stars */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Overall Rating</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`p-1 transition-all ${rating >= star ? 'text-amber-400 scale-110' : 'text-slate-200 hover:text-slate-300'}`}
                                >
                                    <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} strokeWidth={2.5} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text Area */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Your Message</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${wordCount <= 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                {wordCount} / 100 Words
                            </span>
                        </div>
                        <textarea
                            value={review}
                            onChange={handleReviewChange}
                            placeholder="Write about your learning session... (max 100 words)"
                            className={`w-full h-40 p-4 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none outline-none text-slate-700 ${wordCount > 100 ? 'border-rose-300' : 'border-slate-200'}`}
                        />
                        <div className="mt-2 flex justify-between">
                            <p className="text-[10px] text-slate-400">Word Limit: 100 words</p>
                            {wordCount > 100 && (
                                <p className="text-[10px] text-rose-500 font-medium">Please reduce your message by {wordCount - 100} words.</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-3.5 text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={rating === 0 || wordCount > 100}
                            onClick={() => onSubmit?.({ rating, review })}
                            className={`px-6 py-3.5 text-white rounded-xl font-bold transition-all shadow-lg ${rating === 0 || wordCount > 100 ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-0.5'}`}
                        >
                            Submit Review
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export const SwapCard = ({
    swap,
    onAccept,
    onReject,
    onComplete,
    onCancel,
    onReview,
    onConnect
}) => {


    const renderActions = () => {
        switch (swap.status) {
            case SwapStatus.PENDING:
                return (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => onAccept?.(swap.id)}
                            className="group flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-full font-semibold transition-all shadow-sm shadow-indigo-500/20 hover:shadow-md hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                        >
                            <Check size={16} strokeWidth={3} className="transition-transform group-hover:scale-110" />
                            Accept
                        </button>
                        <button
                            onClick={() => onReject?.(swap.id)}
                            className="group flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-500 text-sm hover:bg-rose-50 hover:border-rose-300 rounded-full font-medium transition-all hover:-translate-y-0.5"
                        >
                            <X size={16} strokeWidth={3} className="transition-transform group-hover:rotate-90" />
                            Reject
                        </button>
                    </div>
                );

            case SwapStatus.ACCEPTED:
                return (
                    <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => onComplete?.(swap.id)}
                                className="group flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-full font-semibold transition-all shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                            >
                                <ThumbsUp size={16} className="transition-transform group-hover:-rotate-12" />
                                Complete
                            </button>
                            <button
                                onClick={() => onCancel?.(swap.id)}
                                className="group flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-500 text-sm hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 rounded-full font-medium transition-all hover:-translate-y-0.5"
                            >
                                <XCircle size={16} />
                                Cancel
                            </button>
                        </div>

                        <button
                            onClick={() => onConnect?.(swap)}
                            className="group flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 text-sm rounded-full font-bold transition-all hover:-translate-y-0.5 shadow-sm shadow-indigo-100/50"
                        >
                            <Video size={16} />
                            Connect
                        </button>
                    </div>
                );


            case SwapStatus.COMPLETED:
                return (
                    <div className="mt-3 flex items-center gap-4 text-slate-500 text-xs sm:text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="bg-emerald-100 p-0.5 rounded-full text-emerald-600">
                                <CheckCircle2 size={14} />
                            </div>
                            <span>Completed on {swap.date}</span>
                        </div>
                        <div className="ml-auto">
                            <button
                                onClick={() => onReview?.(swap)}
                                className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs hover:underline"
                            >
                                Write Review
                            </button>
                        </div>
                    </div>


                );

            case SwapStatus.CANCELLED:
                return (
                    <div className="mt-3 flex items-center gap-2 text-slate-500 text-xs sm:text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <div className="bg-rose-100 p-0.5 rounded-full text-rose-600">
                            <XCircle size={14} />
                        </div>
                        <span>Swap cancelled</span>
                    </div>
                );

            case SwapStatus.SENT:
                return (
                    <div className="mt-3 flex items-center gap-2 text-slate-500 text-xs sm:text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                        <div className={`p-0.5 rounded-full ${swap.subStatus === 'Accepted' || swap.subStatus === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                            swap.subStatus === 'Rejected' || swap.subStatus === 'Cancelled' ? 'bg-rose-100 text-rose-600' :
                                'bg-yellow-100 text-yellow-600'
                            }`}>
                            {swap.subStatus === 'Accepted' || swap.subStatus === 'Completed' ? <CheckCircle2 size={14} /> :
                                swap.subStatus === 'Rejected' || swap.subStatus === 'Cancelled' ? <XCircle size={14} /> :
                                    <Clock size={14} className="text-yellow-500" />}
                        </div>
                        <span className="font-medium">{swap.subStatus}</span>
                        {swap.subStatus === 'Accepted' && (
                            <button
                                onClick={() => onConnect?.(swap)}
                                className="ml-auto text-indigo-600 hover:text-indigo-700 font-bold text-xs flex items-center gap-1 px-3 py-1 bg-white border border-indigo-100 rounded-md hover:bg-indigo-50 transition-colors animate-fade-in"
                            >
                                <Video size={14} />
                                Connect
                            </button>
                        )}
                    </div>


                );


            default:
                return null;
        }
    };

    const renderStatusCorner = () => {
        if (swap.status === SwapStatus.COMPLETED) {
            return (
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                        <Check size={12} strokeWidth={3} />
                        Done
                    </div>
                </div>
            );
        }
        if (swap.status === SwapStatus.CANCELLED) {
            return (
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-rose-100">
                        <X size={12} strokeWidth={3} />
                        Cancelled
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="relative bg-white rounded-2xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] border border-slate-100 p-5 transition-all hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-0.5">
            {renderStatusCorner()}

            <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 relative">
                    <img
                        src={swap.partnerAvatar}
                        alt={swap.partnerName}
                        className="w-12 h-12 rounded-xl object-cover shadow-sm ring-2 ring-slate-50"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow w-full min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                        <div>
                            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                                Swap Partner
                            </h3>
                            <h2 className="text-lg font-bold text-slate-900 leading-tight">
                                {swap.partnerName}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 my-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex-1 text-center truncate">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">You Give</div>
                            <div className="text-sm font-bold text-slate-800 truncate">{swap.giveSkill}</div>
                        </div>
                        <div className="text-slate-300 flex-shrink-0">
                            <ArrowRight size={16} />
                        </div>
                        <div className="flex-1 text-center truncate">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">You Get</div>
                            <div className="text-sm font-bold text-indigo-600 truncate">{swap.getSkill}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md">
                            <Calendar size={14} className="text-slate-400" />
                            <span className="font-medium">{swap.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md">
                            <Clock size={14} className="text-slate-400" />
                            <span className="font-medium">{swap.time} • {swap.duration}</span>
                        </div>
                    </div>

                    {renderActions()}
                </div>
            </div>
        </div>
    );
};

// --- Skeleton Component ---
export const SwapCardSkeleton = () => {
    return (
        <div className="relative bg-white rounded-2xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] border border-slate-100 p-5 animate-pulse">
            <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Avatar Skeleton */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                </div>

                {/* Content Skeleton */}
                <div className="flex-grow w-full">
                    <div className="mb-2">
                        <div className="h-2 w-20 bg-slate-100 rounded mb-1.5"></div>
                        <div className="h-5 w-40 bg-slate-200 rounded"></div>
                    </div>

                    <div className="flex items-center gap-2 my-3 bg-slate-50 p-3 rounded-lg border border-slate-50">
                        <div className="flex-1 space-y-1.5">
                            <div className="h-2 w-full max-w-[50px] bg-slate-200 rounded mx-auto"></div>
                            <div className="h-4 w-full max-w-[80px] bg-slate-200 rounded mx-auto"></div>
                        </div>
                        <div className="w-4 h-4 bg-slate-100 rounded-full"></div>
                        <div className="flex-1 space-y-1.5">
                            <div className="h-2 w-full max-w-[50px] bg-slate-200 rounded mx-auto"></div>
                            <div className="h-4 w-full max-w-[80px] bg-indigo-100 rounded mx-auto"></div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="h-6 w-24 bg-slate-100 rounded-md"></div>
                        <div className="h-6 w-32 bg-slate-100 rounded-md"></div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <div className="h-9 w-24 bg-slate-200 rounded-full"></div>
                        <div className="h-9 w-24 bg-slate-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
