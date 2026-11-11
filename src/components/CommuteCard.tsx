'use client';

import React from 'react';
import { CommuteIntelligence } from '@/types';
import { Navigation, Footprints, Bus, Car, Moon, Coffee, ShieldAlert, HeartPulse, Building } from 'lucide-react';

interface CommuteCardProps {
  commute: CommuteIntelligence;
}

export default function CommuteCard({ commute }: CommuteCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
              Campus Commute & Night Route Safety
            </h3>
            <p className="text-[11px] text-zinc-500">
              Direct routes to {commute.collegeName} ({commute.distanceKm} km away)
            </p>
          </div>
        </div>

        {/* Safety Score */}
        <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2.5 py-1 rounded-full">
          <Moon className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
            {commute.nightSafetyScore}/100 Night Safety
          </span>
        </div>
      </div>

      {/* Transit Options Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        {/* Walking */}
        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex flex-col items-center justify-center">
          <Footprints className="w-5 h-5 text-emerald-600 mb-1" />
          <span className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
            {commute.walkingMinutes} min
          </span>
          <span className="text-[10px] text-zinc-500">Walk (₹0)</span>
        </div>

        {/* City Bus */}
        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex flex-col items-center justify-center">
          <Bus className="w-5 h-5 text-blue-600 mb-1" />
          <span className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
            {commute.busMinutes} min
          </span>
          <span className="text-[10px] text-zinc-500">Bus (~₹{commute.busFareInr})</span>
        </div>

        {/* Auto / Rickshaw */}
        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 flex flex-col items-center justify-center">
          <Car className="w-5 h-5 text-amber-600 mb-1" />
          <span className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
            {commute.autoMinutes} min
          </span>
          <span className="text-[10px] text-zinc-500">Auto (~₹{commute.autoFareInr})</span>
        </div>
      </div>

      {/* Safety Route Assessment */}
      <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
        <span className="font-bold flex items-center gap-1 mb-0.5">
          <Moon className="w-3.5 h-3.5 text-blue-600" />
          Route Lighting & Security Notes:
        </span>
        <p className="text-[11px] leading-relaxed opacity-90">{commute.nightLightingNotes}</p>
      </div>

      {/* Nearby Essentials Checklist */}
      <div>
        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">
          Essential Student Amenities Walking Distance:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <Coffee className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                {commute.nearbyEssentials.messCountWithin500m} Messes
              </p>
              <p className="text-[10px] text-zinc-500">Within 500m</p>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200 leading-tight">Pharmacy</p>
              <p className="text-[10px] text-zinc-500">
                {commute.nearbyEssentials.nearestPharmacyMinutes} mins away
              </p>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200 leading-tight">Bank ATM</p>
              <p className="text-[10px] text-zinc-500">
                {commute.nearbyEssentials.nearestAtmMeters}m walk
              </p>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-purple-500 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200 leading-tight">Hospital</p>
              <p className="text-[10px] text-zinc-500 truncate" title={commute.nearbyEssentials.hospitalWithin2Km}>
                {commute.nearbyEssentials.hospitalWithin2Km.split('(')[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

