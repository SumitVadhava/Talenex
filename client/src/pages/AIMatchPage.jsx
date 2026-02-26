import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Sparkles,
    Brain,
    Target,
    SlidersHorizontal,
    Search,
    LayoutGrid,
    X,
    Plus,
    Crown,
    ChevronDown,
    Users,
    Zap,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { useNavigate, useLocation } from 'react-router-dom';
import searchIcon from '@/assets/search.png';

/* ------------------------------------------------------------------ */
/*  AI Match pill – Gemini-inspired Vibe (Indigo, Violet, Blue)       */
/* ------------------------------------------------------------------ */
const RAINBOW_STYLE = `
@keyframes ai-gradient-move {
  0%   { background-position: 0%   50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0%   50%; }
}

/* ── shared gradient wrapper (pill shape) ── */
.ai-rainbow-btn,
.ai-mock-btn {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 2.5px;
  background: linear-gradient(
    135deg, 

    #ea4335ff 10%, 
    #4285F4 50%, 
    #34A853 75%, 
    #FBBC05 90%

  );
  background-size: 200% 200%;
  animation: ai-gradient-move 5s linear infinite;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

/* ── Submit button ── */
.ai-rainbow-btn {
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(234, 67, 53, 0.2);
}
.ai-rainbow-btn:hover {
  transform: scale(1.02) translateY(-1px);
}
.ai-rainbow-btn:active { transform: scale(0.98) translateY(0); }
.ai-rainbow-btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #ffffff;
  border-radius: 9999px;
  padding: 10px 24px;
  color: #1a1a1a;
  font-size: 0.9375rem;
  font-weight: 600;
  white-space: nowrap;
  width: 100%;
  transition: background 0.3s ease;
}
.ai-rainbow-btn:hover .ai-rainbow-btn-inner {
  background: #fbf9ff;
}

/* ── Toolbar mock button ── */
.ai-mock-btn {
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(78, 119, 247, 0.1);
}
.ai-mock-btn:hover {
  transform: scale(1.05) translateY(-1px);
  box-shadow: 0 6px 20px rgba(78, 119, 247, 0.3);
}
.ai-mock-btn-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border-radius: 9999px;
  padding: 8px 18px;
  color: #1a1a1a;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.3s ease;
}
.ai-mock-btn:hover .ai-mock-btn-inner {
  background: #fbf9ff;
}

/* ── Interactive Card Mock ── */
.ai-card-mock {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid #e2e8f0;
}
.ai-card-mock:hover {
  transform: translateY(-4px);
  border-color: #90a1b9;
  box-shadow: 0 10px 20px rgba(66, 133, 244, 0.1);
  background: #f8faff;
}

/* ── Guidance Arrow ── */
@keyframes alpha-float {
  0%, 100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(4px); opacity: 1; }
}
.floating-guidance {
  animation: alpha-float 3s ease-in-out infinite;
}
`;



/* ------------------------------------------------------------------ */
/*  Mini Demo Popup – one skill at a time, rainbow submit button       */
/* ------------------------------------------------------------------ */
function DemoPopup({ onClose }) {
    const [skill, setSkill] = useState('');
    const [topCount, setTopCount] = useState(5);

    return (
        <>
            {/* Inject keyframes */}
            <style>{RAINBOW_STYLE}</style>

            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center p-1.5">
                                <img src={searchIcon} className="w-full h-full object-contain brightness-0 invert" alt="" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base leading-tight">
                                    AI Match
                                </h3>
                                <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                                    <Crown className="w-3 h-3" /> Premium
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Single Skill Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Skill You're Looking For
                        </label>
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            placeholder="e.g. Python, Figma, Node.js..."
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        <p className="text-xs text-slate-500 mt-1.5">
                            Note : Enter one skill to find your best matches.
                        </p>
                    </div>

                    {/* Top N Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Number of Top Matches
                        </label>
                        <div className="flex gap-2">
                            {[3, 5, 10].map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setTopCount(n)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${topCount === n
                                        ? 'bg-slate-900 text-white border-slate-900'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                        }`}
                                >
                                    Top {n}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rainbow Submit Button – Google AI Mode style */}
                    <div className="ai-rainbow-btn w-full">
                        <button className="ai-rainbow-btn-inner w-full cursor-pointer">
                            <img src={searchIcon} className="w-5 h-5 object-contain" alt="" />
                            Find Best Matches
                        </button>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-3">
                        This is a preview. AI Match is a{' '}
                        <span className="text-amber-600 font-medium">Premium</span> feature.
                    </p>
                </div>
            </div>
        </>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                           */
/* ------------------------------------------------------------------ */
export default function AIMatchPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Rainbow CSS for toolbar mock & popup button */}
            <style>{RAINBOW_STYLE}</style>
            {/* Background grid pattern */}
            <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
                <GridPattern
                    strokeDasharray={'4 5'}
                    width={50}
                    height={50}
                    className="stroke-zinc-500 opacity-20"
                />
            </div>

            <div className="relative z-10 w-full max-w-4xl">
                {/* Back Button */}
                {/* <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-6 mt-8 hover:bg-slate-100 text-md"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button> */}
                <div className='mb-6 mt-10'></div>

                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        <Crown className="w-4 h-4" />
                        Premium Feature
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        AI Match
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Let artificial intelligence do the heavy lifting. Instantly discover the
                        most compatible skill-swap partners — ranked just for you.
                    </p>



                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <Card className="border-slate-200 shadow-sm text-center p-6 hover:bg-slate-50 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all max-w-sm mx-auto shadow-sm group">
                        <Brain className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                        <h3 className="font-semibold text-slate-900 mb-2">Smart Matching</h3>
                        <p className="text-sm text-slate-600">
                            AI analyses every user profile to rank the best skill-swap candidates
                            for you.
                        </p>
                    </Card>
                    <Card className="border-slate-200 shadow-sm text-center p-6 hover:bg-slate-50 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all max-w-sm mx-auto shadow-sm group">
                        <Target className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                        <h3 className="font-semibold text-slate-900 mb-2">Skill-First Search</h3>
                        <p className="text-sm text-slate-600">
                            Enter the exact skills you need and let AI find users who can teach
                            them best.
                        </p>
                    </Card>
                    <Card className="border-slate-200 shadow-sm text-center p-6 hover:bg-slate-50 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all max-w-sm mx-auto shadow-sm group">
                        <Users className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                        <h3 className="font-semibold text-slate-900 mb-2">Top-N Results</h3>
                        <p className="text-sm text-slate-600">
                            Choose to see your Top 3, Top 5, or Top 10 matches — no noise, just
                            the best fits.
                        </p>
                    </Card>
                </div>

                {/* Main Content Card */}
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-8 space-y-10">

                        {/* Section 1 – What is AI Match */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                1. What Is AI Match?
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                AI Match is a premium feature on Talenex that uses artificial
                                intelligence to connect you with the most relevant users on the
                                platform. Instead of scrolling through dozens of profiles
                                manually, you simply tell the AI what skills you are looking for
                                and how many top candidates you want to see. Within seconds, AI
                                Match analyses all registered user profiles, evaluates their
                                skills, experience, and compatibility with your request, and
                                returns a curated, ranked list of the best matches — instantly
                                displayed on your home feed.
                            </p>
                        </section>

                        {/* Section 2 – How It Works */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                2. How It Works
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Using AI Match is straightforward. Here is the step-by-step
                                process:
                            </p>

                            <div className="space-y-4">
                                {[
                                    {
                                        step: '01',
                                        icon: <Sparkles className="w-5 h-5 text-slate-700" />,
                                        title: 'Click the AI Match Button',
                                        desc: 'On the Home page, locate the AI Match button. It sits to the left of the Sort By dropdown and to the right of the search bar, directly above the user card section.',
                                    },
                                    {
                                        step: '02',
                                        icon: <Plus className="w-5 h-5 text-slate-700" />,
                                        title: 'Enter Your Desired Skills',
                                        desc: 'A popup will appear. Type the skills you want in a match partner — for example, "React", "UI Design", or "Python" — and add them one by one using the + button or by pressing Enter.',
                                    },
                                    {
                                        step: '03',
                                        icon: <SlidersHorizontal className="w-5 h-5 text-slate-700" />,
                                        title: 'Choose Your Top-N Count',
                                        desc: 'Select how many top matches you want to see: Top 3, Top 5, or Top 10. This controls how many ranked results are returned and displayed on your home page.',
                                    },
                                    {
                                        step: '04',
                                        icon: <Zap className="w-5 h-5 text-slate-700" />,
                                        title: 'Submit & Let AI Work',
                                        desc: 'Click "Find My Best Matches". The AI immediately processes your request, evaluates all user profiles against your criteria, and returns the top-ranked candidates.',
                                    },
                                    {
                                        step: '05',
                                        icon: <LayoutGrid className="w-5 h-5 text-slate-700" />,
                                        title: 'View Results on the Home Page',
                                        desc: 'Your AI-curated results are displayed directly in the home page card section, replacing the default listing. Each result is ranked by compatibility with your skill preferences.',
                                    },
                                ].map(({ step, icon, title, desc }) => (
                                    <div
                                        key={step}
                                        className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                                            {step}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                                                {icon}
                                                {title}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3 – Where the Button Lives (UI layout visual) */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                3. Where to Find the AI Match Button
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-5">
                                The AI Match button is strategically placed in the Home page
                                toolbar for quick access. The layout of the toolbar from left to
                                right is as follows:
                            </p>

                            {/* Visual Layout Mock */}
                            <div className="bg-slate-50 border border-slate-300 rounded-xl p-5 mb-15 mt-10  
       hover:-translate-y-1 shadow-[0_25px_100px_rgba(0,0,0,0.25)]
       transition-all duration-300">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                    Home Page Toolbar — Visual Layout
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {/* Search */}
                                    <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-white text-sm text-slate-500 flex-1 min-w-[140px]">
                                        <Search className="w-4 h-4 text-slate-400" />
                                        Search skill or user...
                                    </div>

                                    {/* AI Match Button — rainbow border, Google-style icon */}
                                    <div
                                        className="ai-mock-btn"
                                        onClick={() => setShowPopup(true)}
                                    >
                                        <div className="ai-mock-btn-inner">
                                            <img src={searchIcon} className="w-4 h-4 object-contain" alt="" />
                                            AI Match
                                            <Crown className="w-3.5 h-3.5 text-amber-400" />
                                        </div>
                                    </div>

                                    {/* Sort By */}
                                    <div className="flex items-center gap-1.5 border border-slate-300 rounded-lg px-3 py-2 bg-white text-sm text-slate-600 whitespace-nowrap ">
                                        Sort By
                                        <ChevronDown className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>

                                {/* Card section indicator */}
                                <div className="mt-4 border-t border-slate-200 pt-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="ai-card-mock h-20 rounded-xl bg-white flex flex-col items-center justify-center text-[10px] text-slate-400 font-medium cursor-pointer"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-slate-100 mb-2"></div>
                                                User Card {i}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-400 text-center mt-3">
                                        ↑ AI Match results appear here, replacing the default listing
                                    </p>
                                </div>
                            </div>


                            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                                <li>
                                    <strong>Search Bar:</strong> On the far left — for quick
                                    keyword searching by name or skill.
                                </li>
                                <li>
                                    <strong>AI Match Button (Premium):</strong> Sits between the
                                    Search bar and the Sort By dropdown — the central action
                                    button for intelligent matching.
                                </li>
                                <li>
                                    <strong>Sort By Dropdown:</strong> On the right — for manually
                                    sorting listings by criteria such as rating or recency.
                                </li>
                                <li>
                                    <strong>Card Section:</strong> Below the toolbar — this is
                                    where AI Match results are rendered, ranked from most to least
                                    compatible.
                                </li>
                            </ul>
                        </section>

                        {/* Section 4 – Input Popup Explained */}
                        {/* <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                4. The AI Match Input Popup
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-5">
                                When you click the AI Match button, a clean popup dialog appears.
                                It has two input areas:
                            </p> */}

                        {/* <div className="space-y-4 mb-6">
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                        <Plus className="w-4 h-4 text-slate-600" />
                                        Skills You're Looking For
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Type any skill you want your match to have — for example,
                                        "Figma", "Node.js", "Public Speaking", or "Video Editing".
                                        Press <kbd className="bg-slate-200 text-slate-700 text-xs px-1.5 py-0.5 rounded font-mono">Enter</kbd> or
                                        click the <strong>+</strong> button to add it as a tag.
                                        You can add as many skills as you need. Each skill appears
                                        as a removable tag so you can easily adjust your list
                                        before submitting.
                                    </p>
                                </div> */}
                        {/* 
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-600" />
                                        Number of Top Matches
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Choose how many top-ranked users you want to see in your
                                        results. The available options are{' '}
                                        <strong>Top 3</strong>, <strong>Top 5</strong>, and{' '}
                                        <strong>Top 10</strong>. Selecting a smaller number gives
                                        you the most highly compatible matches, while selecting
                                        Top 10 provides a broader set of candidates to choose from.
                                    </p>
                                </div> */}
                        {/* </div> */}

                        {/* Try the Popup CTA */}
                        {/* <div className="bg-slate-900 rounded-xl p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4285f4] via-[#ea4335] via-[#fac014] to-[#34a853] opacity-60"></div>
                                <img src={searchIcon} className="w-12 h-12 mx-auto mb-4 brightness-0 invert opacity-90" alt="" />
                                <h3 className="font-bold text-white text-xl mb-3">
                                    See the Popup in Action
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                                    Click below to preview exactly what the AI Match input popup
                                    looks like and how you would interact with it.
                                </p>
                                <Button
                                    onClick={() => setShowPopup(true)}
                                    className="bg-white text-slate-900 hover:bg-slate-50 font-bold px-8 py-6 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
                                >
                                    <img src={searchIcon} className="w-4 h-4 mr-2" alt="" />
                                    Preview the Popup
                                </Button>
                            </div> */}
                        {/* </section> */}

                        {/* Section 5 – What Happens After */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                4. What Happens After You Submit?
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-5">
                                Once you submit your preferences, here is what AI Match does
                                behind the scenes:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'The AI scans all active Talenex user profiles in real time.',
                                    'It evaluates each profile against the skills you specified, considering skill relevance, proficiency indicators, and profile completeness.',
                                    'Profiles are ranked from most to least compatible with your search criteria.',
                                    'The top N results (3, 5, or 10, as selected) are instantly displayed in the Home page card section.',
                                    'A special "AI Match" label or indicator appears on the results so you know which cards were curated by the AI.',
                                    'You can clear AI Match results at any time to return to the standard home page listing.',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-600 leading-relaxed text-sm">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Section 6 – Why Premium */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                5. Why Is AI Match a Premium Feature?
                            </h2>
                            {/* <p className="text-slate-600 leading-relaxed mb-4">
                                Running AI-powered matching requires significant computational
                                resources — including real-time profile analysis, natural language
                                processing of skills, and intelligent ranking algorithms. To
                                ensure this feature remains fast, accurate, and available to
                                everyone who uses it, AI Match is offered exclusively to Premium
                                subscribers.
                            </p> */}
                            <p className="text-slate-600 leading-relaxed">
                                By upgrading to Premium, you not only unlock AI Match but also
                                support the continuous improvement of Talenex's intelligent
                                features. This allows us to keep the core platform free for all
                                users while investing in advanced capabilities that genuinely
                                enhance the skill-swapping experience.
                            </p>
                        </section>

                        {/* Section 7 – Payment CTA */}
                        <section id="payment-section" className="pt-8 border-t border-slate-100">
                            <div className="bg-gradient-to-br from-slate-300 to-slate-500 p-1 rounded-3xl shadow-xl">
                                <div className="bg-white rounded-[22px] p-8 text-center">
                                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                                        <Crown className="w-3.5 h-3.5" />
                                        MOST POPULAR
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                                        Unlock AI Match Today!
                                    </h2>
                                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                        Join over 50+ professionals using AI to find their perfect skill-swap partners instantly.
                                    </p>

                                    <button
                                        onClick={() => {
                                            const params = new URLSearchParams(location.search);
                                            const plan = params.get("plan") || "professional";
                                            window.open(`/payment?plan=${plan}`, "_blank");
                                        }}
                                        className="ai-rainbow-btn w-full max-w-sm group"
                                    >
                                        <div className="ai-rainbow-btn-inner w-full py-4 text-lg">
                                            Upgrade to Premium
                                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </CardContent>
                </Card>
            </div>

            {/* Demo Popup */}
            {showPopup && <DemoPopup onClose={() => setShowPopup(false)} />}
        </div>
    );
}
