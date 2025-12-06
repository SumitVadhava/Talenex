export function RainbowGridPattern({
  width = 60,
  height = 60,
  strokeDasharray = "4 5",
  className = "",
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Horizontal rainbow gradient */}
        <linearGradient id="rainbow-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="red" />
          <stop offset="16%" stopColor="orange" />
          <stop offset="33%" stopColor="yellow" />
          <stop offset="50%" stopColor="green" />
          <stop offset="66%" stopColor="blue" />
          <stop offset="83%" stopColor="indigo" />
          <stop offset="100%" stopColor="violet" />
        </linearGradient>

        {/* pattern block */}
        <pattern
          id="rainbow-grid"
          x="0"
          y="0"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          {/* vertical lines */}
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="url(#rainbow-stroke)"
            strokeWidth="1"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      {/* fill whole area with the grid pattern */}
      <rect width="100%" height="100%" fill="url(#rainbow-grid)" />
    </svg>
  );
}
