import React, { useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { notification } from 'antd'; // Added for toast notifications
import searchIcon from '@/assets/search.png';
import { fetchAIMatches } from '@/api/skillsApi';

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

/* ── Common skills for suggestions ── */
const COMMON_SKILLS = [
  "React", "React Native", "Node.js", "Express.js", "MongoDB", "Python",
  "Django", "Flask", "Java", "Spring Boot", "UI/UX Design", "Figma", "CSS",
  "Tailwind CSS", "TypeScript", "JavaScript", "ASP .NET Core", "C#",
  "C++", "SQL", "PostgreSQL", "Docker", "AWS", "Machine Learning",
  "Data Science", "Graphic Design", "Video Editing", "Marketing", "SEO"
].sort();

/**
 * AIDemoPopup
 * @param {{ onClose: () => void, onResults: (matchedIds: string[]) => void }} props
 */
export default function AIDemoPopup({ onClose, onResults }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(''); // Changed from array to single string
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Added for arrow key navigation
  const [topCount, setTopCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const val = e.target.value;

    // Prevent commas (multi-skill entry)
    if (val.includes(',')) {
      notification.warning({
        message: 'Formatting Error',
        description: 'Please search and select only one skill at a time.',
        placement: 'top'
      });
      return;
    }

    setInputValue(val);
    setError('');
    setSelectedIndex(-1);

    // Clear selected skill if user starts typing something else?
    // Actually, just let them type and pick from suggestions.
    if (val.trim()) {
      const filtered = COMMON_SKILLS.filter(s =>
        s.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setSelectedSkill('');
      setSelectedIndex(-1);
    }
  };

  const addSkill = (skillName) => {
    // If they already have a skill and they click another suggestion, show toast
    if (selectedSkill && selectedSkill !== skillName) {
      notification.error({
        message: 'Limit Reached',
        description: 'You can only search for one skill at a time.',
        placement: 'top'
      });
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const trimmed = (skillName || inputValue).trim();
    if (!trimmed) return;

    setSelectedSkill(trimmed);
    setInputValue(trimmed); // Put the value in the input
    setSuggestions([]);
    setSelectedIndex(-1);
    setError('');
  };

  const removeSkill = (skill) => {
    setSelectedSkill('');
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      // Only add if there's a selected suggestion or valid input
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        e.preventDefault();
        addSkill(suggestions[selectedIndex]);
      } else if (!selectedSkill && inputValue.trim()) {
        // Allow adding custom skill on Enter if none is selected yet
        e.preventDefault();
        addSkill();
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSubmit = async () => {
    const targetSkill = selectedSkill || inputValue;
    if (!targetSkill.trim()) {
      setError('Please add a skill to find matches.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const matchedIds = await fetchAIMatches({ requiredSkills: [targetSkill], topN: topCount });
      console.log('[AiMatch] Backend returned IDs:', matchedIds);
      onResults(matchedIds);
      onClose();
    } catch (err) {
      console.error('AI Match error:', err);
      setError(err?.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Skill Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Skill You're Looking For
            </label>

            {/* Input row */}
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a skill (e.g. React, Java, Figma…)"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                disabled={isLoading}
              />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {suggestions.map((s, idx) => (
                    <button
                      key={s}
                      onClick={() => addSkill(s)}
                      className={`w-full text-left px-4 py-2 text-sm transition-all flex items-center justify-between group 
                        ${idx === selectedIndex ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <span className={`font-medium ${idx === selectedIndex ? 'translate-x-1' : ''} transition-transform duration-200`}>
                        {s}
                      </span>
                      {idx === selectedIndex && (
                        <span className="text-[10px] text-indigo-400 bg-white px-2 py-0.5 rounded border border-indigo-100 font-mono shadow-sm animate-in zoom-in-50 duration-200">
                          Enter
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></span>
              Search and <strong>select</strong> a skill to find the best partner for that skill.
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
                  disabled={isLoading}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer disabled:opacity-50 ${topCount === n
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                    }`}
                >
                  Top {n}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 mb-4 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="ai-rainbow-btn w-full">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="ai-rainbow-btn-inner w-full cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Finding Best Matches…
                </>
              ) : (
                <>
                  <img src={searchIcon} className="w-5 h-5 object-contain" alt="" />
                  Find Best Matches
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
