import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import api from '@/api/axios';
import axios from 'axios';

const Marquee = ({ children, reverse = false, pauseOnHover = true, speed = 40 }) => {
    return (
        <div className="relative h-[600px] overflow-hidden group/marquee">
            <div
                className={`flex flex-col gap-4 ${pauseOnHover ? 'group-hover/marquee:[animation-play-state:paused]' : ''}`}
                style={{
                    animation: `scrollVertical ${speed}s linear infinite`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {children}
                {children}
            </div>
            <style jsx>{`
        @keyframes scrollVertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
        </div>
    );
};

const TestimonialCard = ({ name, avatar, content, rating = 5 }) => {
    const StarIcon = ({ filled }) => (
        <Star className={`w-4 h-4 ${filled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
    );

    const getGradientForAvatar = (name) => {
        const gradients = [
            'from-violet-400 to-purple-600',
            'from-blue-400 to-cyan-600',
            'from-emerald-400 to-teal-600',
            'from-orange-400 to-red-600',
            'from-pink-400 to-rose-600',
            'from-indigo-400 to-blue-600',
        ];
        const index = name.charCodeAt(0) % gradients.length;
        return gradients[index];
    };

    return (
        <Card className="w-full flex-shrink-0 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 group">
            <CardContent className="p-6 relative overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-transparent to-blue-50/0 group-hover:from-purple-50/50 group-hover:to-blue-50/50 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10">
                    {/* Rating and Platform Badge Row */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="transform group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                                    <StarIcon filled={i < rating} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 mb-4">
                        <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold text-green-700">Verified User</span>
                    </div>


                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{content}</p>

                    {/* User Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className={`w-11 h-11 rounded-full ${avatar?.startsWith('http') ? '' : `bg-gradient-to-br ${getGradientForAvatar(name)}`} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl transition-all duration-300 ring-2 ring-white overflow-hidden`}>
                            {avatar?.startsWith('http') ? (
                                <img src={avatar} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                avatar
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-900 transition-colors duration-300">{name}</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const testimonials1 = [
    {
        name: "Eleanor Pena",

        avatar: "EP",
        rating: 5,

        content:
            "Talenex matched me with someone who understood exactly what I wanted to learn. The experience felt natural and incredibly rewarding.",
        platform: "twitter"
    },
    {
        name: "Floyd Miles",

        avatar: "FM",
        rating: 4,

        content:
            "The skill-swap concept is genius. I was able to learn video editing while teaching guitar—no fees, just pure exchange.",
        platform: "twitter"
    },
    {
        name: "Jerome Robertson",

        avatar: "JR",
        rating: 5,

        content:
            "Whenever I had a question, the Talenex community and support team responded quickly. It truly feels like a safe, welcoming space.",
        platform: "twitter",
        verified: true
    },
    {
        name: "Brad Markin",

        avatar: "BM",
        rating: 4,

        content:
            "I’ve tried multiple learning apps, but nothing beats exchanging skills directly. Talenex makes the process effortless and fun.",
        platform: "g2"
    }
];


const testimonials2 = [
    {
        name: "Theresa Webb",

        avatar: "TW",
        rating: 5,

        content:
            "I never realized how many people were willing to teach in exchange for learning something new. Talenex opened up a whole world of opportunity.",
        platform: "twitter",
        verified: true
    },
    {
        name: "Annette Black",

        avatar: "AB",
        rating: 5,

        content:
            "Every swap feels personal and meaningful. The reviews, ratings, and communication tools make connecting with others incredibly smooth.",
        platform: "twitter",
        verified: true
    },
    {
        name: "Guy Hawkins",

        avatar: "GH",
        rating: 4,

        content:
            "I signed up, added my skills, and matched with someone within hours. The platform genuinely encourages learning—not just scrolling.",
        platform: "twitter"
    },
    {
        name: "James Smith",

        avatar: "JS",
        rating: 5,

        content:
            "Learning without paying money feels refreshing. I’ve grown so much while also helping others grow. Talenex is truly unique.",
        platform: "twitter"
    }
];


const testimonials3 = [
    {
        name: "Sophia Turner",

        avatar: "ST",
        rating: 4,

        content:
            "Setting up my profile and skills took just minutes. The interface feels clean, and finding people with similar interests is incredibly easy.",
        platform: "twitter"
    },
    {
        name: "Robert Fox",

        avatar: "RF",
        rating: 5,

        content:
            "Talenex completely changed how I learn. Instead of paying for courses, I now exchange skills with people all over the world.",
        platform: "g2",
        verified: true
    },
    {
        name: "Kristin Watson",

        avatar: "KW",
        rating: 5,

        content:
            "I love how deeply I can personalize my skill list and availability. It helps me connect with the right partners almost instantly.",
        platform: "twitter"
    },
    {
        name: "Leslie Alexander",

        avatar: "LA",
        rating: 4,

        content:
            "Everything on Talenex—from the UI to the messaging system—feels thoughtfully designed. It’s a joy to use.",
        platform: "twitter",
        verified: true
    }
];


export default function TestimonialSection({ testimonialsRef }) {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await api.get("/rate-us");
                console.log("Raw Testimonials API Response:", response.data);

                let data = response.data;
                if (data && data.$values) data = data.$values;

                if (!Array.isArray(data) || data.length === 0) {
                    console.log("No dynamic testimonials found, using fallback data.");
                    setTestimonials([...testimonials1, ...testimonials2, ...testimonials3].slice(0, 10));
                    return;
                }

                const mapped = data.map((t) => {
                    const name = t.userName || t.UserName || "Anonymous";
                    const profileImg = t.userProfileImg || t.UserProfileImg;
                    const stars = t.overallExperience || t.OverallExperience || 5;
                    const msg = t.message || t.Message || "";
                    const date = t.createdAt || t.CreatedAt || new Date().toISOString();

                    return {
                        name: name,
                        avatar: profileImg || name.charAt(0).toUpperCase(),
                        rating: stars,
                        content: msg,
                        verified: true,
                        date: date
                    };
                });

                // Sort by latest and take 10
                const sorted = mapped.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
                console.log("Mapped and Sorted Testimonials:", sorted);
                setTestimonials(sorted);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                // Fallback to static testimonials if API fails
                setTestimonials([
                    ...testimonials1,
                    ...testimonials2,
                    ...testimonials3
                ].slice(0, 10));
            }
        };

        fetchTestimonials();
    }, []);

    // Split testimonials for the 3 marquees
    const t1 = testimonials.filter((_, i) => i % 3 === 0);
    const t2 = testimonials.filter((_, i) => i % 3 === 1);
    const t3 = testimonials.filter((_, i) => i % 3 === 2);

    return (
        <div id="testimonials" ref={testimonialsRef} className="min-h-screen py-10 px-4 scroll-mt-28">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-18">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        “A platform that truly changes the way you learn.”
                    </h1>

                    <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                        Talenex helps people discover, teach, and exchange skills effortlessly through
                        intelligent matching and a trusted community-driven experience. Users love how
                        simple, fast, and meaningful every connection feels.
                    </p>

                    {/* Brand + Color Dots */}
                    <div className="flex items-center justify-center gap-3">
                        <span className="font-bold text-2xl tracking-tight mb-2">Talenex Community</span>

                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        </div>
                    </div>
                </div>


                {/* Testimonial Marquees */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {t1.length > 0 && (
                        <Marquee speed={50} reverse={false}>
                            {t1.map((testimonial, index) => (
                                <TestimonialCard key={index} {...testimonial} />
                            ))}
                        </Marquee>
                    )}

                    {t2.length > 0 && (
                        <Marquee speed={50} reverse={true}>
                            {t2.map((testimonial, index) => (
                                <TestimonialCard key={index} {...testimonial} />
                            ))}
                        </Marquee>
                    )}

                    {t3.length > 0 && (
                        <Marquee speed={50} reverse={false}>
                            {t3.map((testimonial, index) => (
                                <TestimonialCard key={index} {...testimonial} />
                            ))}
                        </Marquee>
                    )}
                </div>
            </div>
        </div>
    );
}