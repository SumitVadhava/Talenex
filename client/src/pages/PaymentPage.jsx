import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    ArrowLeft,
    ShieldCheck,
    RefreshCcw,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import paymentApi from "@/api/paymentApi";
import SuccessSound from "../assets/payment-success.m4a";

// SECURE SOURCE OF TRUTH: Prices mapped to plan IDs
// This prevents users from tampering with the price via DevTools or URL parameters
const PRICING_PLANS = {
    starter: {
        name: "Starter",
        INR: { amount: 450, subunit: 450 * 100, symbol: "₹" },
        USD: { amount: 5, subunit: 5 * 100, symbol: "$" },
        description: "Perfect for new learners"
    },
    professional: {
        name: "Professional",
        INR: { amount: 900, subunit: 900 * 100, symbol: "₹" },
        USD: { amount: 10, subunit: 10 * 100, symbol: "$" },
        description: "Advanced AI-powered features"
    },
};

const PaymentPage = () => {
    const location = useLocation();
    const [status, setStatus] = useState("loading"); // loading, processing, success, cancelled, error
    const [transactionId, setTransactionId] = useState("");
    const navigate = useNavigate();

    // SECURE DERIVATION: Derive the plan and amount from the URL parameter ONLY
    // We ignore any '&amount=' parameters the user might try to inject
    const planInfo = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const planKey = params.get("plan");
        const currencyKey = params.get("currency")?.toUpperCase() || "INR";

        const basePlan = PRICING_PLANS[planKey] || PRICING_PLANS.starter;
        const pricing = basePlan[currencyKey] || basePlan.INR;

        return {
            ...basePlan,
            currency: currencyKey,
            amount: pricing.amount,
            subunit: pricing.subunit,
            symbol: pricing.symbol
        };
    }, [location.search]);

    const openRazorpay = useCallback(async () => {
        try {
            if (typeof window.Razorpay === "undefined") {
                console.error("Razorpay SDK not loaded");
                setStatus("error");
                return;
            }

            // 1. Create Order on Backend
            const { orderId } = await paymentApi.createOrder(planInfo.amount, planInfo.currency, planInfo.name);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: planInfo.subunit,
                currency: planInfo.currency,
                name: "Talenex Premium",
                description: `${planInfo.name} Plan - ${planInfo.description}`,
                order_id: orderId,
                handler: async function (response) {
                    try {
                        setStatus("processing");
                        // console.log("Razorpay Response:", response);

                        // 2. Verify Payment on Backend
                        const verifyResult = await paymentApi.verifyPayment({
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        });

                        // console.log("Verification Result:", verifyResult);
                        setTransactionId(response.razorpay_payment_id);
                        setStatus("success");
                    } catch (err) {
                        console.error("Verification failed:", err);
                        setStatus("error");
                    }
                },
                modal: {
                    backdropclose: false,
                    escape: false,
                    confirm_close: true,
                    ondismiss: function () {
                        // console.log("Checkout closed by user");
                        setStatus("cancelled");
                    }
                },
                theme: {
                    color: "#000000"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Failed to initialize payment:", error);
            setStatus("error");
        }
    }, [planInfo]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (status === "loading") {
                openRazorpay();
                setStatus("processing");
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [openRazorpay, status]);

    useEffect(() => {
        if (status === "success") {
            try {
                // Short, pleasant success ping (Google Pay style)
                const audio = new Audio(SuccessSound);

                // Play audio, catching the common "user-gesture required" autoplay blocker
                const playPromise = audio.play();

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio play prevented by browser autoplay policies:", error);
                        // Browsers strictly block autoplaying audio right after a hard refresh without user interaction.
                        // This is expected behavior for testing on refresh. During a real flow, the user clicks "Pay", fulfilling the interaction req.
                    });
                }
            } catch (err) {
                console.error("Audio error", err);
            }
        }
    }, [status]);

    const containerVariants = {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: -20 }
    };

    const renderContent = () => {
        switch (status) {
            case "loading":
            case "processing":
                return (
                    <motion.div
                        key="loading"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center space-y-6 py-8"
                    >
                        <div className="relative mx-auto w-24 h-24">
                            <motion.div
                                className="absolute inset-0 border-4 border-primary/20 rounded-full"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShieldCheck className="w-10 h-10 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Secure Checkout</h2>
                            <p className="text-muted-foreground max-w-[280px] mx-auto">
                                Initializing {planInfo.name} Plan payment. Please do not refresh.
                            </p>
                        </div>
                    </motion.div>
                );

            case "success":
                return (
                    <motion.div
                        key="success"
                        variants={{
                            initial: { opacity: 0, scale: 0.95 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0.95 }
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex flex-col items-center justify-center space-y-8 py-4 px-2"
                    >
                        {/* Celebration / Checkmark */}
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                className="relative flex items-center justify-center w-28 h-28 bg-green-500 rounded-full shadow-[0_0_50px_rgba(34,197,94,0.4)] z-10"
                            >
                                <motion.svg
                                    className="w-14 h-14 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3.5}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                                >
                                    <motion.path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </motion.svg>
                            </motion.div>

                            {/* Confetti dots around */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1.5, 0.5],
                                        x: Math.cos(i * 60 * Math.PI / 180) * 100,
                                        y: Math.sin(i * 60 * Math.PI / 180) * 100
                                    }}
                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                    className={`absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full ${i % 2 === 0 ? 'bg-green-400' : 'bg-blue-400'}`}
                                />
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-center space-y-2 w-full"
                        >
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Payment Successful</h2>
                            <p className="text-slate-500 font-medium text-sm">Talenex Premium</p>

                            <div className="pt-4 pb-2">
                                <div className="text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tighter">
                                    {planInfo.symbol}{planInfo.amount}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="w-full pt-6 border-t border-slate-100 dark:border-slate-800/60 space-y-4"
                        >
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Transaction ID</span>
                                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{transactionId || "RZP_DEMO_123"}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Plan Activated</span>
                                <span className="font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300"><Zap className="w-3.5 h-3.5 fill-green-500 text-green-500" /> {planInfo.name}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="w-full pt-2"
                        >
                            <Button
                                className="w-full h-14 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                                onClick={() => window.location.href = "/home"}
                            >
                                Done
                            </Button>
                        </motion.div>
                    </motion.div>
                );

            case "cancelled":
                return (
                    <motion.div
                        key="cancelled"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center space-y-6 py-6"
                    >
                        <div className="mx-auto w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                            <XCircle className="w-12 h-12 text-neutral-500" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Payment Cancelled</h2>
                            <p className="text-muted-foreground max-w-[280px] mx-auto">
                                The transaction for {planInfo.symbol}{planInfo.amount} was closed. No funds have been deducted.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button
                                variant="default"
                                className="h-12 rounded-xl font-bold gap-2"
                                onClick={() => {
                                    setStatus("loading");
                                    openRazorpay();
                                }}
                            >
                                <RefreshCcw className="w-4 h-4" />
                                Try Again
                            </Button>
                            <Button
                                variant="outline"
                                className="h-12 rounded-xl font-bold"
                                onClick={() => navigate("/home")}
                            >
                                Return to Home
                            </Button>
                        </div>
                    </motion.div>
                );

            case "error":
                return (
                    <motion.div
                        key="error"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center space-y-6 py-6"
                    >
                        <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">Something Went Wrong</h2>
                            <p className="text-muted-foreground max-w-[280px] mx-auto">
                                We couldn't initialize the payment gateway. This might be due to a poor connection.
                            </p>
                        </div>
                        <Button
                            variant="default"
                            className="w-full h-12 rounded-xl font-bold gap-2"
                            onClick={() => {
                                setStatus("loading");
                                openRazorpay();
                            }}
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Retry Connection
                        </Button>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-black font-sans selection:bg-primary/10">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-[440px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={status}
                            className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden"
                        >
                            <div className="p-8 md:p-10">
                                {renderContent()}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-10 flex flex-col items-center gap-6"
                    >
                        <div className="flex items-center gap-8 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-left">SSL Secured</span>
                            </div>
                            <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-800" />
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                <span className="opacity-60">Powered by</span>
                                <span className="font-serif italic lowercase text-lg translate-y-[-2px]">Razorpay</span>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="text-muted-foreground/60 hover:text-foreground font-bold text-xs gap-2 py-6 px-8 rounded-2xl cursor-pointer"
                            onClick={() => navigate("/pricing")}
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Return to Pricing
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;