import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Primitives';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { notification } from 'antd';

const RATING_CATEGORIES = [
    { id: 'overall', label: 'Overall Experience' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'speed', label: 'Application Speed' },
    { id: 'matching', label: 'Skills Matching Accuracy' },
    { id: 'search', label: 'Search & Filters Effectiveness' },
    { id: 'trust', label: 'Community Trust' },
    { id: 'navigation', label: 'Ease of Navigation' },
    { id: 'features', label: 'Feature Usefulness' },
    { id: 'support', label: 'Help & Support Quality' },
];

export const RateUsTab = () => {
    const [ratings, setRatings] = useState(
        RATING_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: 0 }), {})
    );
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingChange = (categoryId, value) => {
        setRatings((prev) => ({ ...prev, [categoryId]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        notification.success({
            message: 'Thank you for your feedback! 😊',
            placement: 'topRight',
        });

        setIsSubmitting(false);
        // Reset form
        setRatings(RATING_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: 0 }), {}));
        setFeedback('');
    };

    const isFormValid = Object.values(ratings).every((r) => r > 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 p-1"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Rate Your Experience</h2>
                <p className="text-muted-foreground mt-1">
                    Your feedback is valuable to us. Please let us know how we're doing.
                </p>
            </div>

            <Card className="shadow-sm border-slate-200 bg-white">
                <CardHeader className="pb-4 border-b border-slate-50">
                    <CardTitle className="text-lg font-bold text-slate-800">Your feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-4">
                        {RATING_CATEGORIES.map((category) => (
                            <div key={category.id} className="flex items-center justify-between group">
                                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                                    {category.label}
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRatingChange(category.id, star)}
                                            className={`p-1 transition-all hover:scale-110 cursor-pointer ${ratings[category.id] >= star
                                                ? 'text-yellow-400 scale-110'
                                                : 'text-slate-200 hover:text-slate-300'
                                                }`}
                                        >
                                            <Star
                                                size={22}
                                                fill={ratings[category.id] >= star ? 'currentColor' : 'none'}
                                                strokeWidth={2}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                            Additional Feedback (Optional)
                        </label>
                        <Textarea
                            placeholder="Tell us what you like or what we can improve..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-slate-700 min-h-[120px] resize-none rounded-xl"
                        />
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            disabled={!isFormValid || isSubmitting}
                            className="bg-zinc-900 hover:bg-zinc-800 text-md text-white px-8 py-6 rounded-md transition-all shadow-md hover:shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none gap-2 cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Submit Feedback
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
