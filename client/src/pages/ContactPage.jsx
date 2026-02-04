import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react';
import { GridPattern } from "@/components/ui/grid-pattern";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from './../api/axios';

export default function ContactPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await api.post("/contact-us/send", {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            });

            if (response.status === 200 || response.status === 201) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            }
        } catch (error) {
            console.error("Contact form error:", error);
            console.log("error");

            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);

            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };


    return (
        <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
                <GridPattern strokeDasharray={"4 5"} width={50} height={50} className="stroke-zinc-500 opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
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
                        Get in Touch
                    </h1>
                    <p className="text-lg p-4 text-slate-600 max-w-3xl mx-auto">
                        Have questions or feedback or join our community?
                        <br />
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">Contact Information</CardTitle>
                                <CardDescription>Reach out to us through any of these channels</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Email</p>
                                        <a href="mailto:talenexcommunity@gmail.com" className="text-sm text-slate-600 hover:text-slate-900">
                                            talenexcommunity@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Phone</p>
                                        <a href="tel:+919265524132" className="text-sm text-slate-600 hover:text-slate-900">
                                            +91 9265524132
                                        </a>
                                        <br />
                                        <a href="tel:+919978712421" className="text-sm text-slate-600 hover:text-slate-900">
                                            +91 9978712421
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">Location</p>
                                        <p className="text-sm text-slate-600">
                                            Rajkot, Gujarat, India
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm bg-slate-50">
                            <CardContent className="">
                                <CardTitle className="text-xl">Join Our Community</CardTitle>
                                <div className="flex mt-6 gap-4">
                                    <a
                                        href="https://www.instagram.com/talenexcommunity/"
                                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                        aria-label="Instagram"
                                    >
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a
                                        href="https://x.com/Talenex178172"
                                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                        aria-label="Twitter"
                                    >
                                        <FontAwesomeIcon icon={faXTwitter} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/talenex-community-3244a13aa/"
                                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                        aria-label="LinkedIn"
                                    >
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                                <CardDescription>Fill out the form below and we'll get back to you shortly</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="border-slate-200 focus:border-slate-400"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="border-slate-200 focus:border-slate-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject *</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            placeholder="How can we help you?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="border-slate-200 focus:border-slate-400"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us more about your inquiry..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="border-slate-200 focus:border-slate-400 resize-none"
                                        />
                                    </div>

                                    {submitStatus === 'success' && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm text-green-800 font-medium">
                                                ✓ Message sent successfully! We'll get back to you soon.
                                            </p>
                                        </div>
                                    )}

                                    {submitStatus === "error" && (
                                        <div className="p-3 bg-red-100 text-red-800 rounded">
                                            ❌ Failed to send message. Try again later.
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto px-8"
                                        size="lg"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin mr-2">⏳</span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
