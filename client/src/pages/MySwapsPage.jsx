// =================================

// Aapdo code che aela aato ......

// ===================================


// import React, { useState, useMemo } from 'react';
// import { SwapStatus } from './../constants/swapStatus';
// import { SwapCard, Modal } from './../components/SwapReqSections';

// // --- MOCK DATA ---
// const INITIAL_SWAPS = [
//     {
//         id: '1',
//         partnerName: 'Maria Garcia',
//         partnerAvatar: 'https://picsum.photos/100/100?random=1',
//         giveSkill: 'Spanish Conversation',
//         getSkill: 'Guitar Basics',
//         date: 'Tomorrow, Oct 26, 2024',
//         time: '4:00 PM',
//         duration: '60 min',
//         status: SwapStatus.PENDING,
//         subStatus: 'Awaiting Confirmation'
//     },
//     {
//         id: '2',
//         partnerName: 'David Chen',
//         partnerAvatar: 'https://picsum.photos/100/100?random=2',
//         giveSkill: 'Python Programming',
//         getSkill: 'Sourdough Baking',
//         date: 'Oct 29, 2024',
//         time: '11:00 AM',
//         duration: '90 min',
//         status: SwapStatus.PENDING,
//         subStatus: 'Confirmation Sent'
//     },
//     {
//         id: '2',
//         partnerName: 'David Chen',
//         partnerAvatar: 'https://picsum.photos/100/100?random=2',
//         giveSkill: 'Python Programming',
//         getSkill: 'Sourdough Baking',
//         date: 'Oct 29, 2024',
//         time: '11:00 AM',
//         duration: '90 min',
//         status: SwapStatus.SENT,
//         subStatus: 'Pending'
//     },
//     {
//         id: '9',
//         partnerName: 'Chris Evans',
//         partnerAvatar: 'https://picsum.photos/100/100?random=9',
//         giveSkill: 'Acting',
//         getSkill: 'Yoga',
//         date: 'Nov 02, 2024',
//         time: '10:00 AM',
//         duration: '60 min',
//         status: SwapStatus.SENT,
//         subStatus: 'Accepted'
//     },
//     {
//         id: '10',
//         partnerName: 'Emily Blunt',
//         partnerAvatar: 'https://picsum.photos/100/100?random=10',
//         giveSkill: 'Singing',
//         getSkill: 'Cooking',
//         date: 'Nov 05, 2024',
//         time: '2:00 PM',
//         duration: '45 min',
//         status: SwapStatus.SENT,
//         subStatus: 'Rejected'
//     },
//     {
//         id: '3',
//         partnerName: 'Sarah Johnson',
//         partnerAvatar: 'https://picsum.photos/100/100?random=3',
//         giveSkill: 'UI Design',
//         getSkill: 'React Basics',
//         date: 'Oct 20, 2024',
//         time: '2:00 PM',
//         duration: '60 min',
//         status: SwapStatus.ACCEPTED
//     },
//     {
//         id: '4',
//         partnerName: 'Mike Wilson',
//         partnerAvatar: 'https://picsum.photos/100/100?random=4',
//         giveSkill: 'Photography',
//         getSkill: 'Video Editing',
//         date: 'Oct 22, 2024',
//         time: '10:00 AM',
//         duration: '45 min',
//         status: SwapStatus.ACCEPTED
//     },
//     {
//         id: '5',
//         partnerName: 'Emma Davis',
//         partnerAvatar: 'https://picsum.photos/100/100?random=5',
//         giveSkill: 'Yoga',
//         getSkill: 'Meditation',
//         date: 'Oct 24, 2024',
//         time: '8:00 AM',
//         duration: '30 min',
//         status: SwapStatus.ACCEPTED
//     },
//     {
//         id: '6',
//         partnerName: 'James Wilson',
//         partnerAvatar: 'https://picsum.photos/100/100?random=6',
//         giveSkill: 'Cooking',
//         getSkill: 'Gardening',
//         date: 'Oct 25, 2024',
//         time: '6:00 PM',
//         duration: '120 min',
//         status: SwapStatus.ACCEPTED
//     },
//     {
//         id: '7',
//         partnerName: 'Lisa Anderson',
//         partnerAvatar: 'https://picsum.photos/100/100?random=7',
//         giveSkill: 'Math Tutoring',
//         getSkill: 'Physics Tutoring',
//         date: 'Sep 15, 2024',
//         time: '3:30 PM',
//         duration: '60 min',
//         status: SwapStatus.COMPLETED
//     },
//     {
//         id: '8',
//         partnerName: 'Tom Brown',
//         partnerAvatar: 'https://picsum.photos/100/100?random=8',
//         giveSkill: 'SEO Basics',
//         getSkill: 'Copywriting',
//         date: 'Sep 10, 2024',
//         time: '1:00 PM',
//         duration: '45 min',
//         status: SwapStatus.CANCELLED
//     }
// ];

// const App = () => {
//     const [activeTab, setActiveTab] = useState(SwapStatus.PENDING);
//     const [swaps, setSwaps] = useState(INITIAL_SWAPS);

//     // Modal State
//     const [modalOpen, setModalOpen] = useState(false);
//     const [modalConfig, setModalConfig] = useState(null);

//     // Derived Data
//     const filteredSwaps = useMemo(() => {
//         return swaps.filter(swap => swap.status === activeTab);
//     }, [swaps, activeTab]);

//     const counts = useMemo(() => {
//         return {
//             [SwapStatus.PENDING]: swaps.filter(s => s.status === SwapStatus.PENDING).length,
//             [SwapStatus.ACCEPTED]: swaps.filter(s => s.status === SwapStatus.ACCEPTED).length,
//             [SwapStatus.COMPLETED]: swaps.filter(s => s.status === SwapStatus.COMPLETED).length,
//             [SwapStatus.CANCELLED]: swaps.filter(s => s.status === SwapStatus.CANCELLED).length,
//             [SwapStatus.SENT]: swaps.filter(s => s.status === SwapStatus.SENT).length,

//         };
//     }, [swaps]);

//     // Handlers
//     const handlePendingAction = (id, action) => {
//         setSwaps(prev => prev.map(swap => {
//             if (swap.id !== id) return swap;
//             return {
//                 ...swap,
//                 status: action === 'ACCEPT' ? SwapStatus.ACCEPTED : SwapStatus.CANCELLED
//             };
//         }));
//     };

//     const openModal = (type, swapId) => {
//         setModalConfig({ type, swapId });
//         setModalOpen(true);
//     };

//     const handleModalConfirm = () => {
//         if (!modalConfig) return;

//         setSwaps(prev => prev.map(swap => {
//             if (swap.id !== modalConfig.swapId) return swap;
//             return {
//                 ...swap,
//                 status: modalConfig.type === 'COMPLETE' ? SwapStatus.COMPLETED : SwapStatus.CANCELLED
//             };
//         }));
//         setModalOpen(false);
//         setModalConfig(null);
//     };

//     const getModalVariant = () => {
//         if (modalConfig?.type === 'COMPLETE') return 'success';
//         if (modalConfig?.type === 'CANCEL') return 'danger';
//         return 'neutral';
//     };

//     return (
//         <div className="min-h-screen mt-6 p-4 md:p-8 font-sans text-slate-900">
//             <div className="max-w-3xl mx-auto">

//                 {/* Header */}
//                 <div className="mb-6">
//                     <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Active Swaps</h1>
//                     <p className="text-slate-500 text-base">
//                         Manage all your pending, accepted, completed, and cancelled skill exchanges.
//                     </p>
//                 </div>

//                 {/* Tabs */}
//                 <div className="border-b border-slate-200 mt-4 mb-6 flex gap-6 overflow-x-auto">
//                     {Object.values(SwapStatus).map((status) => (
//                         <button
//                             key={status}
//                             onClick={() => setActiveTab(status)}
//                             className={`pb-3 px-1 mt-2 text-md font-semibold capitalize whitespace-nowrap transition-all border-b-2 ${activeTab === status
//                                 ? 'border-indigo-600 text-indigo-600'
//                                 : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
//                                 }`}
//                         >
//                             {status.toLowerCase()}
//                             <span className={`ml-2 py-0.5 px-2 rounded-full text-[10px] ${activeTab === status ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
//                                 }`}>
//                                 {counts[status]}
//                             </span>
//                         </button>
//                     ))}
//                 </div>

//                 {/* Content Area */}
//                 <div className="space-y-4">
//                     {filteredSwaps.length > 0 ? (
//                         filteredSwaps.map(swap => (
//                             <SwapCard
//                                 key={swap.id}
//                                 swap={swap}
//                                 onAccept={(id) => handlePendingAction(id, 'ACCEPT')}
//                                 onReject={(id) => handlePendingAction(id, 'REJECT')}
//                                 onComplete={(id) => openModal('COMPLETE', id)}
//                                 onCancel={(id) => openModal('CANCEL', id)}
//                             />
//                         ))
//                     ) : (
//                         <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
//                             <p className="text-slate-400 font-medium text-sm">No swaps found in this category.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Confirmation Modal */}
//             <Modal
//                 isOpen={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 onConfirm={handleModalConfirm}
//                 title={modalConfig?.type === 'COMPLETE' ? 'Complete Swap?' : 'Cancel Swap?'}
//                 description={
//                     modalConfig?.type === 'COMPLETE'
//                         ? "Are you sure you want to mark this swap as completed? This confirms that the session has successfully taken place."
//                         : "Are you sure you want to cancel this swap? This action cannot be undone and your partner will be notified."
//                 }
//                 actionLabel={modalConfig?.type === 'COMPLETE' ? 'Yes, Complete' : 'Yes, Cancel'}
//                 variant={getModalVariant()}
//             />
//         </div>
//     );
// };

// export default App;



// =================================

// Antigravity no code che bro...

// =================================== 

import React, { useState, useMemo, useEffect, useContext } from 'react';
import { SwapStatus } from './../constants/swapStatus';
import { SwapCard, Modal, SwapCardSkeleton, ReviewModal } from './../components/SwapReqSections';
import { HubConnectionBuilder } from '@microsoft/signalr';
import api from '../api/axios';
import { UserContext } from '@/context/UserContext';
import { useUser } from '@clerk/clerk-react';
import { notification } from 'antd';


const formatProposedTime = (proposedTime) => {
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

const mapBackendToFrontend = (request) => {
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




const App = () => {

    const [activeTab, setActiveTab] = useState(SwapStatus.PENDING);
    const [swaps, setSwaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sentFilter, setSentFilter] = useState('All');
    const [reviewLoader, setReviewLoader] = useState(false);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState(null);

    // Review Modal State
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedSwapForReview, setSelectedSwapForReview] = useState(null);

    const { userData } = useContext(UserContext);
    const { user } = useUser();

    useEffect(() => {
        fetchSwaps();

        const initializeSignalR = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            let userId = localStorage.getItem('userId');

            // Fallback: Try decoding token if userId is missing
            if (!userId) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    userId = payload.sub;
                } catch (e) {
                    console.error("Failed to decode token for SignalR", e);
                }
            }

            if (!userId) return;

            const connection = new HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_HUB_URL || "https://talenex-server.onrender.com/swaphub", {
                    accessTokenFactory: () => localStorage.getItem('token')
                })
                .withAutomaticReconnect()
                .build();

            try {
                await connection.start();
                // console.log("SignalR Connected state:", connection.state);
                // console.log("Connected to SignalR as group:", userId);
                await connection.invoke("JoinUserGroup", userId);

                connection.on("ReceiveSwapUpdate", () => {
                    // console.log("Real-time update: Swap message received via SignalR");
                    fetchSwaps();
                });

                connection.onreconnecting(error => {
                    console.warn(`SignalR Reconnecting: ${error}`);
                });

                connection.onreconnected(connectionId => {
                    // console.log(`SignalR Reconnected with ID: ${connectionId}`);
                    connection.invoke("JoinUserGroup", userId);
                });

                return connection;
            } catch (err) {
                console.error("SignalR Connection Error: ", err);
            }
        };

        let activeConnection = null;
        initializeSignalR().then(conn => {
            activeConnection = conn;
        });

        return () => {
            if (activeConnection) {
                activeConnection.stop();
            }
        };
    }, []);

    const fetchSwaps = async () => {
        setLoading(true);
        try {
            const response = await api.get('/swap-request',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const mappedData = response.data.map(request => mapBackendToFrontend(request));

            // console.log(mappedData);

            setSwaps(mappedData);
        }
        catch (error) {
            console.error("Error fetching swaps:", error);
        }
        finally {
            setLoading(false);
        }
    };


    const filteredSwaps = useMemo(() => {
        let base = swaps.filter(swap => swap.status === activeTab);

        if (activeTab === SwapStatus.SENT && sentFilter !== 'All') {
            return base.filter(swap => swap.subStatus === sentFilter);
        }
        return base;
    }, [swaps, activeTab, sentFilter]);


    const counts = useMemo(() => {
        return {
            [SwapStatus.PENDING]: swaps.filter(s => s.status === SwapStatus.PENDING).length,
            [SwapStatus.ACCEPTED]: swaps.filter(s => s.status === SwapStatus.ACCEPTED).length,
            [SwapStatus.COMPLETED]: swaps.filter(s => s.status === SwapStatus.COMPLETED).length,
            [SwapStatus.CANCELLED]: swaps.filter(s => s.status === SwapStatus.CANCELLED).length,
            [SwapStatus.SENT]: swaps.filter(s => s.status === SwapStatus.SENT).length,

        };
    }, [swaps]);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await api.put(`/swap-request/${id}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                },
            );
            fetchSwaps();
        } catch (error) {
            console.error(`Error updating swap to ${newStatus}:`, error);
        }
    };



    const handlePendingAction = (id, action) => {
        const newStatus = action === 'ACCEPT' ? 'Accepted' : 'Cancelled';
        handleUpdateStatus(id, newStatus);
    };

    const openModal = (type, swapId) => {
        setModalConfig({ type, swapId });
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        if (!modalConfig) return;
        const newStatus = modalConfig.type === 'COMPLETE' ? 'Completed' : 'Cancelled';
        handleUpdateStatus(modalConfig.swapId, newStatus);
        setModalOpen(false);
        setModalConfig(null);
    };

    const handleReviewSubmit = async (reviewData) => {
        try {
            // Get current user info from Clerk
            setReviewLoader(true);

            // Get reviewer info from Clerk user object
            const reviewerName = userData?.fullName || user?.fullName;
            const reviewerAvatar = userData?.profilePhotoUrl || user?.unsafeMetadata?.profile?.avatarUrl;

            // Prepare the request body according to backend API spec
            const requestBody = {
                userId: selectedSwapForReview?.partnerId, // The partner's userId (person being reviewed)
                reviewerAvatar: reviewerAvatar,
                reviewerName: reviewerName,
                rating: Number(reviewData.rating),
                reviewMsg: reviewData.review
            };

            // console.log("Submitting Review to Backend:", requestBody);

            // Call the backend API
            const response = await api.post('/UserReviews/add', requestBody);

            // console.log("Review submitted successfully:", response.data);

            // Close modal and reset state
            setReviewModalOpen(false);
            setSelectedSwapForReview(null);
            setReviewLoader(false);

             notification.success({
                    message: 'Review submited Successfully',
                    placement: 'topRight',
            });

        } catch (error) {
            console.error("Error submitting review:", error);
            notification.error({
                    message: 'Please try again!',
                    description: 'Review not submited',
                    placement: 'topRight',
            });
            setReviewLoader(false);
            // Optionally show error message to user
            // You can add a toast notification here if you have one
        }
        finally {
            setReviewLoader(false);
        }
    };

    const openReviewModal = (swap) => {
        setSelectedSwapForReview(swap);
        setReviewModalOpen(true);
    };

    const handleConnect = (swap) => {
        // console.log("Connect initiated for swap:", swap.id);
    };


    const getModalVariant = () => {
        if (modalConfig?.type === 'COMPLETE') return 'success';
        if (modalConfig?.type === 'CANCEL') return 'danger';
        return 'neutral';
    };

    return (
        <div className="min-h-screen mt-6 p-4 md:p-8 font-sans text-slate-900">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Active Swaps</h1>
                    <p className="text-slate-500 text-base">
                        Manage all your pending, accepted, completed, and cancelled skill exchanges.
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-200 mt-4 mb-6 flex gap-6 overflow-x-auto">
                    {Object.values(SwapStatus).map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveTab(status)}
                            className={`pb-3 px-1 mt-2 text-md font-semibold capitalize whitespace-nowrap transition-all border-b-2 ${activeTab === status
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                        >
                            {status.toLowerCase()}
                            <span className={`ml-2 py-0.5 px-2 rounded-full text-[10px] ${activeTab === status ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                {counts[status]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                    {/* Sent Filter Sub-navigation */}
                    {activeTab === SwapStatus.SENT && !loading && (
                        <div className="flex items-center gap-2 mb-4 animate-fade-in">
                            {['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSentFilter(filter)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${sentFilter === filter
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading ? (

                        <>
                            <SwapCardSkeleton />
                            <SwapCardSkeleton />
                            <SwapCardSkeleton />
                        </>
                    ) : filteredSwaps.length > 0 ? (
                        filteredSwaps.map(swap => (
                            <SwapCard
                                key={swap.id}
                                swap={swap}
                                onAccept={(id) => handlePendingAction(id, 'ACCEPT')}
                                onReject={(id) => handlePendingAction(id, 'REJECT')}
                                onComplete={(id) => openModal('COMPLETE', id)}
                                onCancel={(id) => openModal('CANCEL', id)}
                                onReview={(swap) => openReviewModal(swap)}
                                onConnect={(swap) => handleConnect(swap)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-400 font-medium text-sm">No swaps found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleModalConfirm}
                title={modalConfig?.type === 'COMPLETE' ? 'Complete Swap?' : 'Cancel Swap?'}
                description={
                    modalConfig?.type === 'COMPLETE'
                        ? "Are you sure you want to mark this swap as completed? This confirms that the skill swapping has successfully taken place."
                        : "Are you sure you want to cancel this swap? your partner will be notified about this cancellation."
                }
                actionLabel={modalConfig?.type === 'COMPLETE' ? 'Yes, Complete' : 'Yes, Cancel'}
                variant={getModalVariant()}
            />

            {/* Review Modal */}
            <ReviewModal
                isOpen={reviewModalOpen}
                isLoading={reviewLoader}
                onClose={() => setReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}
                partnerName={selectedSwapForReview?.partnerName}
            />
        </div>

    );
};

export default App;