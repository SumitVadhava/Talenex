import React, { useState } from 'react';
import { Rocket, Package, Users, Award, TrendingUp, Sparkles, UserPlus, IdCard, Layers, Search, UserSearch, Repeat, CalendarCheck, MessageSquare, Stars } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const userJourneyTimeline = [
    {
        id: 1,
        date: "Step 1",
        title: "User Onboarding & Registration",
        description:
            "User signs up using email with OTP verification. A secure JWT session begins, and the onboarding flow introduces the platform's purpose and features.",
        icon: UserPlus,
    },
    {
        id: 2,
        date: "Step 2",
        title: "Profile Creation",
        description:
            "User sets up name, location, bio, and profile photo. They configure session mode (online), availability, visibility settings, and privacy preferences.",
        icon: IdCard,
    },
    {
        id: 3,
        date: "Step 3",
        title: "Add Skills Offered & Skills Wanted",
        description:
            "User adds skills they can teach and skills they want to learn. Each skill includes proficiency level, experience years, certifications",
        icon: Layers,
    },
    {
        id: 4,
        date: "Step 4",
        title: "Skill Discovery & Browsing",
        description:
            "User explores trending skills, top-rated people's, and recommended swap partners. They use filters such as category, proficiency, availability, and session.",
        icon: Search,
    },
    {
        id: 5,
        date: "Step 5",
        title: "View Profile & Select Swap Partner",
        description:
            "User opens detailed profiles, checks ratings,complete swap score, availability overlap, and mutual connections before initiating a swap.",
        icon: UserSearch,
    },
    {
        id: 6,
        date: "Step 6",
        title: "Initiate Swap Request (6-Step Flow)",
        description:
            "User selects skills to exchange, proposes session time, session duration , writes a short goal message, and sends a formal swap request. your swap partner notify with email",
        icon: Repeat,
    },
    {
        id: 7,
        date: "Step 7",
        title: "Swap Management & Sessions",
        description:
            "Once accepted, users connect with each other — send messages, share files,conduct online meetings.",
        icon: CalendarCheck,
    },
    {
        id: 8,
        date: "Step 8",
        title: "Real-Time Communication",
        description:
            "Users chat through in-app messaging, get instant notifications, exchange resources, and optionally use built-in video calling for remote learning sessions.",
        icon: MessageSquare,
    },
    {
        id: 9,
        date: "Step 9",
        title: "Rate, Review & Endorse",
        description:
            "After completing a swap, users submit ratings, written feedback, and skill endorsements which improve trust scores and visibility.",
        icon: Stars,
    },
    {
        id: 10,
        date: "Step 10",
        title: "Gamification & Progress",
        description:
            "Users earn achievement badges, level up reputation, and receive AI insights after 5+ swaps.",
        icon: Award,
    },
];


export default function ProductTimeline({ workflowRef }) {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <div id="workflow" ref={workflowRef} className="min-h-screen bg-transparent py-24 px-4 scroll-mt-28">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">


                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Workflow
                    </h1>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explore how users experience Telnex from onboarding to completing skill swaps.
                    </p>
                </div>


                {/* Timeline */}
                <div className="relative">
                    {/* Central vertical line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-px h-[94%] bg-zinc-500 top-18"></div>


                    {userJourneyTimeline.map((item, index) => {
                        const Icon = item.icon;
                        const isLeft = index % 2 === 0;
                        const isActive = activeItem === item.id;

                        return (
                            <div key={item.id} className="relative mb-12 md:mb-16">
                                <div className={`flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
                                    {/* Content Card */}
                                    <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'} mb-4 md:mb-0`}>
                                        <Card
                                            onClick={() => setActiveItem(isActive ? null : item.id)}
                                            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${isActive ? 'shadow-lg scale-[1.02] border-foreground/20' : ''
                                                }`}
                                        >
                                            <CardHeader>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <Badge variant="secondary" className="mb-3">
                                                            {item.date}
                                                        </Badge>
                                                        <CardTitle className="text-xl mb-2">
                                                            {item.title}
                                                        </CardTitle>
                                                        <CardDescription className={`transition-all duration-300 ${isActive ? 'line-clamp-none' : 'line-clamp-2'
                                                            }`}>
                                                            {item.description}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            {!isActive && (
                                                <CardContent>
                                                    <p className="text-xs text-muted-foreground">Click to expand</p>
                                                </CardContent>
                                            )}
                                        </Card>
                                    </div>

                                    {/* Center Icon Circle */}
                                    <div className="w-full md:w-2/12 flex justify-center absolute md:relative left-0 right-0 md:left-auto md:right-auto">
                                        <div className={`z-10 transition-all duration-300 ${isActive ? 'scale-110' : ''
                                            }`}>
                                            <div className="relative">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-foreground shadow-xl">
                                                    <Icon className="h-7 w-7 text-background" />
                                                </div>
                                                {/* Horizontal connecting lines to cards */}
                                                <div className={`absolute top-1/2 transform -translate-y-1/2 h-px bg-zinc-500 hidden md:block ${!isLeft ? 'left-full ml-4 w-24' : 'right-full mr-4 w-24'
                                                    }`}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer */}
                                    <div className="hidden md:block md:w-5/12"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}