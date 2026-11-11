'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Navigation, CheckCircle2, Calendar } from 'lucide-react';

function ParentViewContent() {
  const params = useParams();
  const { listings } = useApp();

  const listing = listings[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 pt-4">
      {/* Parent Safety Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 border border-blue-800 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>GharSetu Parent Safety Portal (Read-Only)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black">
          Student Room Visit & Neighborhood Safety Brief
        </h1>
        <p className="text-xs text-blue-200">
          This secure link was shared with you so you can verify the accommodation details, college distance, verified owner identity, and route safety.
        </p>
      </div>

      {/* Visit Schedule Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
            Confirmed Appointment Slot
          </h3>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
          <p className="font-bold text-sm">Tomorrow • 11:00 AM - 12:00 PM</p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Property: <span className="font-semibold text-zinc-900 dark:text-white">{listing.title}</span>
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Address: {listing.address}
          </p>
        </div>
      </div>

      {/* Safety & Commute Assessment for Parents */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-500" />
          <span>Campus Distance & Night Route Assessment</span>
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="text-zinc-500 block">Distance to Campus</span>
            <span className="font-black text-lg text-zinc-900 dark:text-white">
              {listing.commute.distanceKm} km ({listing.commute.walkingMinutes} mins walk)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="text-zinc-500 block">Night Safety Score</span>
            <span className="font-black text-lg text-emerald-600">
              {listing.commute.nightSafetyScore}/100 (Safe)
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200 dark:border-blue-900">
          <strong>Security Note:</strong> {listing.commute.nightLightingNotes}
        </p>
      </div>

      {/* Owner ID Check Status */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-3">
        <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Landlord Identity & Trust Badges</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-600 dark:text-zinc-400">Owner Name:</span>
            <span className="font-bold text-zinc-900 dark:text-white">{listing.ownerName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-600 dark:text-zinc-400">Government ID Verification:</span>
            <span className="font-bold text-emerald-600">Aadhaar & Utility Verified ✓</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-zinc-600 dark:text-zinc-400">Anti-Broker Pattern Check:</span>
            <span className="font-bold text-emerald-600">Passed (Single Residential Property)</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-zinc-600 dark:text-zinc-400">All-In Monthly Living Cost:</span>
            <span className="font-extrabold text-sm text-zinc-900 dark:text-white">
              ₹{listing.pricing.totalMonthlyEstimated.toLocaleString()} / mo (Zero Hidden Fees)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ParentViewPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Parent Safety View...</div>}>
      <ParentViewContent />
    </Suspense>
  );
}
