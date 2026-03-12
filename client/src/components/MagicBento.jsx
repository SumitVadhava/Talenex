// import { useRef, useEffect, useState, useCallback } from 'react';
// import { gsap } from 'gsap';
// import { BrainCircuit, ScanSearch, IdCard, ArrowLeftRight, MessageCircle, Video, Star, Trophy } from 'lucide-react';

// const DEFAULT_PARTICLE_COUNT = 12;
// const DEFAULT_SPOTLIGHT_RADIUS = 300;
// const DEFAULT_GLOW_COLOR = '132, 0, 255';
// const MOBILE_BREAKPOINT = 768;

// const AIVisual = () => (
//     <div className="mt-auto w-full opacity-80 group-hover:opacity-100 transition-all duration-500">
//         <div className="relative bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg p-3 border border-emerald-200/50 dark:border-emerald-800/50">
//             {/* Matching Flow Diagram */}
//             <div className="flex items-center justify-between gap-2">
//                 {/* User 1 */}
//                 <div className="flex flex-col items-center gap-1.5">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
//                         U1
//                     </div>
//                     <div className="text-[9px] text-center px-2 py-0.5 bg-emerald-100/50 dark:bg-emerald-900/30 rounded text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-200/50 dark:border-emerald-800/50">
//                         React
//                     </div>
//                 </div>

//                 {/* AI Matching Engine */}
//                 <div className="flex-1 flex flex-col items-center gap-1">
//                     <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center border-2 border-emerald-400/50 dark:border-emerald-500/50 shadow-sm">
//                         <BrainCircuit className="w-4 h-4 text-white" />
//                     </div>
//                     <div className="text-[8px] text-emerald-600 dark:text-emerald-400 font-semibold">AI Match</div>
//                     <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-300 dark:via-emerald-700 to-transparent"></div>
//                 </div>

//                 {/* User 2 */}
//                 <div className="flex flex-col items-center gap-1.5">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
//                         U2
//                     </div>
//                     <div className="text-[9px] text-center px-2 py-0.5 bg-teal-100/50 dark:bg-teal-900/30 rounded text-teal-700 dark:text-teal-300 font-medium border border-teal-200/50 dark:border-teal-800/50">
//                         Design
//                     </div>
//                 </div>
//             </div>

//             {/* Match Score */}
//             <div className="mt-2 flex items-center justify-center gap-1">
//                 <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Match Score:</div>
//                 <div className="flex gap-0.5">
//                     {[1, 2, 3, 4, 5].map(i => (
//                         <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
//                     ))}
//                 </div>
//                 <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold ml-1">95%</div>
//             </div>
//         </div>
//     </div>
// );

// const SearchVisual = () => (
//     <div className="mt-auto w-full opacity-80 group-hover:opacity-100 transition-all duration-500">
//         <div className="bg-blue-50/50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/50 space-y-2.5">
//             {/* Search Bar */}
//             <div className="flex items-center gap-2 h-8 bg-white/20 dark:bg-blue-900/20 rounded-md px-2 border border-blue-300/50 dark:border-blue-700/50">
//                 <ScanSearch className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
//                 <div className="flex-1 h-1.5 bg-blue-200/30 dark:bg-blue-800/30 rounded"></div>
//                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
//             </div>

//             {/* Filter Pills */}
//             <div className="flex flex-wrap gap-1.5">
//                 <div className="px-2 py-1 bg-blue-100/50 dark:bg-blue-900/30 border border-blue-300/50 dark:border-blue-700/50 rounded text-[9px] text-blue-700 dark:text-blue-300 font-medium">Category</div>
//                 <div className="px-2 py-1 bg-indigo-100/50 dark:bg-indigo-900/30 border border-indigo-300/50 dark:border-indigo-700/50 rounded text-[9px] text-indigo-700 dark:text-indigo-300 font-medium">Level</div>
//                 <div className="px-2 py-1 bg-cyan-100/50 dark:bg-cyan-900/30 border border-cyan-300/50 dark:border-cyan-700/50 rounded text-[9px] text-cyan-700 dark:text-cyan-300 font-medium">Location</div>
//             </div>

//             {/* Results Count */}
//             <div className="flex items-center justify-between pt-1 border-t border-blue-200/50 dark:border-blue-800/50">
//                 <div className="text-[10px] text-blue-600/70 dark:text-blue-400/70">Results:</div>
//                 <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300">10K+ Skills</div>
//             </div>
//         </div>
//     </div>
// );

// const ProfileVisual = () => (
//     <div className="mt-auto w-full opacity-80 group-hover:opacity-100 transition-all duration-500">
//         <div className="bg-violet-50/50 dark:bg-violet-950/30 rounded-lg p-3 border border-violet-200/50 dark:border-violet-800/50 space-y-2.5">
//             {/* Profile Header */}
//             <div className="flex items-center gap-2.5">
//                 <div className="relative">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
//                         JD
//                     </div>
//                     <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black shadow-sm"></div>
//                 </div>
//                 <div className="flex-1">
//                     <div className="h-2.5 w-20 bg-violet-200/50 dark:bg-violet-800/30 rounded mb-1.5"></div>
//                     <div className="h-1.5 w-16 bg-violet-200/30 dark:bg-violet-800/20 rounded"></div>
//                 </div>
//             </div>

//             {/* Skills Tags */}
//             <div className="flex flex-wrap gap-1.5">
//                 <div className="px-2 py-0.5 bg-violet-100/50 dark:bg-violet-900/30 border border-violet-300/50 dark:border-violet-700/50 rounded text-[9px] text-violet-700 dark:text-violet-300 font-medium">React</div>
//                 <div className="px-2 py-0.5 bg-purple-100/50 dark:bg-purple-900/30 border border-purple-300/50 dark:border-purple-700/50 rounded text-[9px] text-purple-700 dark:text-purple-300 font-medium">Node.js</div>
//                 <div className="px-2 py-0.5 bg-fuchsia-100/50 dark:bg-fuchsia-900/30 border border-fuchsia-300/50 dark:border-fuchsia-700/50 rounded text-[9px] text-fuchsia-700 dark:text-fuchsia-300 font-medium">+3</div>
//             </div>

//             {/* Stats */}
//             <div className="flex items-center justify-between pt-1.5 border-t border-violet-200/50 dark:border-violet-800/50">
//                 <div className="text-[9px] text-violet-600/70 dark:text-violet-400/70">Endorsements:</div>
//                 <div className="text-[9px] font-bold text-violet-700 dark:text-violet-300">24</div>
//             </div>
//         </div>
//     </div>
// );

// const SwapVisual = () => (
//     <div className="mt-auto w-full opacity-80 group-hover:opacity-100 transition-all duration-500">
//         <div className="bg-orange-50/50 dark:bg-orange-950/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-800/50">
//             {/* Workflow Steps */}
//             <div className="space-y-2.5">
//                 {/* Step 1: Request */}
//                 <div className="flex items-center gap-2">
//                     <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 border border-orange-500/50 flex items-center justify-center text-[8px] text-white font-bold shadow-sm">1</div>
//                     <div className="flex-1 h-1.5 bg-orange-200/50 dark:bg-orange-800/30 rounded"></div>
//                     <div className="text-[9px] text-orange-700 dark:text-orange-300 font-medium">Request</div>
//                 </div>

//                 {/* Arrow */}
//                 <div className="flex items-center justify-center">
//                     <ArrowLeftRight className="w-4 h-4 text-orange-500 dark:text-orange-400" />
//                 </div>

//                 {/* Step 2: Schedule */}
//                 <div className="flex items-center gap-2">
//                     <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 border border-amber-500/50 flex items-center justify-center text-[8px] text-white font-bold shadow-sm">2</div>
//                     <div className="flex-1 h-1.5 bg-amber-200/50 dark:bg-amber-800/30 rounded"></div>
//                     <div className="text-[9px] text-amber-700 dark:text-amber-300 font-medium">Schedule</div>
//                 </div>

//                 {/* Arrow */}
//                 <div className="flex items-center justify-center">
//                     <ArrowLeftRight className="w-4 h-4 text-amber-500 dark:text-amber-400" />
//                 </div>

//                 {/* Step 3: Complete */}
//                 <div className="flex items-center gap-2">
//                     <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 border border-green-500/50 flex items-center justify-center text-[8px] text-white font-bold shadow-sm">3</div>
//                     <div className="flex-1 h-1.5 bg-green-200/50 dark:bg-green-800/30 rounded"></div>
//                     <div className="text-[9px] text-green-700 dark:text-green-300 font-medium">Complete</div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// const ChatVisual = () => (
//     <div className="mt-auto w-full opacity-80 group-hover:opacity-100 transition-all duration-500">
//         <div className="bg-sky-50/50 dark:bg-sky-950/30 rounded-lg p-3 border border-sky-200/50 dark:border-sky-800/50 space-y-2">
//             {/* Chat Interface */}
//             <div className="space-y-2">
//                 {/* Message 1 */}
//                 <div className="flex gap-2 items-start">
//                     <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 shadow-sm">
//                         A
//                     </div>
//                     <div className="flex-1 bg-sky-100/50 dark:bg-sky-900/30 rounded-lg rounded-tl-none p-2 border border-sky-300/50 dark:border-sky-700/50">
//                         <div className="h-1.5 w-full bg-sky-300/40 dark:bg-sky-700/40 rounded mb-1"></div>
//                         <div className="h-1.5 w-3/4 bg-sky-300/30 dark:bg-sky-700/30 rounded"></div>
//                     </div>
//                 </div>

//                 {/* Message 2 */}
//                 <div className="flex gap-2 items-start flex-row-reverse">
//                     <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0 shadow-sm">
//                         B
//                     </div>
//                     <div className="flex-1 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-lg rounded-tr-none p-2 border border-indigo-300/50 dark:border-indigo-700/50">
//                         <div className="h-1.5 w-full bg-indigo-300/40 dark:bg-indigo-700/40 rounded"></div>
//                     </div>
//                 </div>
//             </div>

//             {/* Input Area */}
//             <div className="flex items-center gap-1.5 pt-1.5 border-t border-sky-200/50 dark:border-sky-800/50">
//                 <div className="flex-1 h-6 bg-white/20 dark:bg-sky-900/20 rounded px-2 flex items-center border border-sky-300/30 dark:border-sky-700/30">
//                     <div className="h-1 w-full bg-sky-300/30 dark:bg-sky-700/30 rounded"></div>
//                 </div>
//                 <MessageCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
//             </div>
//         </div>
//     </div>
// );

// const VideoVisual = () => (
//     <div className="mt-auto w-full opacity-80 group-hover:opacity-100 transition-all duration-500">
//         <div className="bg-rose-50/50 dark:bg-rose-950/30 rounded-lg p-3 border border-rose-200/50 dark:border-rose-800/50 relative">
//             {/* Video Call Interface */}
//             <div className="space-y-2">
//                 {/* Main Video Area */}
//                 <div className="relative aspect-video bg-gradient-to-br from-rose-900 to-pink-900 rounded border border-rose-400/30 dark:border-rose-600/30 overflow-hidden shadow-inner">
//                     {/* Video Grid Pattern */}
//                     <div className="absolute inset-0 grid grid-cols-3 gap-px opacity-20">
//                         {Array.from({ length: 9 }).map((_, i) => (
//                             <div key={i} className="bg-rose-500/20"></div>
//                         ))}
//                     </div>

//                     {/* User Avatar in Video */}
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
//                             U
//                         </div>
//                     </div>

//                     {/* Live Badge */}
//                     <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-red-500/40 border border-red-500/60 rounded-full shadow-sm">
//                         <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
//                         <span className="text-[8px] font-bold text-red-400">LIVE</span>
//                     </div>
//                 </div>

//                 {/* Controls */}
//                 <div className="flex items-center justify-center gap-2">
//                     <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-rose-900/20 border border-rose-300/50 dark:border-rose-700/50 flex items-center justify-center">
//                         <Video className="w-3 h-3 text-rose-600 dark:text-rose-400" />
//                     </div>
//                     <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-rose-900/20 border border-rose-300/50 dark:border-rose-700/50 flex items-center justify-center">
//                         <div className="w-2 h-2 rounded-full bg-rose-500"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// const RatingsVisual = () => (
//     <div className="mt-auto w-full opacity-80 group-hover:opacity-100 transition-all duration-500">
//         <div className="bg-amber-50/50 dark:bg-amber-950/30 rounded-lg p-3 border border-amber-200/50 dark:border-amber-800/50 space-y-3">
//             {/* Rating Display */}
//             <div className="flex items-center gap-2">
//                 <div className="flex gap-1 text-amber-500">
//                     {[1, 2, 3, 4, 5].map(i => (
//                         <Star key={i} className="w-4 h-4 fill-current" style={{ animation: `pulse-glow 2s ease-in-out ${i * 0.1}s infinite` }} />
//                     ))}
//                 </div>
//                 <div className="flex-1">
//                     <div className="text-sm font-bold text-amber-700 dark:text-amber-300">4.9</div>
//                 </div>
//             </div>

//             {/* Rating Breakdown */}
//             <div className="space-y-1.5">
//                 {[
//                     { label: 'Teaching', value: 95, gradient: 'from-amber-400 to-amber-500' },
//                     { label: 'Communication', value: 90, gradient: 'from-yellow-400 to-yellow-500' },
//                     { label: 'Reliability', value: 88, gradient: 'from-orange-400 to-orange-500' }
//                 ].map((item, i) => (
//                     <div key={i} className="space-y-0.5">
//                         <div className="flex items-center justify-between">
//                             <div className="text-[9px] text-amber-700/70 dark:text-amber-300/70">{item.label}</div>
//                             <div className="text-[9px] font-semibold text-amber-700 dark:text-amber-300">{item.value}%</div>
//                         </div>
//                         <div className="h-1.5 bg-amber-200/50 dark:bg-amber-800/30 rounded-full overflow-hidden">
//                             <div 
//                                 className={`h-full bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-500`}
//                                 style={{ width: `${item.value}%` }}
//                             ></div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Review Count */}
//             <div className="pt-1.5 border-t border-amber-200/50 dark:border-amber-800/50 text-[9px] text-amber-700/70 dark:text-amber-300/70 text-center">
//                 500+ verified reviews
//             </div>
//         </div>
//     </div>
// );

// const cardData = [
//     {
//         title: 'Smart Skill Matching (AI)',
//         description: 'AI connects users based on skills, availability, and learning goals.',
//         features: ['Machine Learning Algorithms', 'Real-time Matching', 'Personalized Recommendations'],
//         stats: '95% Match Accuracy',
//         label: 'AI Powered',
//         icon: <BrainCircuit className="w-8 h-8 text-foreground" />,
//         visual: <AIVisual />
//     },
//     {
//         title: 'Advanced Skill Search',
//         description: 'Filter skills by category, level, location, and availability.',
//         features: ['Multi-filter Search', 'Location-based', 'Skill Level Filtering'],
//         stats: '10K+ Skills Available',
//         label: 'Discover',
//         icon: <ScanSearch className="w-8 h-8 text-foreground" />,
//         visual: <SearchVisual />
//     },
//     {
//         title: 'Skill-Based Profiles',
//         description: 'Display skills, experience, endorsements, and achievements.',
//         features: ['Portfolio Showcase', 'Endorsements', 'Achievement Badges'],
//         stats: 'Verified Profiles',
//         label: 'Identity',
//         icon: <IdCard className="w-6 h-6 text-foreground" />,
//         visual: <ProfileVisual />
//     },
//     {
//         title: 'Seamless Swap Workflow',
//         description: 'Request, schedule, and complete skill swaps effortlessly.',
//         features: ['One-click Requests', 'Calendar Integration', 'Auto-scheduling'],
//         stats: 'Instant Matching',
//         label: 'Exchange',
//         icon: <ArrowLeftRight className="w-6 h-6 text-foreground" />,
//         visual: <SwapVisual />
//     },
//     {
//         title: 'Real-Time Chat',
//         description: 'Message instantly, share files, and stay updated.',
//         features: ['Instant Messaging', 'File Sharing', 'Read Receipts'],
//         stats: 'Real-time Sync',
//         label: 'Connect',
//         icon: <MessageCircle className="w-6 h-6 text-foreground" />,
//         visual: <ChatVisual />
//     },
//     {
//         title: 'Video Learning Sessions',
//         description: 'WebRTC-powered video sessions for learning and teaching.',
//         features: ['HD Video Quality', 'Screen Sharing', 'Recording Available'],
//         stats: 'HD Quality',
//         label: 'Live',
//         icon: <Video className="w-6 h-6 text-foreground" />,
//         visual: <VideoVisual />
//     },
//     {
//         title: 'Ratings & Trust System',
//         description: 'Authentic reviews and multi-criteria ratings.',
//         features: ['Multi-criteria Ratings', 'Verified Reviews', 'Trust Score'],
//         stats: '4.9/5.0 Average',
//         label: 'Trust',
//         icon: <Star className="w-6 h-6 text-foreground" />,
//         visual: <RatingsVisual />
//     },
// ];

// const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
//     const el = document.createElement('div');
//     el.className = 'particle';
//     el.style.cssText = `
//     position: absolute;
//     width: 4px;
//     height: 4px;
//     border-radius: 50%;
//     background: rgba(${color}, 1);
//     box-shadow: 0 0 6px rgba(${color}, 0.6);
//     pointer-events: none;
//     z-index: 100;
//     left: ${x}px;
//     top: ${y}px;
//   `;
//     return el;
// };

// const calculateSpotlightValues = radius => ({
//     proximity: radius * 0.5,
//     fadeDistance: radius * 0.75
// });

// const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
//     const rect = card.getBoundingClientRect();
//     const relativeX = ((mouseX - rect.left) / rect.width) * 100;
//     const relativeY = ((mouseY - rect.top) / rect.height) * 100;

//     card.style.setProperty('--glow-x', `${relativeX}%`);
//     card.style.setProperty('--glow-y', `${relativeY}%`);
//     card.style.setProperty('--glow-intensity', glow.toString());
//     card.style.setProperty('--glow-radius', `${radius}px`);
// };

// const ParticleCard = ({
//     children,
//     className = '',
//     disableAnimations = false,
//     style,
//     particleCount = DEFAULT_PARTICLE_COUNT,
//     glowColor = DEFAULT_GLOW_COLOR,
//     enableTilt = true,
//     clickEffect = false,
//     enableMagnetism = false
// }) => {
//     const cardRef = useRef(null);
//     const particlesRef = useRef([]);
//     const timeoutsRef = useRef([]);
//     const isHoveredRef = useRef(false);
//     const memoizedParticles = useRef([]);
//     const particlesInitialized = useRef(false);
//     const magnetismAnimationRef = useRef(null);

//     const initializeParticles = useCallback(() => {
//         if (particlesInitialized.current || !cardRef.current) return;

//         const { width, height } = cardRef.current.getBoundingClientRect();
//         memoizedParticles.current = Array.from({ length: particleCount }, () =>
//             createParticleElement(Math.random() * width, Math.random() * height, glowColor)
//         );
//         particlesInitialized.current = true;
//     }, [particleCount, glowColor]);

//     const clearAllParticles = useCallback(() => {
//         timeoutsRef.current.forEach(clearTimeout);
//         timeoutsRef.current = [];
//         magnetismAnimationRef.current?.kill();

//         particlesRef.current.forEach(particle => {
//             gsap.to(particle, {
//                 scale: 0,
//                 opacity: 0,
//                 duration: 0.3,
//                 ease: 'back.in(1.7)',
//                 onComplete: () => {
//                     particle.parentNode?.removeChild(particle);
//                 }
//             });
//         });
//         particlesRef.current = [];
//     }, []);

//     const animateParticles = useCallback(() => {
//         if (!cardRef.current || !isHoveredRef.current) return;

//         if (!particlesInitialized.current) {
//             initializeParticles();
//         }

//         memoizedParticles.current.forEach((particle, index) => {
//             const timeoutId = setTimeout(() => {
//                 if (!isHoveredRef.current || !cardRef.current) return;

//                 const clone = particle.cloneNode(true);
//                 cardRef.current.appendChild(clone);
//                 particlesRef.current.push(clone);

//                 gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

//                 gsap.to(clone, {
//                     x: (Math.random() - 0.5) * 100,
//                     y: (Math.random() - 0.5) * 100,
//                     rotation: Math.random() * 360,
//                     duration: 2 + Math.random() * 2,
//                     ease: 'none',
//                     repeat: -1,
//                     yoyo: true
//                 });

//                 gsap.to(clone, {
//                     opacity: 0.3,
//                     duration: 1.5,
//                     ease: 'power2.inOut',
//                     repeat: -1,
//                     yoyo: true
//                 });
//             }, index * 100);

//             timeoutsRef.current.push(timeoutId);
//         });
//     }, [initializeParticles]);

//     useEffect(() => {
//         if (disableAnimations || !cardRef.current) return;

//         const element = cardRef.current;

//         const handleMouseEnter = () => {
//             isHoveredRef.current = true;
//             animateParticles();

//             if (enableTilt) {
//                 gsap.to(element, {
//                     rotateX: 5,
//                     rotateY: 5,
//                     duration: 0.3,
//                     ease: 'power2.out',
//                     transformPerspective: 1000
//                 });
//             }
//         };

//         const handleMouseLeave = () => {
//             isHoveredRef.current = false;
//             clearAllParticles();

//             if (enableTilt) {
//                 gsap.to(element, {
//                     rotateX: 0,
//                     rotateY: 0,
//                     duration: 0.3,
//                     ease: 'power2.out'
//                 });
//             }

//             if (enableMagnetism) {
//                 gsap.to(element, {
//                     x: 0,
//                     y: 0,
//                     duration: 0.3,
//                     ease: 'power2.out'
//                 });
//             }
//         };

//         const handleMouseMove = e => {
//             if (!enableTilt && !enableMagnetism) return;

//             const rect = element.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             const centerX = rect.width / 2;
//             const centerY = rect.height / 2;

//             if (enableTilt) {
//                 const rotateX = ((y - centerY) / centerY) * -10;
//                 const rotateY = ((x - centerX) / centerX) * 10;

//                 gsap.to(element, {
//                     rotateX,
//                     rotateY,
//                     duration: 0.1,
//                     ease: 'power2.out',
//                     transformPerspective: 1000
//                 });
//             }

//             if (enableMagnetism) {
//                 const magnetX = (x - centerX) * 0.05;
//                 const magnetY = (y - centerY) * 0.05;

//                 magnetismAnimationRef.current = gsap.to(element, {
//                     x: magnetX,
//                     y: magnetY,
//                     duration: 0.3,
//                     ease: 'power2.out'
//                 });
//             }
//         };

//         const handleClick = e => {
//             if (!clickEffect) return;

//             const rect = element.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;

//             const maxDistance = Math.max(
//                 Math.hypot(x, y),
//                 Math.hypot(x - rect.width, y),
//                 Math.hypot(x, y - rect.height),
//                 Math.hypot(x - rect.width, y - rect.height)
//             );

//             const ripple = document.createElement('div');
//             ripple.style.cssText = `
//         position: absolute;
//         width: ${maxDistance * 2}px;
//         height: ${maxDistance * 2}px;
//         border-radius: 50%;
//         background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
//         left: ${x - maxDistance}px;
//         top: ${y - maxDistance}px;
//         pointer-events: none;
//         z-index: 1000;
//       `;

//             element.appendChild(ripple);

//             gsap.fromTo(
//                 ripple,
//                 {
//                     scale: 0,
//                     opacity: 1
//                 },
//                 {
//                     scale: 1,
//                     opacity: 0,
//                     duration: 0.8,
//                     ease: 'power2.out',
//                     onComplete: () => ripple.remove()
//                 }
//             );
//         };

//         element.addEventListener('mouseenter', handleMouseEnter);
//         element.addEventListener('mouseleave', handleMouseLeave);
//         element.addEventListener('mousemove', handleMouseMove);
//         element.addEventListener('click', handleClick);

//         return () => {
//             isHoveredRef.current = false;
//             element.removeEventListener('mouseenter', handleMouseEnter);
//             element.removeEventListener('mouseleave', handleMouseLeave);
//             element.removeEventListener('mousemove', handleMouseMove);
//             element.removeEventListener('click', handleClick);
//             clearAllParticles();
//         };
//     }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

//     return (
//         <div
//             ref={cardRef}
//             className={`${className} relative overflow-hidden`}
//             style={{ ...style, position: 'relative', overflow: 'hidden' }}
//         >
//             {children}
//         </div>
//     );
// };

// const GlobalSpotlight = ({
//     gridRef,
//     disableAnimations = false,
//     enabled = true,
//     spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
//     glowColor = DEFAULT_GLOW_COLOR
// }) => {
//     const spotlightRef = useRef(null);
//     const isInsideSection = useRef(false);

//     useEffect(() => {
//         if (disableAnimations || !gridRef?.current || !enabled) return;

//         const spotlight = document.createElement('div');
//         spotlight.className = 'global-spotlight';
//         spotlight.style.cssText = `
//       position: fixed;
//       width: 800px;
//       height: 800px;
//       border-radius: 50%;
//       pointer-events: none;
//       background: radial-gradient(circle,
//         rgba(${glowColor}, 0.15) 0%,
//         rgba(${glowColor}, 0.08) 15%,
//         rgba(${glowColor}, 0.04) 25%,
//         rgba(${glowColor}, 0.02) 40%,
//         rgba(${glowColor}, 0.01) 65%,
//         transparent 70%
//       );
//       z-index: 200;
//       opacity: 0;
//       transform: translate(-50%, -50%);
//       mix-blend-mode: screen;
//     `;
//         document.body.appendChild(spotlight);
//         spotlightRef.current = spotlight;

//         const handleMouseMove = e => {
//             if (!spotlightRef.current || !gridRef.current) return;

//             const section = gridRef.current.closest('.bento-section');
//             const rect = section?.getBoundingClientRect();
//             const mouseInside =
//                 rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

//             isInsideSection.current = mouseInside || false;
//             const cards = gridRef.current.querySelectorAll('.card');

//             if (!mouseInside) {
//                 gsap.to(spotlightRef.current, {
//                     opacity: 0,
//                     duration: 0.3,
//                     ease: 'power2.out'
//                 });
//                 cards.forEach(card => {
//                     card.style.setProperty('--glow-intensity', '0');
//                 });
//                 return;
//             }

//             const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
//             let minDistance = Infinity;

//             cards.forEach(card => {
//                 const cardElement = card;
//                 const cardRect = cardElement.getBoundingClientRect();
//                 const centerX = cardRect.left + cardRect.width / 2;
//                 const centerY = cardRect.top + cardRect.height / 2;
//                 const distance =
//                     Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
//                 const effectiveDistance = Math.max(0, distance);

//                 minDistance = Math.min(minDistance, effectiveDistance);

//                 let glowIntensity = 0;
//                 if (effectiveDistance <= proximity) {
//                     glowIntensity = 1;
//                 } else if (effectiveDistance <= fadeDistance) {
//                     glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
//                 }

//                 updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
//             });

//             gsap.to(spotlightRef.current, {
//                 left: e.clientX,
//                 top: e.clientY,
//                 duration: 0.1,
//                 ease: 'power2.out'
//             });

//             const targetOpacity =
//                 minDistance <= proximity
//                     ? 0.8
//                     : minDistance <= fadeDistance
//                         ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
//                         : 0;

//             gsap.to(spotlightRef.current, {
//                 opacity: targetOpacity,
//                 duration: targetOpacity > 0 ? 0.2 : 0.5,
//                 ease: 'power2.out'
//             });
//         };

//         const handleMouseLeave = () => {
//             isInsideSection.current = false;
//             gridRef.current?.querySelectorAll('.card').forEach(card => {
//                 card.style.setProperty('--glow-intensity', '0');
//             });
//             if (spotlightRef.current) {
//                 gsap.to(spotlightRef.current, {
//                     opacity: 0,
//                     duration: 0.3,
//                     ease: 'power2.out'
//                 });
//             }
//         };

//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseleave', handleMouseLeave);

//         return () => {
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseleave', handleMouseLeave);
//             spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
//         };
//     }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

//     return null;
// };

// const BentoCardGrid = ({ children, gridRef }) => {
//     useEffect(() => {
//         if (!gridRef.current) return;

//         const ctx = gsap.context(() => {
//             const cards = gridRef.current.querySelectorAll('.card');
//             gsap.from(cards, {
//                 y: 60,
//                 opacity: 0,
//                 scale: 0.95,
//                 duration: 1,
//                 stagger: {
//                     amount: 0.6,
//                     from: "start"
//                 },
//                 ease: "power3.out",
//                 delay: 0.1,
//                 clearProps: "all"
//             });
//         }, gridRef);

//         return () => ctx.revert();
//     }, [gridRef]);

//     return (
//         <div
//             className="bento-section w-full max-w-7xl select-none relative mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
//             style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
//             ref={gridRef}
//         >
//             {children}
//         </div>
//     );
// };

// const useMobileDetection = () => {
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

//         checkMobile();
//         window.addEventListener('resize', checkMobile);

//         return () => window.removeEventListener('resize', checkMobile);
//     }, []);

//     return isMobile;
// };

// const MagicBento = ({
//     textAutoHide = true,
//     enableStars = true,
//     enableSpotlight = true,
//     enableBorderGlow = true,
//     disableAnimations = false,
//     spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
//     particleCount = DEFAULT_PARTICLE_COUNT,
//     enableTilt = true,
//     glowColor = DEFAULT_GLOW_COLOR,
//     clickEffect = true,
//     enableMagnetism = true
// }) => {
//     const gridRef = useRef(null);
//     const isMobile = useMobileDetection();
//     const shouldDisableAnimations = disableAnimations || isMobile;

//     return (
//         <>
//             <style>
//                 {`
//           .bento-section {
//             --glow-x: 50%;
//             --glow-y: 50%;
//             --glow-intensity: 0;
//             --glow-radius: 200px;
//             --glow-color: ${glowColor};
//             --border-color: var(--border);
//             --background-dark: transparent;
//             --white: var(--foreground);
//             --purple-primary: oklch(var(--primary));
//             --purple-glow: oklch(var(--primary) / 0.2);
//             --purple-border: oklch(var(--primary) / 0.8);
//           }

//           .card-responsive {
//             grid-template-columns: 1fr;
//             width: 100%;
//             max-width: 80rem;
//             margin: 0 auto;
//             gap: 1rem;
//           }

//           @media (min-width: 640px) {
//             .card-responsive {
//               grid-template-columns: repeat(2, 1fr);
//               gap: 1.25rem;
//             }
//           }

//           @media (min-width: 1024px) {
//             .card-responsive {
//               grid-template-columns: repeat(4, 1fr);
//               grid-auto-rows: minmax(200px, auto);
//               gap: 1.5rem;
//             }

//             /* Row 1-2: Large featured card (2x2) - Top Left */
//             .card-responsive .card:nth-child(1) {
//               grid-column: 1 / 3;
//               grid-row: 1 / 3;
//             }

//             /* Row 1: Wide card (2x1) - Top Right */
//             .card-responsive .card:nth-child(2) {
//               grid-column: 3 / 5;
//               grid-row: 1 / 2;
//             }

//             /* Row 2: Small card (1x1) - Right Top */
//             .card-responsive .card:nth-child(3) {
//               grid-column: 3 / 4;
//               grid-row: 2 / 3;
//             }

//             /* Row 2: Small card (1x1) - Right Top */
//             .card-responsive .card:nth-child(4) {
//               grid-column: 4 / 5;
//               grid-row: 2 / 3;
//             }

//             /* Row 3: Small card (1x1) - Bottom Left */
//             .card-responsive .card:nth-child(5) {
//               grid-column: 1 / 2;
//               grid-row: 3 / 4;
//             }

//             /* Row 3: Small card (1x1) - Bottom Left Center */
//             .card-responsive .card:nth-child(6) {
//               grid-column: 2 / 3;
//               grid-row: 3 / 4;
//             }

//             /* Row 3: Wide card (2x1) - Bottom Right */
//             .card-responsive .card:nth-child(7) {
//               grid-column: 3 / 5;
//               grid-row: 3 / 4;
//             }

//             /* Row 4: Wide card (4x1) - Full width bottom - Shorter height */
//             .card-responsive .card:nth-child(8) {
//               grid-column: 1 / 5;
//               grid-row: 4 / 5;
//               min-height: 180px;
//             }
//           }

//           @media (min-width: 1280px) {
//             .card-responsive {
//               gap: 2rem;
//             }
//           }

//           .card--border-glow::after {
//             content: '';
//             position: absolute;
//             inset: 0;
//             padding: 1.5px;
//             background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
//                 rgba(${glowColor}, calc(var(--glow-intensity) * 0.9)) 0%,
//                 rgba(${glowColor}, calc(var(--glow-intensity) * 0.5)) 25%,
//                 rgba(${glowColor}, calc(var(--glow-intensity) * 0.2)) 50%,
//                 transparent 70%);
//             border-radius: inherit;
//             -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//             -webkit-mask-composite: xor;
//             mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//             mask-composite: exclude;
//             pointer-events: none;
//             opacity: 0;
//             transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//             z-index: 1;
//           }

//           .card--border-glow:hover::after {
//             opacity: 1;
//           }

//           .card--border-glow:hover {
//             box-shadow: none;
//             transform: translateY(-2px);
//           }

//           .card {
//             transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
//             will-change: transform, box-shadow, border-color;
//           }

//           .card:hover {
//             transform: translateY(-6px) scale(1.02);
//             box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 
//                         0 0 80px rgba(${glowColor}, 0.2),
//                         0 0 120px rgba(${glowColor}, 0.08);
//             border-color: rgba(255, 255, 255, 0.2);
//           }

//           .card__header {
//             transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
//           }

//           .card:hover .card__header {
//             transform: translateY(-3px);
//           }

//           .card:hover .card__label {
//             opacity: 1;
//             letter-spacing: 0.08em;
//             transform: translateX(2px);
//           }

//           .card:hover .card__title {
//             transform: translateY(-2px);
//           }

//           .card__title {
//             transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
//           }

//           .card__description {
//             transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           }

//           .card:hover .card__description {
//             opacity: 1;
//             transform: translateY(-1px);
//           }

//           .card:hover .card__content {
//             transform: translateY(-2px);
//           }

//           .card__content {
//             transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
//           }

//           .particle::before {
//             content: '';
//             position: absolute;
//             top: -2px;
//             left: -2px;
//             right: -2px;
//             bottom: -2px;
//             background: rgba(${glowColor}, 0.2);
//             border-radius: 50%;
//             z-index: -1;
//           }

//           .particle-container:hover {
//             box-shadow: 0 4px 20px rgba(46, 24, 78, 0.2), 0 0 30px rgba(${glowColor}, 0.2);
//           }

//           .text-clamp-1 {
//             display: -webkit-box;
//             -webkit-box-orient: vertical;
//             -webkit-line-clamp: 1;
//             line-clamp: 1;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }

//           .text-clamp-2 {
//             display: -webkit-box;
//             -webkit-box-orient: vertical;
//             -webkit-line-clamp: 2;
//             line-clamp: 2;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }

//           @media (max-width: 639px) {
//             .card-responsive {
//               grid-template-columns: 1fr;
//               width: 100%;
//               margin: 0 auto;
//               gap: 1rem;
//             }

//             .card-responsive .card {
//               width: 100%;
//               min-height: 220px;
//             }
//           }

//             @keyframes float {
//               0%, 100% { transform: translateY(0px) translateZ(0); }
//               50% { transform: translateY(-12px) translateZ(0); }
//             }

//             @keyframes float-delayed {
//               0%, 100% { transform: translateY(0px) translateZ(0); }
//               50% { transform: translateY(-10px) translateZ(0); }
//             }

//             @keyframes pulse-glow {
//               0%, 100% { 
//                 opacity: 0.6; 
//                 transform: scale(1); 
//                 filter: brightness(1);
//               }
//               50% { 
//                 opacity: 1; 
//                 transform: scale(1.15); 
//                 filter: brightness(1.3) drop-shadow(0 0 8px currentColor);
//               }
//             }

//             @keyframes drift {
//               0% { transform: translateX(0) translateZ(0); }
//               50% { transform: translateX(6px) translateZ(0); }
//               100% { transform: translateX(0) translateZ(0); }
//             }

//             @keyframes slide-up-fade {
//               0% { 
//                 opacity: 0; 
//                 transform: translateY(12px) translateZ(0); 
//               }
//               100% { 
//                 opacity: 1; 
//                 transform: translateY(0) translateZ(0); 
//               }
//             }

//             @keyframes shimmer {
//               0% { background-position: -1000px 0; }
//               100% { background-position: 1000px 0; }
//             }

//             .animate-float { 
//               animation: float 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
//               will-change: transform;
//             }
//             .animate-float-delayed { 
//               animation: float-delayed 7s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
//               will-change: transform;
//             }
//             .animate-pulse-glow { 
//               animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
//               will-change: transform, opacity, filter;
//             }
//             .animate-drift { 
//               animation: drift 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
//               will-change: transform;
//             }
//             .animate-spin-slow { 
//               animation: spin 12s linear infinite; 
//             }

//             .delay-100 { animation-delay: 100ms; }
//             .delay-200 { animation-delay: 200ms; }
//             .delay-300 { animation-delay: 300ms; }
//             .delay-500 { animation-delay: 500ms; }
//             .delay-700 { animation-delay: 700ms; }

//             /* Smooth scroll behavior */
//             html {
//               scroll-behavior: smooth;
//             }

//             /* Enhanced focus states */
//             .card:focus-visible {
//               outline: 2px solid rgba(${glowColor}, 0.5);
//               outline-offset: 4px;
//             }
//         `}
//             </style>

//             {enableSpotlight && (
//                 <GlobalSpotlight
//                     gridRef={gridRef}
//                     disableAnimations={shouldDisableAnimations}
//                     enabled={enableSpotlight}
//                     spotlightRadius={spotlightRadius}
//                     glowColor={glowColor}
//                 />
//             )}

//             <BentoCardGrid gridRef={gridRef}>
//                 <div className="card-responsive grid">
//                     {cardData.map((card, index) => {
//                         const isLastCard = index === cardData.length - 1;
//                         const baseClassName = `card group flex flex-col justify-between relative w-full ${isLastCard ? 'min-h-[180px]' : 'min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]'} p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/10 dark:border-white/5 bg-gradient-to-br from-neutral-50/80 via-neutral-100/60 to-neutral-50/80 dark:from-black/50 dark:via-neutral-900/30 dark:to-black/50 backdrop-blur-2xl shadow-lg font-light overflow-hidden ${enableBorderGlow ? 'card--border-glow' : ''
//                             }`;

//                         const cardStyle = {
//                             backgroundColor: 'transparent',
//                             borderColor: 'var(--border-color)',
//                             color: 'var(--foreground)',
//                             '--glow-x': '50%',
//                             '--glow-y': '50%',
//                             '--glow-intensity': '0',
//                             '--glow-radius': '200px'
//                         };

//                         if (enableStars) {
//                             return (
//                                 <ParticleCard
//                                     key={index}
//                                     className={baseClassName}
//                                     style={cardStyle}
//                                     disableAnimations={shouldDisableAnimations}
//                                     particleCount={particleCount}
//                                     glowColor={glowColor}
//                                     enableTilt={enableTilt}
//                                     clickEffect={clickEffect}
//                                     enableMagnetism={enableMagnetism}
//                                 >
//                                     <div className="card__header flex justify-between items-start gap-4 relative text-foreground z-10">
//                                         <span className="card__label text-xs sm:text-sm font-semibold opacity-70 group-hover:opacity-100 uppercase tracking-[0.15em] transition-all duration-500">{card.label}</span>
//                                         <div className="relative">
//                                             <div className="absolute inset-0 bg-neutral-400/20 dark:bg-neutral-500/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//                                             <div className="relative transform group-hover:rotate-6 group-hover:-translate-y-1 transition-all duration-500">
//                                                 {card.icon}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="card__content flex flex-col relative text-foreground h-full z-10">
//                                         <div className="mb-auto space-y-4">
//                                             <h3 className={`card__title font-bold text-lg sm:text-xl lg:text-2xl m-0 leading-tight ${textAutoHide ? 'text-clamp-1' : ''} bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent`}>
//                                                 {card.title}
//                                             </h3>
//                                             <p
//                                                 className={`card__description text-xs sm:text-sm leading-relaxed text-muted-foreground/80 group-hover:text-foreground/90 ${textAutoHide ? 'text-clamp-2' : ''} transition-all duration-500`}
//                                             >
//                                                 {card.description}
//                                             </p>
//                                             {card.features && (
//                                                 <div className="space-y-2 mt-3">
//                                                     {card.features.map((feature, idx) => (
//                                                         <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground/70 group-hover:text-muted-foreground/90 transition-colors duration-500">
//                                                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500/80 transition-colors duration-500"></div>
//                                                             <span>{feature}</span>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                             {card.stats && (
//                                                 <div className="mt-4 pt-3 border-t border-white/10">
//                                                     <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-500">
//                                                         {card.stats}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="mt-4 transform group-hover:translate-y-[-4px] transition-all duration-700">
//                                             {card.visual}
//                                         </div>
//                                     </div>
//                                     <div className="absolute inset-0 bg-gradient-to-br from-neutral-400/0 via-transparent to-neutral-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl sm:rounded-3xl"></div>
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl"></div>
//                                 </ParticleCard>
//                             );
//                         }

//                         return (
//                             <div
//                                 key={index}
//                                 className={baseClassName}
//                                 style={cardStyle}
//                                 ref={el => {
//                                     if (!el) return;

//                                     const handleMouseMove = e => {
//                                         if (shouldDisableAnimations) return;

//                                         const rect = el.getBoundingClientRect();
//                                         const x = e.clientX - rect.left;
//                                         const y = e.clientY - rect.top;
//                                         const centerX = rect.width / 2;
//                                         const centerY = rect.height / 2;

//                                         if (enableTilt) {
//                                             const rotateX = ((y - centerY) / centerY) * -10;
//                                             const rotateY = ((x - centerX) / centerX) * 10;

//                                             gsap.to(el, {
//                                                 rotateX,
//                                                 rotateY,
//                                                 duration: 0.1,
//                                                 ease: 'power2.out',
//                                                 transformPerspective: 1000
//                                             });
//                                         }

//                                         if (enableMagnetism) {
//                                             const magnetX = (x - centerX) * 0.05;
//                                             const magnetY = (y - centerY) * 0.05;

//                                             gsap.to(el, {
//                                                 x: magnetX,
//                                                 y: magnetY,
//                                                 duration: 0.3,
//                                                 ease: 'power2.out'
//                                             });
//                                         }
//                                     };

//                                     const handleMouseLeave = () => {
//                                         if (shouldDisableAnimations) return;

//                                         if (enableTilt) {
//                                             gsap.to(el, {
//                                                 rotateX: 0,
//                                                 rotateY: 0,
//                                                 duration: 0.3,
//                                                 ease: 'power2.out'
//                                             });
//                                         }

//                                         if (enableMagnetism) {
//                                             gsap.to(el, {
//                                                 x: 0,
//                                                 y: 0,
//                                                 duration: 0.3,
//                                                 ease: 'power2.out'
//                                             });
//                                         }
//                                     };

//                                     const handleClick = e => {
//                                         if (!clickEffect || shouldDisableAnimations) return;

//                                         const rect = el.getBoundingClientRect();
//                                         const x = e.clientX - rect.left;
//                                         const y = e.clientY - rect.top;

//                                         const maxDistance = Math.max(
//                                             Math.hypot(x, y),
//                                             Math.hypot(x - rect.width, y),
//                                             Math.hypot(x, y - rect.height),
//                                             Math.hypot(x - rect.width, y - rect.height)
//                                         );

//                                         const ripple = document.createElement('div');
//                                         ripple.style.cssText = `
//                       position: absolute;
//                       width: ${maxDistance * 2}px;
//                       height: ${maxDistance * 2}px;
//                       border-radius: 50%;
//                       background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
//                       left: ${x - maxDistance}px;
//                       top: ${y - maxDistance}px;
//                       pointer-events: none;
//                       z-index: 1000;
//                     `;

//                                         el.appendChild(ripple);

//                                         gsap.fromTo(
//                                             ripple,
//                                             {
//                                                 scale: 0,
//                                                 opacity: 1
//                                             },
//                                             {
//                                                 scale: 1,
//                                                 opacity: 0,
//                                                 duration: 0.8,
//                                                 ease: 'power2.out',
//                                                 onComplete: () => ripple.remove()
//                                             }
//                                         );
//                                     };

//                                     el.addEventListener('mousemove', handleMouseMove);
//                                     el.addEventListener('mouseleave', handleMouseLeave);
//                                     el.addEventListener('click', handleClick);
//                                 }}
//                             >
//                                 <div className="card__header flex justify-between items-start gap-4 relative text-foreground z-10">
//                                     <span className="card__label text-xs sm:text-sm font-semibold opacity-70 group-hover:opacity-100 uppercase tracking-[0.15em] transition-all duration-500">{card.label}</span>
//                                     <div className="relative">
//                                         <div className="absolute inset-0 bg-neutral-400/20 dark:bg-neutral-500/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//                                         <div className="relative transform group-hover:rotate-6 group-hover:-translate-y-1 transition-all duration-500">
//                                             {card.icon}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="card__content flex flex-col relative text-foreground h-full z-10">
//                                     <div className="mb-auto space-y-4">
//                                         <h3 className={`card__title font-bold text-lg sm:text-xl lg:text-2xl m-0 leading-tight ${textAutoHide ? 'text-clamp-1' : ''} bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent`}>
//                                             {card.title}
//                                         </h3>
//                                         <p className={`card__description text-xs sm:text-sm leading-relaxed text-muted-foreground/80 group-hover:text-foreground/90 ${textAutoHide ? 'text-clamp-2' : ''} transition-all duration-500`}>
//                                             {card.description}
//                                         </p>
//                                         {card.features && (
//                                             <div className="space-y-2 mt-3">
//                                                 {card.features.map((feature, idx) => (
//                                                     <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground/70 group-hover:text-muted-foreground/90 transition-colors duration-500">
//                                                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-500/80 transition-colors duration-500"></div>
//                                                         <span>{feature}</span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}
//                                         {card.stats && (
//                                             <div className="mt-4 pt-3 border-t border-white/10">
//                                                 <div className="text-xs font-semibold text-purple-500/80 group-hover:text-purple-500 transition-colors duration-500">
//                                                     {card.stats}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="mt-4 transform group-hover:translate-y-[-4px] transition-all duration-700">
//                                         {card.visual}
//                                     </div>
//                                 </div>
//                                 <div className="absolute inset-0 bg-gradient-to-br from-neutral-400/0 via-transparent to-neutral-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl sm:rounded-3xl"></div>
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl sm:rounded-3xl"></div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </BentoCardGrid>
//         </>
//     );
// };

// export default MagicBento;
// -------------------------------------------------------------------

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Users, Search, ArrowLeftRight, MessageCircle, Shield, TrendingUp, Star, Calendar, Zap, Check, Bot, BotMessageSquare, StarHalf } from 'lucide-react';

// Animated Chart Component
// const MatchingChart = ({ cardColor = '#8b5cf6' }) => {
//   const [animated, setAnimated] = useState(false);

//   useEffect(() => {
//     setAnimated(true);
//   }, []);

//   return (
//     <div className="space-y-3 mt-6">
//       {[
//         { label: 'Skill Match', value: 85 },
//         { label: 'Availability', value: 92 },
//         { label: 'Location', value: 78 }
//       ].map((item, i) => (
//         <motion.div 
//           key={i} 
//           className="space-y-1.5"
//           initial={{ opacity: 0, x: -10 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: i * 0.1, duration: 0.4 }}
//         >
//           <div className="flex justify-between text-xs font-medium" style={{ color: '#6b7280' }}>
//             <span>{item.label}</span>
//             <motion.span 
//               className="font-semibold"
//               style={{ color: '#1f2937' }}
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ delay: i * 0.2 + 0.5, duration: 0.3 }}
//             >
//               {item.value}%
//             </motion.span>
//           </div>
//           <div className="h-2 rounded-full overflow-hidden" style={{ background: '#f3f4f6' }}>
//             <motion.div 
//               className="h-full rounded-full relative overflow-hidden"
//               style={{ background: cardColor }}
//               initial={{ width: 0 }}
//               animate={{ width: animated ? `${item.value}%` : '0%' }}
//               transition={{ 
//                 duration: 1.2,
//                 delay: i * 0.15,
//                 ease: 'easeOut'
//               }}
//             >
//               {/* Shimmer on progress bar */}
//               <motion.div
//                 className="absolute inset-0"
//                 style={{
//                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
//                 }}
//                 animate={{ x: ['-100%', '200%'] }}
//                 transition={{ 
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: 'linear',
//                   delay: i * 0.2
//                 }}
//               />
//             </motion.div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// AI Model Illustration Component
// AI Model Illustration Component
const MatchingChart = ({ cardColor = '#8b5cf6' }) => {
  return (
    <div className="mt-6 relative">
      {/* AI Neural Network Visualization */}
      <div className="relative h-48 flex items-center justify-center">
        {/* Input nodes (left) - Person icons */}
        <div className="absolute left-0 flex flex-col gap-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`input-${i}`}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white"
              style={{ borderColor: cardColor }}
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [`0 0 0 0 ${cardColor}40`, `0 0 0 8px ${cardColor}00`, `0 0 0 0 ${cardColor}40`]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              <Users className="w-4 h-4" style={{ color: cardColor }} />
            </motion.div>
          ))}
        </div>

        {/* Hidden layer nodes (middle) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`hidden-${i}`}
              className="w-4 h-4 rounded-full"
              style={{ background: cardColor }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Output nodes (right) - 3 Person icons */}
        <div className="absolute right-0 flex flex-col gap-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`output-${i}`}
              className="w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white"
              style={{ borderColor: cardColor }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
                boxShadow: [`0 0 0 0 ${cardColor}40`, `0 0 0 10px ${cardColor}00`, `0 0 0 0 ${cardColor}40`]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4
              }}
            >
              <Users className="w-4 h-4" style={{ color: cardColor }} />
            </motion.div>
          ))}
        </div>

        {/* Connection lines - Input to Hidden */}
        {[0, 1, 2].map((inputIdx) =>
          [0, 1, 2, 3, 4].map((hiddenIdx) => (
            <motion.svg
              key={`line-in-${inputIdx}-${hiddenIdx}`}
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            >
              <motion.line
                x1="32"
                y1={32 + inputIdx * 64}
                x2="50%"
                y2={24 + hiddenIdx * 32}
                stroke={cardColor}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="4 4"
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  strokeDashoffset: [0, -8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (inputIdx + hiddenIdx) * 0.1
                }}
              />
            </motion.svg>
          ))
        )}

        {/* Connection lines - Hidden to Output */}
        {[0, 1, 2, 3, 4].map((hiddenIdx) =>
          [0, 1, 2].map((outputIdx) => (
            <motion.svg
              key={`line-out-${hiddenIdx}-${outputIdx}`}
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            >
              <motion.line
                x1="50%"
                y1={24 + hiddenIdx * 32}
                x2="calc(100% - 32px)"
                y2={32 + outputIdx * 64}
                stroke={cardColor}
                strokeWidth="1.5"
                opacity="0.3"
                strokeDasharray="4 4"
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  strokeDashoffset: [0, -8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (hiddenIdx + outputIdx) * 0.12
                }}
              />
            </motion.svg>
          ))
        )}

        {/* Animated data particles flowing through network */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: cardColor, left: 0, top: `${20 + i * 33}%` }}
            animate={{
              left: ['5%', '48%', '92%'],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Energy pulses in middle layer */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`pulse-${i}`}
            className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2"
            style={{
              borderColor: cardColor,
              top: `${10 + i * 16}%`
            }}
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25
            }}
          />
        ))}

        {/* Sparkle effects around person icons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: i < 3 ? '5%' : '95%',
              top: `${25 + (i % 3) * 25}%`
            }}
          >
            <Sparkles
              className="w-3 h-3"
              style={{ color: cardColor }}
              opacity={0}
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              <Sparkles className="w-3 h-3" style={{ color: cardColor }} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* AI Label */}
      <div className="mt-4 text-center">
        <div className="text-sm font-semibold text-gray-700">AI Matching Engine</div>
        <div className="text-xs text-gray-500">Groq-powered skill matching</div>
      </div>
    </div>
  );
};
// Search Stats Component
const SearchStats = ({ cardColor = '#06b6d4' }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {[
        { icon: Users, value: '30+', label: 'Users' },
        { icon: Star, value: '20+', label: 'Skills' },
        { icon: TrendingUp, value: '95%', label: 'Match' }
      ].map((stat, i) => (
        <motion.div
          key={i}
          className="text-center p-3 rounded-xl backdrop-blur-sm border-2 relative overflow-hidden"
          style={{
            background: `${cardColor}10`,
            borderColor: `${cardColor}30`,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
            type: 'spring',
            stiffness: 200
          }}
          whileHover={{
            scale: 1.1,
            y: -4,
            boxShadow: `0 8px 16px ${cardColor}30`,
            transition: { duration: 0.2, type: 'spring' }
          }}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ background: cardColor }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="relative z-10"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              delay: i * 0.2
            }}
          >
            <stat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: cardColor }} />
          </motion.div>
          <motion.div
            className="text-lg font-bold relative z-10"
            style={{ color: '#1f2937' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            {stat.value}
          </motion.div>
          <div className="text-xs relative z-10" style={{ color: '#6b7280' }}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Community Growth Chart
const CommunityChart = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [20, 35, 52, 78, 95, 100];
  const maxValue = Math.max(...values);

  return (
    <div className="mt-6">
      <div className="flex items-end justify-between h-32 gap-2">
        {months.map((month, i) => {
          // Calculate height as a percentage of maxValue for scaling bars
          const heightPercent = (values[i] / maxValue) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative flex items-end" style={{ height: '100px', minHeight: '70px' }}>
                <div
                  className="w-full bg-gradient-to-t from-[#424242] to-[#31363F]  rounded-t-2xl shadow-lg transition-all duration-1000 ease-out border border-emerald-200"
                  style={{
                    height: show ? `${heightPercent}%` : `0%`,
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">{month}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <div className="text-sm font-semibold text-gray-700">Community Growth</div>
        <div className="text-xs text-gray-500">Active users per month</div>
      </div>
    </div>
  );
};

// Swap Workflow Steps
const SwapWorkflow = () => {
  const steps = [
    { icon: Search, label: 'Browse', color: 'text-[#37353E]' },
    { icon: ArrowLeftRight, label: 'Request', color: 'text-[#44444E]' },
    { icon: Calendar, label: 'Schedule', color: 'text-[#715A5A]' },
    { icon: Check, label: 'Complete', color: 'text-[#37353E]' }
  ];

  return (
    <div className="space-y-6">
      {/* Illustration Section */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" /> */}

        {/* Animated circles */}
        <div className="absolute w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ top: '20%', left: '15%' }} />
        <div className="absolute w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-30 animate-pulse" style={{ top: '50%', right: '20%', animationDelay: '1s' }} />

        {/* Main illustration */}
        <div className="relative flex items-center justify-center gap-8">
          {/* Left person */}
          <div className="flex flex-col items-center" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-[#31363F] to-[#424242] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="mt-2 w-12 h-3 bg-zinc-300 rounded-full" />
          </div>

          {/* Exchange arrows */}
          <div className="relative" style={{ animation: 'scaleIn 0.6s ease-out 0.3s backwards' }}>
            <div className="flex flex-col gap-2">
              <ArrowLeftRight className="w-12 h-12 text-zinc-500 animate-pulse" />
              <div className="flex gap-1 justify-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>

          {/* Right person */}
          <div className="flex flex-col items-center" style={{ animation: 'slideInRight 0.8s ease-out' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-[#31363F] to-[#424242] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="mt-2 w-12 h-3 bg-zinc-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-amber300 to-green-400" />
        <div className="relative flex justify-between">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 group"
              style={{ animation: `fadeInUp 0.6s ease-out ${i * 150}ms forwards`, opacity: 0 }}
            >
              <div className={`w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 ${step.color}`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-600">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Chat Preview
const ChatPreview = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const msgTimings = [500, 1200, 2000];
    msgTimings.forEach((delay, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, i]);
      }, delay);
    });
  }, []);

  return (
    <div className="mt-6 space-y-3">
      {[
        { sender: 'Alex', msg: 'Hey! Ready for our session?', align: 'left', color: 'bg-pink-100 text-pink-900' },
        { sender: 'You', msg: 'Yes! Let\'s start 🚀', align: 'right', color: 'bg-rose-100 text-rose-900' },
        { sender: 'Alex', msg: 'Perfect! Sharing screen now...', align: 'left', color: 'bg-pink-100 text-pink-900' }
      ].map((chat, i) => (
        messages.includes(i) && (
          <div key={i} className={`flex ${chat.align === 'right' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${chat.align === 'right' ? 'rounded-tr-sm' : 'rounded-tl-sm'} ${chat.color} text-xs font-medium shadow-sm`}
              style={{ animation: 'slideIn 0.4s ease-out' }}
            >
              {chat.msg}
            </div>
          </div>
        )
      ))}
      <div className="flex items-center gap-2 pt-2">
        <div className="flex-1 h-8 bg-gray-100 rounded-full" />
        <MessageCircle className="w-5 h-5 text-pink-500" />
      </div>
    </div>
  );
};

// Rating Display
const RatingDisplay = () => {
  const ratings = [
    { label: 'UI/UX Design', value: 4.6, max: 5 },
    { label: 'Matching Accuracy', value: 4.6, max: 5 },
    { label: 'Help & Support', value: 4.7, max: 5 },
    { label: 'Overall Experience', value: 4.6, max: 5 }
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-center gap-1 mb-4">
        {[...Array(4)].map((_, i) => (
          <Star
            key={i}
            className="w-6 h-6 fill-yellow-400 text-yellow-400"
            style={{
              animation: `starPop 0.5s ease-out ${i * 100}ms forwards`,
              opacity: 0,
              transform: 'scale(0)'
            }}
          />
        ))}
        <div className="relative w-5 h-5">
          {/* Full star background (grey) */}
          <Star className="text-gray-300" />

          {/* Half star overlay (color) */}
          <Star
            className="absolute top-0 left-0 fill-yellow-400 text-yellow-400"
            style={{ clipPath: "inset(0 45% 0 0)" }}
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-gray-900">4.6+</div>
        <div className="text-xs text-gray-500">Average Rating</div>
      </div>
      {ratings.map((rating, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-600 w-30 text-right">{rating.label}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(rating.value / rating.max) * 100}%`,
                transitionDelay: `${i * 100}ms`
              }}
            />
          </div>
          <span className="text-xs font-bold text-gray-900 w-8">{rating.value}</span>
        </div>
      ))}
    </div>
  );
};

const cardData = [

  {
    id: 1,
    title: 'Advanced Skill Search',
    subtitle: 'DISCOVER',
    description: 'Filter skills by category, level, location, and availability.',
    icon: Search,
    stats: '20+ Skills Available',
    size: 'small',
    color: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    component: SearchStats
  },
  {
    id: 2,
    title: 'Smart Matching (AI)',
    subtitle: 'AI POWERED',
    description: 'Intelligent algorithms connect you with perfect swap partners based on skills, availability, and learning goals.',
    icon: BotMessageSquare,
    stats: '85% Match Accuracy',
    size: 'medium',
    color: 'from-violet-50 to-purple-50',
    borderColor: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    component: MatchingChart
  },
  {
    id: 3,
    title: 'Thriving Community',
    subtitle: 'CONNECT',
    description: 'Join 30+ learners exchanging skills without money in a trusted network.',
    icon: Users,
    stats: '30+ Active Users',
    size: 'small',
    color: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    component: CommunityChart
  },
  {
    id: 4,
    title: 'Seamless Swap Workflow',
    subtitle: 'EXCHANGE',
    description: 'Request, schedule, and complete skill swaps effortlessly with our streamlined process.',
    icon: ArrowLeftRight,
    stats: '70% Completion Rate',
    size: 'medium',
    color: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    component: SwapWorkflow
  },
  {
    id: 5,
    title: 'Real-Time Chat',
    subtitle: 'LIVE',
    description: 'Instant messaging and HD video calls for seamless learning collaboration.',
    icon: MessageCircle,
    stats: 'Live Communication',
    size: 'small',
    color: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-200',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    component: ChatPreview
  },
  {
    id: 6,
    title: 'Ratings & Trust System',
    subtitle: 'TRUST',
    description: 'Multi-criteria ratings and verified reviews build community trust and credibility.',
    icon: Shield,
    stats: '4.6/5.0 Average Rating',
    size: 'small',
    color: 'from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    component: RatingDisplay
  }
];

const BentoCard = ({ card, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const Component = card.component;

  // Color palette: Violet (#8b5cf6), Cyan (#06b6d4), White/Gray
  // const primaryColor = '#8b5cf6'; // Violet
  // const secondaryColor = '#06b6d4'; // Cyan

  // const primaryColor = '#929AAB';
  const primaryColor = '#31363F';
  const secondaryColor = '#424242';


  // Motion values for microinteractions
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // const handleClick = () => {
  //   setClicked(true);
  //   setTimeout(() => setClicked(false), 600);
  // };

  // Alternate colors for cards
  const cardColor = index % 2 === 0 ? primaryColor : secondaryColor;
  const isPrimary = index % 2 === 0;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // onClick={handleClick}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      whileHover={{
        scale: 1.0,
        transition: { duration: 0.3, type: 'spring', stiffness: 400 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={`
        relative overflow-hidden rounded-2xl border-2
        bg-white/90 backdrop-blur-xl shadow-lg
        ${card.size === 'medium' ? 'col-span-1 sm:col-span-2 lg:col-span-2' : 'col-span-1'}
        cursor-pointer group
      `}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        borderColor: isHovered ? cardColor : '#e5e7eb',
        boxShadow: isHovered
          ? `0 20px 40px -12px ${cardColor}40, 0 0 0 1px ${cardColor}20`
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: isPrimary
            ? `linear-gradient(135deg, ${primaryColor}15 0%, transparent 50%, ${secondaryColor}10 100%)`
            : `linear-gradient(135deg, ${secondaryColor}15 0%, transparent 50%, ${primaryColor}10 100%)`
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${cardColor}20 50%, transparent 100%)`
        }}
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 1, ease: 'easeInOut', repeat: isHovered ? Infinity : 0, repeatDelay: 2 }}
      />

      {/* Ripple effect on click */}
      {clicked && (
        <motion.div
          className="absolute rounded-full"
          style={{
            background: cardColor,
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Floating particles */}
      {isHovered && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: cardColor,
            width: 4,
            height: 4,
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i % 3) * 25}%`,
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [-20, -40, -60],
            x: [0, (Math.random() - 0.5) * 20],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      ))}

      <div className="relative p-6 h-full flex flex-col z-10">
        {/* Header */}
        <motion.div
          className="flex items-start justify-between mb-4"
          animate={{ y: isHovered ? -3 : 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2.5 rounded-xl backdrop-blur-sm border-2 shadow-sm relative overflow-hidden"
              style={{
                background: `${cardColor}15`,
                borderColor: cardColor,
              }}
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17,
                rotate: { duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }
              }}
              whileHover={{
                boxShadow: `0 0 20px ${cardColor}40`
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <card.icon className="w-5 h-5" style={{ color: cardColor }} />
              </motion.div>
            </motion.div>
            <div>
              <motion.div
                className="text-[10px] font-bold tracking-wider mb-0.5 uppercase"
                style={{ color: cardColor }}
                animate={{
                  opacity: isHovered ? [1, 0.7, 1] : 1,
                }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
              >
                {card.subtitle}
              </motion.div>
              <motion.h3
                className="text-sm font-bold leading-tight"
                style={{ color: '#1f2937' }}
                animate={{
                  scale: isHovered ? 1.03 : 1,
                  x: isHovered ? [0, 2, 0] : 0
                }}
                transition={{
                  duration: 0.3,
                  x: { duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }
                }}
              >
                {card.title}
              </motion.h3>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-xs leading-relaxed mb-auto"
          style={{ color: '#6b7280' }}
          animate={{
            opacity: isHovered ? 0.9 : 1,
            y: isHovered ? 2 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {card.description}
        </motion.p>

        {/* Stats Badge */}
        <motion.div
          className="flex items-center gap-2 mt-4 mb-4"
          animate={{ y: isHovered ? 3 : 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border-2 shadow-sm"
            style={{
              background: `${cardColor}10`,
              borderColor: `${cardColor}30`,
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: `0 4px 12px ${cardColor}30`
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
            >
              <TrendingUp className="w-3.5 h-3.5" style={{ color: cardColor }} />
            </motion.div>
            <span className="text-xs font-semibold" style={{ color: '#374151' }}>{card.stats}</span>
          </motion.div>
        </motion.div>

        {/* Dynamic Component */}
        <motion.div
          animate={{
            scale: isHovered ? 1.03 : 1,
            y: isHovered ? -2 : 0
          }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <Component cardColor={cardColor} />
        </motion.div>
      </div>

      {/* Corner glow decoration */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl"
        style={{
          transform: 'translate(30%, -30%)',
          background: cardColor,
        }}
        animate={{
          opacity: isHovered ? [0.3, 0.5, 0.3] : 0,
          scale: isHovered ? [1, 1.3, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0
        }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `2px solid ${cardColor}`,
          opacity: isHovered ? 0.6 : 0,
        }}
        animate={{
          borderWidth: isHovered ? [2, 3, 2] : 2,
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
};

export default function TelnexBentoGrid({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = "132, 0, 255",

  featureRef,
  children
}) {
  // Parse children text to extract title and subtitle
  const text = typeof children === 'string' ? children : (children?.props?.children || '');
  const fullText = typeof text === 'string' ? text : '';

  // Split text: "Revolutionizing Peer Learning Telnex Platform" is title, rest is subtitle
  const titleEndIndex = fullText.indexOf('Barter skills');
  const title = titleEndIndex > 0 ? fullText.substring(0, titleEndIndex).trim() : 'Features';
  const subtitle = titleEndIndex > 0 ? fullText.substring(titleEndIndex).trim() : (fullText || '');

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes starPop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        /* Grid background pattern */
        .grid-bg {
          background-color: transparent;
          background-image: none;
        }
      `}</style>

      <div id="features" ref={featureRef} className="min-h-screen grid-bg p-4 md:p-8 lg:p-12 scroll-mt-28">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              {title}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {cardData.map((card, index) => (
              <BentoCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

    </>
  );
}


// GROQQ --------------------

