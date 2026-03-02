import React, { useState } from 'react';
import { X, Crown } from 'lucide-react';
import searchIcon from '@/assets/search.png';

/* ------------------------------------------------------------------ */
/*  AI Match pill – Gemini-inspired Vibe (Indigo, Violet, Blue)       */
/* ------------------------------------------------------------------ */
export const RAINBOW_STYLE = `
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

@media (max-width: 640px) {
  .ai-mock-btn-inner span {
    display: none;
  }
  .ai-mock-btn-inner {
    padding: 8px;
    gap: 0;
  }
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

export default function AIDemoPopup({ onClose }) {
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
                            <div className=''>
                                <h3 className="font-bold text-slate-900 text-base leading-tight">
                                    AI Match
                                </h3>
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

                    
                </div>
            </div>
        </>
    );
}
