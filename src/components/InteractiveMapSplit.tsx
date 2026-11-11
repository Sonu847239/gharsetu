'use client';

import React from 'react';
import { Listing } from '@/types';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface InteractiveMapSplitProps {
  listings: Listing[];
  selectedListingId: string | null;
  onSelectListing: (id: string) => void;
}

export default function InteractiveMapSplit({
  listings,
  selectedListingId,
  onSelectListing
}: InteractiveMapSplitProps) {
  return (
    <div className="relative w-full h-[380px] sm:h-[500px] lg:h-full min-h-[360px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-inner flex flex-col justify-between">
      {/* Top Map HUD Bar */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="bg-black/85 backdrop-blur-md border border-zinc-800 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium flex items-center gap-1.5 sm:gap-2 pointer-events-auto shadow-md">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="truncate max-w-[200px] sm:max-w-none">Marwadi University Rajkot Campus Commute Zone</span>
        </div>

        <div className="bg-black/85 backdrop-blur-md border border-zinc-800 text-zinc-300 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-[11px] font-mono pointer-events-auto">
          {listings.length} Geotagged Pins
        </div>
      </div>

      {/* Stylized Vector Map Canvas */}
      <div className="relative w-full h-full flex-1">
        {/* SVG Grid lines mimicking street grid */}
        <svg className="w-full h-full absolute inset-0 opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Main Ring Road representation */}
          <circle cx="50%" cy="50%" r="75" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="140" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="6 6" />
        </svg>

        {/* Central College Anchor Point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center animate-pulse">
            <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500" />
          </div>
          <span className="bg-blue-600 text-white font-extrabold text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
            🏛️ MARWADI UNIVERSITY (MU RAJKOT)
          </span>
        </div>

        {/* Listing Markers Plotted in Scaled Orbit */}
        {listings.map((item, idx) => {
          const angle = (idx / Math.max(1, listings.length)) * 2 * Math.PI;
          const radiusPercent = 18 + (idx % 3) * 12;
          const topPercent = 50 + Math.sin(angle) * radiusPercent;
          const leftPercent = 50 + Math.cos(angle) * (radiusPercent * 1.05);

          const isSelected = item.id === selectedListingId;
          const isSuspicious = item.trustScore.totalScore < 50;

          return (
            <button
              key={item.id}
              onClick={() => onSelectListing(item.id)}
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-200 cursor-pointer ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-115'
              }`}
            >
              <div
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold shadow-lg flex items-center gap-1 border ${
                  isSuspicious
                    ? 'bg-rose-600 text-white border-rose-400'
                    : isSelected
                    ? 'bg-emerald-400 text-zinc-950 border-white ring-2 ring-emerald-500'
                    : 'bg-zinc-900/90 text-white border-zinc-700 hover:border-emerald-500'
                }`}
              >
                {isSuspicious ? (
                  <AlertCircle className="w-3 h-3 text-white" />
                ) : (
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                )}
                <span>₹{(item.pricing.totalMonthlyEstimated / 1000).toFixed(1)}k</span>
              </div>

              {/* Hover Tooltip */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-40 sm:w-44 bg-zinc-900 border border-zinc-700 text-left p-2 rounded-xl text-white text-[11px] shadow-2xl pointer-events-none z-40">
                <p className="font-bold truncate">{item.title}</p>
                <p className="text-emerald-400 text-[10px]">
                  Trust: {item.trustScore.totalScore}/100 • {item.commute.walkingMinutes}m walk
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Legend Footer */}
      <div className="p-2 sm:p-3 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 text-[10px] sm:text-[11px] text-zinc-400 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Verified
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Broker Alert
          </span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">Click pin to inspect room proof</span>
      </div>
    </div>
  );
}
