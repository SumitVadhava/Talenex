import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
import { GridPattern } from "@/components/ui/grid-pattern";
import { useNavigate } from 'react-router-dom';

export default function PrivacyPage() {
    const navigate = useNavigate();

    return (
        <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        
            <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
                <GridPattern strokeDasharray={"4 5"} width={50} height={50} className="stroke-zinc-500 opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-4xl">
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
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-slate-600">
                        Last updated: February 4, 2026
                    </p>
                </div>

                {/* Privacy Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <Card className="border-slate-200 shadow-sm text-center p-6">
                        <Shield className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                        <h3 className="font-semibold text-slate-900 mb-2">Your Data is Protected</h3>
                        <p className="text-sm text-slate-600">Industry-standard encryption</p>
                    </Card>
                    <Card className="border-slate-200 shadow-sm text-center p-6">
                        <Lock className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                        <h3 className="font-semibold text-slate-900 mb-2">No Data Selling</h3>
                        <p className="text-sm text-slate-600">We never sell your information</p>
                    </Card>
                    <Card className="border-slate-200 shadow-sm text-center p-6">
                        <UserCheck className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                        <h3 className="font-semibold text-slate-900 mb-2">You're in Control</h3>
                        <p className="text-sm text-slate-600">Manage your data anytime</p>
                    </Card>
                </div>

                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-8 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Welcome to Talenex. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our skill-swapping platform. Please read this policy carefully to understand our practices regarding your personal data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">2.1 Information You Provide</h3>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                                <li><strong>Account Information:</strong> Name, email address, password, and profile picture</li>
                                <li><strong>Profile Data:</strong> Skills you can teach, skills you want to learn, bio, location, and interests</li>
                                <li><strong>Communication Data:</strong> Messages, swap requests, and feedback you send through the Platform</li>
                                <li><strong>Contact Information:</strong> When you contact us via our contact form or email</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">2.2 Automatically Collected Information</h3>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Platform</li>
                                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                                <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">2.3 Video Call Data</h3>
                            <p className="text-slate-600 leading-relaxed ml-4">
                                During video calls, we process audio and video data to facilitate communication. We do not record or store video call content unless explicitly stated and with your consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                            <p className="text-slate-600 leading-relaxed mb-3">We use your information to:</p>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                                <li>Create and manage your account</li>
                                <li>Facilitate skill-swapping connections and matches</li>
                                <li>Enable video calls and messaging between users</li>
                                <li>Send you notifications about swap requests, messages, and platform updates</li>
                                <li>Improve and personalize your experience on the Platform</li>
                                <li>Analyze usage patterns to enhance our services</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                                <li>Comply with legal obligations and enforce our Terms & Conditions</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. How We Share Your Information</h2>
                            <p className="text-slate-600 leading-relaxed mb-3">We may share your information in the following circumstances:</p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">4.1 With Other Users</h3>
                            <p className="text-slate-600 leading-relaxed ml-4 mb-3">
                                Your profile information (name, skills, bio, profile picture) is visible to other users to facilitate skill matching and exchanges.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">4.2 Service Providers</h3>
                            <p className="text-slate-600 leading-relaxed ml-4 mb-3">
                                We may share data with third-party service providers who help us operate the Platform (e.g., hosting, analytics, email services). These providers are contractually obligated to protect your data.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">4.3 Legal Requirements</h3>
                            <p className="text-slate-600 leading-relaxed ml-4 mb-3">
                                We may disclose your information if required by law, court order, or to protect the rights, property, or safety of Talenex, our users, or others.
                            </p>

                            <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">4.4 Business Transfers</h3>
                            <p className="text-slate-600 leading-relaxed ml-4">
                                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We implement industry-standard security measures to protect your personal data, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights and Choices</h2>
                            <p className="text-slate-600 leading-relaxed mb-3">You have the following rights regarding your personal data:</p>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                                <li><strong>Correction:</strong> Update or correct inaccurate information in your profile</li>
                                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails (account-related emails may still be sent)</li>
                                <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                            </ul>
                            <p className="text-slate-600 leading-relaxed mt-3">
                                To exercise these rights, please contact us at talenexcommunity@gmail.com.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookies and Tracking Technologies</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can control cookie preferences through your browser settings, but disabling cookies may affect Platform functionality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Third-Party Links</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Talenex is not intended for users under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 13, we will take steps to delete such information promptly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Data Retention</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We retain your personal data for as long as your account is active or as needed to provide services. If you delete your account, we will delete or anonymize your data within a reasonable timeframe, except where retention is required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. International Data Transfers</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to This Privacy Policy</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of significant changes via email or platform notifications. Your continued use of Talenex after changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Us</h2>
                            <p className="text-slate-600 leading-relaxed mb-3">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
                            </p>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-slate-600" />
                                        <div>
                                            <p className="font-medium text-slate-900">Email</p>
                                            <a href="mailto:talenexcommunity@gmail.com" className="text-slate-600 hover:text-slate-900">
                                                talenexcommunity@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Database className="w-5 h-5 text-slate-600" />
                                        <div>
                                            <p className="font-medium text-slate-900">Location</p>
                                            <p className="text-slate-600">Rajkot, Gujarat, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
