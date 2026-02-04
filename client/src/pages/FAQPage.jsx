import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { GridPattern } from "@/components/ui/grid-pattern";
import { useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
    const navigate = useNavigate();

    const faqData = [
        {
            category: "General",
            questions: [
                {
                    question: "What is Talenex?",
                    answer: "Talenex is a skill-swapping platform that connects people who want to learn new skills with those willing to teach. It's a community-driven exchange where you can trade your expertise for knowledge you want to gain, all without monetary transactions."
                },
                {
                    question: "How does Talenex work?",
                    answer: "Simply create an account, complete your profile with skills you can teach and skills you want to learn, then browse other users' profiles. When you find a match, send a swap request. Once accepted, you can connect via our integrated video call feature to start your skill exchange sessions."
                },
                {
                    question: "Is Talenex free to use?",
                    answer: "Yes! Talenex is completely free to use. We believe in making skill-sharing accessible to everyone. Our platform facilitates direct skill exchanges without any fees or subscriptions."
                }
            ]
        },
        {
            category: "Skill Swapping",
            questions: [
                {
                    question: "What kinds of skills can I swap?",
                    answer: "You can swap virtually any skill! From programming and design to cooking, languages, music, fitness, and more. As long as it's something you can teach or learn through our platform, it's welcome on Talenex."
                },
                {
                    question: "How do I find the right swap partner?",
                    answer: "Use our smart matching system to browse users based on skills they offer and skills they're seeking. You can filter by categories, view detailed profiles, and send swap requests to users whose skills align with your learning goals."
                },
                {
                    question: "What happens after I send a swap request?",
                    answer: "The recipient will receive your request and can either accept or reject it. If accepted, you'll both be able to connect through our platform's messaging and video call features to schedule and conduct your skill exchange sessions."
                },
                {
                    question: "Can I swap multiple skills at once?",
                    answer: "Yes! You can list multiple skills you can teach and multiple skills you want to learn. This increases your chances of finding compatible swap partners and allows for diverse learning experiences."
                }
            ]
        },
        {
            category: "Account & Profile",
            questions: [
                {
                    question: "How do I create an account?",
                    answer: "Click the 'Sign Up' button, enter your email and create a password, or use Google sign-in for quick registration. After verification, you'll complete an onboarding process to set up your profile with your skills and interests."
                },
                {
                    question: "Can I edit my profile after creating it?",
                    answer: "Absolutely! You can update your profile, skills, bio, and preferences anytime from your profile settings. Keeping your profile current helps you find better swap matches."
                },
                {
                    question: "How do I delete my account?",
                    answer: "You can delete your account from your profile settings. Please note that this action is permanent and will remove all your data from our platform."
                }
            ]
        },
        {
            category: "Video Calls & Communication",
            questions: [
                {
                    question: "How do video calls work on Talenex?",
                    answer: "Once a swap is accepted, you can initiate video calls directly through the platform. Our integrated video calling feature supports high-quality video (up to 720p) and audio for seamless skill-sharing sessions."
                },
                {
                    question: "Do I need any special software for video calls?",
                    answer: "No additional software needed! Our video calling feature works directly in your web browser. Just ensure you have a stable internet connection and grant camera/microphone permissions when prompted."
                },
                {
                    question: "Is there a messaging feature?",
                    answer: "Yes, we're continuously improving our messaging features to help you coordinate with your swap partners, schedule sessions, and stay connected throughout your learning journey."
                }
            ]
        },
        {
            category: "Safety & Privacy",
            questions: [
                {
                    question: "Is my personal information safe?",
                    answer: "Yes, we take your privacy seriously. We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your consent. See our Privacy Policy for more details."
                },
                {
                    question: "How do I report inappropriate behavior?",
                    answer: "If you encounter any inappropriate behavior or content, please contact us immediately at talenexcommunity@gmail.com. We have a zero-tolerance policy for harassment or abuse and will take swift action."
                },
                {
                    question: "Can I block or report users?",
                    answer: "Yes, user safety features including blocking and reporting are available. We're continuously enhancing these features to ensure a safe and respectful community for all users."
                }
            ]
        }
    ];

    return (
        <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
                <GridPattern strokeDasharray={"4 5"} width={50} height={50} className="stroke-zinc-500 opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-5xl">
                {/* Back to Home Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-6 mt-8 hover:bg-slate-100 text-md"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Frequently Asked Questions (FAQ)
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Find answers to common questions about Talenex and how to make the most of your skill-swapping experience.
                    </p>
                </div>

                <div className="space-y-8">
                    {faqData.map((category, categoryIndex) => (
                        <Card key={categoryIndex} className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl text-slate-900">{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {category.questions.map((faq, faqIndex) => (
                                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                                            <AccordionTrigger className="text-left text-md font-medium text-slate-900 hover:text-slate-700">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Still have questions section */}
                <Card className="mt-12 border-slate-200 shadow-sm bg-slate-50">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                            Still have questions?
                        </h3>
                        <p className="text-slate-600 mb-6">
                            Can't find the answer you're looking for? Our team is here to help.
                        </p>
                        <Button
                            onClick={() => navigate('/contact')}
                            size="lg"
                            className="px-8"
                        >
                            Contact Us
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
