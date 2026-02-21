import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    BarChart3,
    Globe2,
    Zap,
    ShieldCheck,
    Users,
    Music4
} from "lucide-react";
import { cn } from "@/lib/utils";

const BentoCard = ({ children, className, colSpan = 1, rowSpan = 1, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "group relative overflow-hidden rounded-3xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 p-6 hover:shadow-xl transition-all duration-300",
                colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
                rowSpan === 2 ? "md:row-span-2" : "md:row-span-1",
                className
            )}
        >
            <div className="relative z-10 h-full flex flex-col justify-between">
                {children}
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-4 relative scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground mb-4">
                        Everything You Need to Scale
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Powerful tools and features designed to help you sell more beats and connect with more artists.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-full">
                    {/* Card 1: Main Feature (Large) */}
                    <BentoCard colSpan={2} rowSpan={2} delay={0.1}>
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-2xl font-semibold">Advanced Analytics</h3>
                            <p className="text-muted-foreground">
                                Deep dive into your sales data. Understand which beats are performing best, where your audience is coming from, and optimize your pricing strategy with AI-driven insights.
                            </p>
                            <div className="flex-1 w-full min-h-[200px] mt-4 rounded-xl bg-gradient-to-tr from-neutral-200/50 to-neutral-100/50 dark:from-neutral-800/50 dark:to-neutral-900/50 border border-black/5 dark:border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                                {/* Abstract decorative chart elements */}
                                <div className="absolute bottom-0 left-4 right-4 h-32 flex items-end justify-between gap-2 px-4 pb-4">
                                    {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            className="w-full bg-orange-500/20 rounded-t-sm relative group-hover:bg-orange-500/30 transition-colors"
                                        >
                                            <div className="absolute top-0 w-full h-1 bg-orange-500/50" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Card 2: Global Reach */}
                    <BentoCard delay={0.2}>
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                            <Globe2 className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                        <p className="text-sm text-muted-foreground">
                            Sell to artists in over 120 countries. Currency conversion and local payment methods included.
                        </p>
                    </BentoCard>

                    {/* Card 3: Instant Payouts */}
                    <BentoCard delay={0.3}>
                        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                            <Zap className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
                        <p className="text-sm text-muted-foreground">
                            Get paid immediately when a sale is made. No holding periods or minimum thresholds.
                        </p>
                    </BentoCard>

                    {/* Card 4: Secure Storage (Wide on bottom right? No, standard grid flow) */}
                    {/* Wait, the first card is 2x2. So we need 3 columns.
              Row 1: [Card 1 (2x2)] [Card 2 (1x1)]
              Row 2: [Card 1 (2x2)] [Card 3 (1x1)] -> This happens automatically with grid-auto-flow if we are careful.
              Actually, css grid:
              col-span-2 row-span-2 occupies cells (0,0), (0,1), (1,0), (1,1).
              So:
              (0,0)-(1,1): Card 1
              (0,2): Card 2
              (1,2): Card 3
              
              We want more cards? Let's add a few more for a nice layout.
              Maybe 3 rows total?
           */}
                    <BentoCard className="md:col-span-3" delay={0.4}>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex flex-shrink-0 items-center justify-center">
                                <Users className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Community First</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Join a Discord server of 50,000+ producers. Collab, get feedback, and grow together.
                                </p>
                            </div>
                            <div className="flex -space-x-3 ml-auto">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`h-10 w-10 rounded-full border-2 border-white dark:border-black bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold`}>
                                        U{i}
                                    </div>
                                ))}
                                <div className="h-10 w-10 rounded-full border-2 border-white dark:border-black bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-xs">
                                    +5k
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
}
