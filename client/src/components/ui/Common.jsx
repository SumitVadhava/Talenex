import React from 'react';

// --- Badge ---
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-primary-500 text-white border-transparent',
    secondary: 'bg-primary-50 text-primary-700 border-transparent',
    outline: 'bg-transparent border-slate-200 text-slate-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Button ---
export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-primary-600 text-white shadow hover:bg-primary-700",
    outline: "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-700",
  };
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 py-2 text-sm",
    lg: "h-10 px-8 text-base",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Input ---
export const Input = ({ className = '', icon, ...props }) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <input
        className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${icon ? 'pl-9' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

// --- Card ---
export const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`}>
    {children}
  </div>
);