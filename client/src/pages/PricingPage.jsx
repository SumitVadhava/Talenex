import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, ArrowRight, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import creditCardImage from "./../assets/credit-card.png";
import creditCardImage2 from "./../assets/credit-card-2.png";
import { GridPattern } from '@/components/ui/grid-pattern';

export default function PricingPage() {
    const [currency, setCurrency] = useState('USD');
    const navigate = useNavigate();

    const plans = [
        {
            icon: <Zap className="w-5 h-5" />,
            badge: "STARTER",
            priceUSD: "5",
            priceINR: "450",
            title: "Perfect for new learners and casual skill exchangers looking to explore the platform.",
            features: [
                "Create Profile & Manage Skills",
                "Basic Search & Skill Discovery",
                "Request Up To 5 Swaps / Month",
                "In-App Messaging (Limited)",
                "Basic Ratings & Reviews",
                "AI Matching (Standard Accuracy)"
            ],
            highlighted: false
        },
        {
            icon: <Crown className="w-5 h-5" />,
            badge: "PROFESSIONAL",
            priceUSD: "10",
            priceINR: "900",
            title: "Ideal for serious learners, professionals, and active community members seeking advanced features.",
            features: [
                "Unlimited Skill Additions",
                "Unlimited Swap Requests",
                "Advanced Search & Filter Controls",
                "Priority AI Matching (High Accuracy)",
                "Full Real-Time Messaging + File Sharing",
                "Profile Boosting & Higher Visibility",
                "Skill Endorsements & Reputation Score",
                "Early Access to Upcoming AI Tools"
            ],
            highlighted: true
        }

    ];

    return (
        <div id="pricing" className="min-h-screen py-16 px-4 scroll-mt-28">
            <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
                <GridPattern strokeDasharray={"4 5"} width={50} height={50} className="stroke-zinc-500 opacity-30" /> {/* Background Grid color : stroke-zinc-500 opacity-20*/}
            </div>
            <div className="relative z-20">
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-gray-500 tracking-wider mb-2">PRICING</p>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Upgrade Your Learning</h1>
                    <p className="text-gray-600 text-lg mb-6">Find the ideal plan that fits your budget and goals. Make informed choices with ease.</p>

                    <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                        <button
                            onClick={() => setCurrency('USD')}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${currency === 'USD'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            USD ($)
                        </button>
                        <button
                            onClick={() => setCurrency('INR')}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${currency === 'INR'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            INR (₹)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative ${plan.highlighted ? 'bg-black text-white scale-105 shadow-2xl' : 'bg-white'} border-0 shadow-lg`}
                        >
                            <CardHeader className="space-y-4 pb-6">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${plan.highlighted ? 'bg-white text-black' : 'bg-gray-100 text-gray-900'}`}>
                                    {plan.icon}
                                </div>
                                <Badge
                                    variant="secondary"
                                    className={`w-fit text-xs font-semibold px-3 py-1 ${plan.highlighted ? 'bg-white text-black' : 'bg-black text-white'}`}
                                >
                                    {plan.badge}
                                </Badge>
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl">{currency === 'USD' ? '$' : '₹'}</span>
                                        <span className="text-5xl font-bold">
                                            {currency === 'USD' ? plan.priceUSD : plan.priceINR}
                                        </span>
                                    </div>
                                </div>
                                <p className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {plan.title}
                                </p>
                            </CardHeader>

                            <CardContent className="space-y-3 pb-6">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className={`rounded-full p-0.5 mt-0.5 ${plan.highlighted ? 'bg-white' : 'bg-black'}`}>
                                            <Check className={`w-3.5 h-3.5 ${plan.highlighted ? 'text-black' : 'text-white'}`} />
                                        </div>
                                        <span className={`text-sm ${plan.highlighted ? 'text-gray-200' : 'text-gray-700'}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>

                            <CardFooter>
                                <Button
                                    onClick={() => navigate(`/ai-match?plan=${plan.badge.toLowerCase()}&currency=${currency}`)}
                                    className={`w-full transition-all duration-300 hover:-translate-y-1   ${plan.highlighted ? 'bg-white text-black hover:bg-gray-100 cursor-pointer py-5 ' : 'bg-black text-white cursor-pointer py-6'}`}
                                >
                                    {plan.badge == "STARTER"
                                        ? <img src={creditCardImage2} alt="Credit Card" className="w-8 h-8 mr-2" />
                                        : <img src={creditCardImage} alt="UPI" className="w-8 h-8 mr-2" />
                                    }
                                    Pay Now

                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    );
}