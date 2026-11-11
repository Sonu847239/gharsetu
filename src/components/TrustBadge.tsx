'use client';

import React, { useState } from 'react';
import { TrustScoreBreakdown } from '@/types';
import { Shield, ShieldAlert, ShieldCheck, ChevronDown, ChevronUp, Camera, UserCheck, Video, MessageSquare, DollarSign, Info } from 'lucide-react';

interface TrustBadgeProps {
  score: TrustScoreBreakdown;
  size?: 'sm' | 'md' | 'lg';
  showDetailsToggle?: boolean;
}

export default function TrustBadge({
  score,
  size = 'md',
  showDetailsToggle = true
}: TrustBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  // Badge Styling according to score tier
  const isHighTrust = score.totalScore >= 85;
  const isModerate = score.totalScore >= 60 && score.totalScore < 85;
  const isLow = score.totalScore < 60;

  const getBadgeStyle = () => {
    if (isHighTrust) {
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/80',
        border: 'border-emerald-300 dark:border-emerald-700',
        text: 'text-emerald-800 dark:text-emerald-200',
        badgeBg: 'bg-emerald-600 text-white',
        icon: ShieldCheck
      };
    } else if (isModerate) {
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/80',
        border: 'border-amber-300 dark:border-amber-700',
        text: 'text-amber-800 dark:text-amber-200',
        badgeBg: 'bg-amber-600 text-white',
        icon: Shield
      };
    } else {
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/80',
        border: 'border-rose-300 dark:border-rose-700',
        text: 'text-rose-800 dark:text-rose-200',
        badgeBg: 'bg-rose-600 text-white',
        icon: ShieldAlert
      };
    }
  };

  const style = getBadgeStyle();
  const Icon = style.icon;

  return (
    <div className={`rounded-xl border ${style.border} ${style.bg} transition-all overflow-hidden`}>
      {/* Badge Header Row */}
      <div className={`flex items-center justify-between p-2.5 sm:p-3 ${style.text}`}>
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg ${style.badgeBg} shadow-xs`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base leading-none">
                Trust Score: {score.totalScore}/100
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 dark:bg-black/40 border border-current">
                {score.tier}
              </span>
            </div>
            <p className="text-[11px] opacity-80 mt-0.5">
              {isHighTrust
                ? 'Verified by In-Camera GPS + Senior Student On-site Audit'
                : isModerate
                ? 'Partially verified - Awaiting final physical audit'
                : 'Caution: Potential broker pattern or unverified gallery photos'}
            </p>
          </div>
        </div>

        {showDetailsToggle && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span>{expanded ? 'Hide Breakdown' : 'View Proof'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Flags & Warnings Banner */}
      {score.flags.length > 0 && (
        <div className="bg-rose-500 text-white text-xs px-3 py-1.5 font-medium flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Warning: {score.flags.join(' • ')}</span>
        </div>
      )}

      {/* Expanded Breakdown Drawer */}
      {expanded && (
        <div className="p-3.5 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-950/40 space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
          <div className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span>Algorithm Factor Breakdown (0-100 Total)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* 1. Photo Verif */}
            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200">
                  <Camera className="w-3.5 h-3.5 text-blue-500" />
                  Live Camera GPS Proof
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {score.photoVerificationScore}/25 pts
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${(score.photoVerificationScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Zero gallery uploads. Geotagged within 300m of room.
              </p>
            </div>

            {/* 2. Owner ID */}
            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Direct Owner ID Check
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {score.ownerIdAndHistoryScore}/20 pts
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${(score.ownerIdAndHistoryScore / 20) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Gov ID verified. Broker phone registry check clean.
              </p>
            </div>

            {/* 3. Senior Verifier */}
            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200">
                  <Video className="w-3.5 h-3.5 text-purple-500" />
                  Senior Walkthrough Audit
                </span>
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {score.seniorVerifierAuditScore}/25 pts
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: `${(score.seniorVerifierAuditScore / 25) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                60-second video + WiFi, water, and curfew checklist.
              </p>
            </div>

            {/* 4. Review History */}
            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200">
                  <MessageSquare className="w-3.5 h-3.5 text-teal-500" />
                  Verified College Reviews
                </span>
                <span className="font-bold text-teal-600 dark:text-teal-400">
                  {score.reviewHistoryScore}/15 pts
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-teal-500 h-full rounded-full"
                  style={{ width: `${(score.reviewHistoryScore / 15) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Gated to confirmed tenants with @college.ac.in emails.
              </p>
            </div>

            {/* 5. Fair Rent Meter */}
            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 sm:col-span-2">
              <div className="flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                  Fair Rent Meter & All-In Transparency
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {score.priceFairnessScore}/15 pts
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${(score.priceFairnessScore / 15) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Zero surprise bills: Electricity, food, wifi & maintenance upfront.
              </p>
            </div>
          </div>

          {/* Earned Badges */}
          {score.badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {score.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

