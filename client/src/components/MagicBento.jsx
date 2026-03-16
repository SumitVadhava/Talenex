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

