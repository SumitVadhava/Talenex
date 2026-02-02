import React from 'react';

const ChatComingSoon = () => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        body {
          overflow-x: hidden;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message {
          animation: slideUp 0.4s ease-out forwards;
          opacity: 0;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }

        .typing-dot {
          animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(16, 185, 129, 0.2),
                        0 0 10px rgba(16, 185, 129, 0.1);
          }
          50% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.4),
                        0 0 30px rgba(16, 185, 129, 0.2);
          }
        }

        .glow {
          animation: glow 2s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #18181b 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Enhanced Badge */}
            <div className="fade-in">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white rounded-full shadow-lg glow border border-emerald-500/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                </span>
                <span className="text-sm font-semibold tracking-wide uppercase">Coming Soon</span>
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4 fade-in delay-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 leading-tight">
                Chat Feature
              </h1>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text leading-tight">
                Almost Here
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-lg fade-in delay-2">
              Connect with fellow learners in real-time. Share knowledge, exchange skills, and build lasting connections through our upcoming chat feature.
            </p>

            {/* Features List */}
            <div className="space-y-3 fade-in delay-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-zinc-700 font-medium">Real-time messaging</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-zinc-700 font-medium">File sharing & media support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-zinc-700 font-medium">Group conversations</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6 fade-in delay-4">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-zinc-900">70%</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-medium">Done</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-500">Soon</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-medium">Launch</div>
              </div>
            </div>
          </div>

          {/* Right - Chat Preview */}
          <div className="fade-in delay-2">
            <div className="relative max-w-md mx-auto">
              {/* Chat Container */}
              <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden">
                
                {/* Chat Header */}
                <div className="bg-zinc-900 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 bg-zinc-700 rounded-full flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" fill="white"/>
                          <path d="M3.75 17.5C3.75 14.0482 6.54822 11.25 10 11.25C13.4518 11.25 16.25 14.0482 16.25 17.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-zinc-900"></div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Alex Chen</div>
                      <div className="text-zinc-400 text-xs">Active now</div>
                    </div>
                  </div>
                  <button className="text-zinc-400 hover:text-white transition">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                      <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                      <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
                    </svg>
                  </button>
                </div>

                {/* Date Separator */}
                <div className="py-4 flex justify-center">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Today</span>
                </div>

                {/* Messages */}
                <div className="px-5 pb-5 space-y-4" style={{ height: '320px', overflowY: 'auto' }}>
                  
                  {/* Message 1 */}
                  <div className="message flex gap-2" style={{ animationDelay: '0.5s' }}>
                    <div className="w-8 h-8 bg-zinc-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-zinc-600">
                      AC
                    </div>
                    <div className="flex-1">
                      <div className="bg-zinc-100 rounded-2xl rounded-tl-md px-4 py-3 inline-block max-w-xs">
                        <p className="text-sm text-zinc-900">Hi! I'm interested in learning Python. Can you help?</p>
                      </div>
                      <span className="text-xs text-zinc-400 ml-1 mt-1 block">2:34 PM</span>
                    </div>
                  </div>

                  {/* Message 2 */}
                  <div className="message flex gap-2 justify-end" style={{ animationDelay: '1s' }}>
                    <div className="flex-1 flex flex-col items-end">
                      <div className="bg-zinc-900 rounded-2xl rounded-tr-md px-4 py-3 inline-block max-w-xs">
                        <p className="text-sm text-white">Of course! I'd love to teach you. What's your experience level?</p>
                      </div>
                      <span className="text-xs text-zinc-400 mr-1 mt-1 block">2:35 PM</span>
                    </div>
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white">
                      ME
                    </div>
                  </div>

                  {/* Message 3 */}
                  <div className="message flex gap-2" style={{ animationDelay: '1.5s' }}>
                    <div className="w-8 h-8 bg-zinc-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-zinc-600">
                      AC
                    </div>
                    <div className="flex-1">
                      <div className="bg-zinc-100 rounded-2xl rounded-tl-md px-4 py-3 inline-block max-w-xs">
                        <p className="text-sm text-zinc-900">Total beginner. In return, I can teach you graphic design!</p>
                      </div>
                      <span className="text-xs text-zinc-400 ml-1 mt-1 block">2:36 PM</span>
                    </div>
                  </div>

                  {/* Message 4 */}
                  <div className="message flex gap-2 justify-end" style={{ animationDelay: '2s' }}>
                    <div className="flex-1 flex flex-col items-end">
                      <div className="bg-zinc-900 rounded-2xl rounded-tr-md px-4 py-3 inline-block max-w-xs">
                        <p className="text-sm text-white">Perfect! That's exactly what I need. Let's start this week!</p>
                      </div>
                      <span className="text-xs text-zinc-400 mr-1 mt-1 block">2:37 PM</span>
                    </div>
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white">
                      ME
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="message flex gap-2" style={{ animationDelay: '2.5s' }}>
                    <div className="w-8 h-8 bg-zinc-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-zinc-600">
                      AC
                    </div>
                    <div className="bg-zinc-100 rounded-2xl rounded-tl-md px-5 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full typing-dot"></div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Input Area (Disabled) */}
                <div className="border-t border-zinc-200 p-4 bg-zinc-50">
                  <div className="relative">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-zinc-50/90 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                      <div className="text-center">
                        <svg className="w-8 h-8 mx-auto mb-2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        <p className="text-xs font-semibold text-zinc-600">Available Soon</p>
                      </div>
                    </div>
                    {/* Input (Blurred) */}
                    <div className="flex items-center gap-3 opacity-40">
                      <input 
                        type="text" 
                        placeholder="Type your message..."
                        disabled
                        className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none cursor-not-allowed"
                      />
                      <button disabled className="bg-zinc-900 text-white p-3 rounded-xl cursor-not-allowed">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M2.5 10L17.5 3.33334L10.8333 18.3333L8.33333 11.6667L2.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Blur Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-zinc-900/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatComingSoon;