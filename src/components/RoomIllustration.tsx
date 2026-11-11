import React from 'react';

export interface RoomIllustrationProps {
  roomType: string;
  seed?: number;
  className?: string;
}

export default function RoomIllustration({ roomType, seed = 1, className = '' }: RoomIllustrationProps) {
  // Generate rich, pleasing room aesthetic themes based on roomType and seed
  const palettes = [
    { bg: '#064e3b', wall: '#047857', bed: '#10b981', accent: '#34d399', text: '#a7f3d0' }, // Emerald
    { bg: '#1e1b4b', wall: '#312e81', bed: '#4f46e5', accent: '#818cf8', text: '#c7d2fe' }, // Indigo
    { bg: '#1e293b', wall: '#334155', bed: '#0ea5e9', accent: '#38bdf8', text: '#bae6fd' }, // Sky
    { bg: '#3b0764', wall: '#581c87', bed: '#9333ea', accent: '#c084fc', text: '#f3e8ff' }, // Purple
    { bg: '#451a03', wall: '#78350f', bed: '#d97706', accent: '#fbbf24', text: '#fef3c7' }  // Amber
  ];

  const theme = palettes[Math.abs(seed) % palettes.length];

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`} style={{ backgroundColor: theme.bg }}>
      <svg
        viewBox="0 0 400 250"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`wallGrad-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.wall} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.bg} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`lightGrad-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Room Back Wall */}
        <rect x="0" y="0" width="400" height="170" fill={`url(#wallGrad-${seed})`} />

        {/* Floor */}
        <polygon points="0,170 400,170 400,250 0,250" fill="#09090b" opacity="0.85" />
        <line x1="0" y1="170" x2="400" y2="170" stroke={theme.accent} strokeWidth="1" opacity="0.3" />

        {/* Floor Wooden Planks perspective */}
        <line x1="80" y1="170" x2="40" y2="250" stroke="#27272a" strokeWidth="0.8" />
        <line x1="160" y1="170" x2="130" y2="250" stroke="#27272a" strokeWidth="0.8" />
        <line x1="240" y1="170" x2="270" y2="250" stroke="#27272a" strokeWidth="0.8" />
        <line x1="320" y1="170" x2="360" y2="250" stroke="#27272a" strokeWidth="0.8" />

        {/* Window with Sunlight */}
        <rect x="35" y="25" width="85" height="100" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
        <rect x="40" y="30" width="35" height="42" fill="#38bdf8" fillOpacity="0.25" />
        <rect x="80" y="30" width="35" height="42" fill="#38bdf8" fillOpacity="0.25" />
        <rect x="40" y="78" width="35" height="42" fill="#38bdf8" fillOpacity="0.2" />
        <rect x="80" y="78" width="35" height="42" fill="#38bdf8" fillOpacity="0.2" />
        {/* Sunlight Angle */}
        <polygon points="120,40 230,195 140,210 35,120" fill={`url(#lightGrad-${seed})`} />

        {/* Wall Art Frame */}
        <rect x="155" y="32" width="55" height="40" rx="2" fill="#18181b" stroke={theme.accent} strokeWidth="1.5" />
        <circle cx="175" cy="50" r="10" fill={theme.accent} opacity="0.6" />
        <polygon points="160,68 180,52 205,68" fill={theme.wall} />

        {/* Study Table & Lamp */}
        <rect x="145" y="125" width="70" height="48" rx="2" fill="#27272a" />
        <rect x="145" y="125" width="70" height="6" fill="#3f3f46" />
        {/* Laptop */}
        <rect x="160" y="112" width="28" height="18" rx="1.5" fill="#52525b" />
        <rect x="162" y="114" width="24" height="14" fill="#a1a1aa" opacity="0.8" />
        <polygon points="156,130 192,130 188,126 160,126" fill="#71717a" />
        {/* Lamp */}
        <path d="M 205 125 L 205 105 L 198 100" stroke="#f59e0b" strokeWidth="2" fill="none" />
        <polygon points="193,98 203,98 198,103" fill="#f59e0b" />
        <circle cx="198" cy="103" r="14" fill="#fbbf24" opacity="0.2" />

        {/* Student Bed with Pillows & Blanket */}
        <rect x="235" y="130" width="145" height="70" rx="6" fill={theme.bed} />
        {/* Mattress Base */}
        <rect x="230" y="180" width="155" height="20" rx="3" fill="#27272a" />
        {/* Bedposts */}
        <rect x="228" y="100" width="8" height="100" rx="2" fill="#52525b" />
        <rect x="380" y="145" width="8" height="55" rx="2" fill="#52525b" />
        {/* Headboard */}
        <rect x="232" y="105" width="14" height="65" rx="2" fill="#3f3f46" />
        {/* Pillow */}
        <rect x="246" y="136" width="32" height="22" rx="4" fill="#f4f4f5" />
        <rect x="246" y="162" width="32" height="22" rx="4" fill="#e4e4e7" />
        {/* Folded Blanket / Quilt */}
        <path d="M 285 130 Q 380 130 380 200 L 285 200 Z" fill={theme.wall} opacity="0.9" />

        {/* Cozy Floor Rug */}
        <ellipse cx="200" cy="225" rx="85" ry="18" fill={theme.wall} opacity="0.4" stroke={theme.accent} strokeWidth="1" strokeDasharray="3 3" />

        {/* Room Type Watermark Stamp */}
        <g transform="translate(24, 218)">
          <rect width="115" height="22" rx="11" fill="rgba(0,0,0,0.7)" />
          <text x="57" y="15" fill={theme.text} fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            {roomType.replace('_', ' ').toUpperCase()}
          </text>
        </g>
      </svg>
    </div>
  );
}

