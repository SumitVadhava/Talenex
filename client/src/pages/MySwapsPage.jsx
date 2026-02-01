import React, { useState, useMemo } from 'react';
import { SwapStatus } from './../constants/swapStatus';
import { SwapCard, Modal } from './../components/SwapReqSections';

// --- MOCK DATA ---
const INITIAL_SWAPS = [
    {
        id: '1',
        partnerName: 'Maria Garcia',
        partnerAvatar: 'https://picsum.photos/100/100?random=1',
        giveSkill: 'Spanish Conversation',
        getSkill: 'Guitar Basics',
        date: 'Tomorrow, Oct 26, 2024',
        time: '4:00 PM',
        duration: '60 min',
        status: SwapStatus.PENDING,
        subStatus: 'Awaiting Confirmation'
    },
    {
        id: '2',
        partnerName: 'David Chen',
        partnerAvatar: 'https://picsum.photos/100/100?random=2',
        giveSkill: 'Python Programming',
        getSkill: 'Sourdough Baking',
        date: 'Oct 29, 2024',
        time: '11:00 AM',
        duration: '90 min',
        status: SwapStatus.PENDING,
        subStatus: 'Confirmation Sent'
    },
    {
        id: '2',
        partnerName: 'David Chen',
        partnerAvatar: 'https://picsum.photos/100/100?random=2',
        giveSkill: 'Python Programming',
        getSkill: 'Sourdough Baking',
        date: 'Oct 29, 2024',
        time: '11:00 AM',
        duration: '90 min',
        status: SwapStatus.SENT,
        subStatus: 'Pending'
    },
    {
        id: '9',
        partnerName: 'Chris Evans',
        partnerAvatar: 'https://picsum.photos/100/100?random=9',
        giveSkill: 'Acting',
        getSkill: 'Yoga',
        date: 'Nov 02, 2024',
        time: '10:00 AM',
        duration: '60 min',
        status: SwapStatus.SENT,
        subStatus: 'Accepted'
    },
    {
        id: '10',
        partnerName: 'Emily Blunt',
        partnerAvatar: 'https://picsum.photos/100/100?random=10',
        giveSkill: 'Singing',
        getSkill: 'Cooking',
        date: 'Nov 05, 2024',
        time: '2:00 PM',
        duration: '45 min',
        status: SwapStatus.SENT,
        subStatus: 'Rejected'
    },
    {
        id: '3',
        partnerName: 'Sarah Johnson',
        partnerAvatar: 'https://picsum.photos/100/100?random=3',
        giveSkill: 'UI Design',
        getSkill: 'React Basics',
        date: 'Oct 20, 2024',
        time: '2:00 PM',
        duration: '60 min',
        status: SwapStatus.ACCEPTED
    },
    {
        id: '4',
        partnerName: 'Mike Wilson',
        partnerAvatar: 'https://picsum.photos/100/100?random=4',
        giveSkill: 'Photography',
        getSkill: 'Video Editing',
        date: 'Oct 22, 2024',
        time: '10:00 AM',
        duration: '45 min',
        status: SwapStatus.ACCEPTED
    },
    {
        id: '5',
        partnerName: 'Emma Davis',
        partnerAvatar: 'https://picsum.photos/100/100?random=5',
        giveSkill: 'Yoga',
        getSkill: 'Meditation',
        date: 'Oct 24, 2024',
        time: '8:00 AM',
        duration: '30 min',
        status: SwapStatus.ACCEPTED
    },
    {
        id: '6',
        partnerName: 'James Wilson',
        partnerAvatar: 'https://picsum.photos/100/100?random=6',
        giveSkill: 'Cooking',
        getSkill: 'Gardening',
        date: 'Oct 25, 2024',
        time: '6:00 PM',
        duration: '120 min',
        status: SwapStatus.ACCEPTED
    },
    {
        id: '7',
        partnerName: 'Lisa Anderson',
        partnerAvatar: 'https://picsum.photos/100/100?random=7',
        giveSkill: 'Math Tutoring',
        getSkill: 'Physics Tutoring',
        date: 'Sep 15, 2024',
        time: '3:30 PM',
        duration: '60 min',
        status: SwapStatus.COMPLETED
    },
    {
        id: '8',
        partnerName: 'Tom Brown',
        partnerAvatar: 'https://picsum.photos/100/100?random=8',
        giveSkill: 'SEO Basics',
        getSkill: 'Copywriting',
        date: 'Sep 10, 2024',
        time: '1:00 PM',
        duration: '45 min',
        status: SwapStatus.CANCELLED
    }
];

const App = () => {
    const [activeTab, setActiveTab] = useState(SwapStatus.PENDING);
    const [swaps, setSwaps] = useState(INITIAL_SWAPS);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState(null);

    // Derived Data
    const filteredSwaps = useMemo(() => {
        return swaps.filter(swap => swap.status === activeTab);
    }, [swaps, activeTab]);

    const counts = useMemo(() => {
        return {
            [SwapStatus.PENDING]: swaps.filter(s => s.status === SwapStatus.PENDING).length,
            [SwapStatus.ACCEPTED]: swaps.filter(s => s.status === SwapStatus.ACCEPTED).length,
            [SwapStatus.COMPLETED]: swaps.filter(s => s.status === SwapStatus.COMPLETED).length,
            [SwapStatus.CANCELLED]: swaps.filter(s => s.status === SwapStatus.CANCELLED).length,
            [SwapStatus.SENT]: swaps.filter(s => s.status === SwapStatus.SENT).length,

        };
    }, [swaps]);

    // Handlers
    const handlePendingAction = (id, action) => {
        setSwaps(prev => prev.map(swap => {
            if (swap.id !== id) return swap;
            return {
                ...swap,
                status: action === 'ACCEPT' ? SwapStatus.ACCEPTED : SwapStatus.CANCELLED
            };
        }));
    };

    const openModal = (type, swapId) => {
        setModalConfig({ type, swapId });
        setModalOpen(true);
    };

    const handleModalConfirm = () => {
        if (!modalConfig) return;

        setSwaps(prev => prev.map(swap => {
            if (swap.id !== modalConfig.swapId) return swap;
            return {
                ...swap,
                status: modalConfig.type === 'COMPLETE' ? SwapStatus.COMPLETED : SwapStatus.CANCELLED
            };
        }));
        setModalOpen(false);
        setModalConfig(null);
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
                    {filteredSwaps.length > 0 ? (
                        filteredSwaps.map(swap => (
                            <SwapCard
                                key={swap.id}
                                swap={swap}
                                onAccept={(id) => handlePendingAction(id, 'ACCEPT')}
                                onReject={(id) => handlePendingAction(id, 'REJECT')}
                                onComplete={(id) => openModal('COMPLETE', id)}
                                onCancel={(id) => openModal('CANCEL', id)}
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
                        ? "Are you sure you want to mark this swap as completed? This confirms that the session has successfully taken place."
                        : "Are you sure you want to cancel this swap? This action cannot be undone and your partner will be notified."
                }
                actionLabel={modalConfig?.type === 'COMPLETE' ? 'Yes, Complete' : 'Yes, Cancel'}
                variant={getModalVariant()}
            />
        </div>
    );
};

export default App;
