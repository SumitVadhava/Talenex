import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const loadingTips = [
    "Fetching your skills data...",
    "Organizing categories...",
    "Calculating proficiency levels...",
    "Almost there, finalizing results...",
    "Preparing your dashboard..."
  ];

  useEffect(() => {
    // Simulate realistic loading with multiple stages
    const stages = [
      { delay: 200, value: 15 },
      { delay: 600, value: 28 },
      { delay: 1000, value: 45 },
      { delay: 1400, value: 62 },
      { delay: 1800, value: 78 },
      { delay: 2200, value: 92 },
    ];

    const timers = stages.map(({ delay, value }) =>
      setTimeout(() => setProgress(value), delay)
    );

    // Rotate tips every 1.2 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 1200);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-20 px-6">
      {/* Animated icon */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
          {/* <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-zinc-700 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div> */}
        </div>
      </div>

      {/* Progress bar container */}
      <div className="relative">
        {/* Background bar */}
        <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden shadow-inner">
          {/* Animated progress bar */}
          <div 
            className="h-full bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
        </div>

        {/* Percentage indicator */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-2xl font-semibold text-zinc-900 tabular-nums">
            {progress}%
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Loader;