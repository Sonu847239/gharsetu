'use client';

import React, { useState } from 'react';
import { SeniorWalkthroughVerification } from '@/types';
import { Video, CheckCircle2, XCircle, Award, Star, Play, Wifi, Droplets, Sun, ShieldCheck } from 'lucide-react';

interface SeniorVerificationCardProps {
  verification: SeniorWalkthroughVerification;
}

export default function SeniorVerificationCard({ verification }: SeniorVerificationCardProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center gap-1.5">
              <span>Senior Student Verifier Audit</span>
              <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                Physical On-Site Inspection
              </span>
            </h3>
            <p className="text-[11px] text-zinc-500">
              Audited by verified student peer: {verification.verifierName} ({verification.verifierBranch})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 px-2.5 py-1 rounded-full text-xs font-bold text-purple-700 dark:text-purple-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Audit</span>
        </div>
      </div>

      {/* 60s Unfiltered Video Player */}
      <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-zinc-950 border border-zinc-800 flex items-center justify-center">
        {verification.videoWalkthroughUrl && isPlayingVideo ? (
          <video
            src={verification.videoWalkthroughUrl}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            {/* Background Thumbnail Simulation */}
            <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer transition-transform"
                 onClick={() => setIsPlayingVideo(true)}>
              <Play className="w-6 h-6 ml-1 fill-white" />
            </div>
            <p className="font-bold text-white text-sm mt-3">Watch 60-Sec Unfiltered Video Tour</p>
            <p className="text-[11px] text-zinc-300 mt-0.5">
              Recorded live by Senior Verifier inside room, washroom & kitchen
            </p>
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
              <Video className="w-3 h-3 text-purple-400" />
              <span>{verification.videoDurationSec}s Walkthrough</span>
            </div>
          </div>
        )}
      </div>

      {/* Senior Physical Checklist */}
      <div>
        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">
          Verified Checklist Passed During Visit:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200">
                {verification.checklist.waterSupply24x7 ? '24/7 Water' : 'Limited Hours'}
              </p>
              <p className="text-[10px] text-zinc-500">Tap pressure checked</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200">
                {verification.checklist.wifiSpeedTestedMbps} Mbps WiFi
              </p>
              <p className="text-[10px] text-zinc-500">Ookla speedtest log</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200">
                {verification.checklist.properVentilationSunlight ? 'Natural Light' : 'Poor Airflow'}
              </p>
              <p className="text-[10px] text-zinc-500">Window & airflow</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 shrink-0" />
            <div>
              <p className="font-bold text-zinc-800 dark:text-zinc-200">
                {verification.checklist.cleanlinessRating}/5 Cleanliness
              </p>
              <p className="text-[10px] text-zinc-500">Washroom hygiene</p>
            </div>
          </div>
        </div>
      </div>

      {/* Senior Verifier Note */}
      <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs text-purple-900 dark:text-purple-200">
        <span className="font-bold block mb-1">Senior Peer Notes:</span>
        <p className="italic text-[11px] leading-relaxed">
          &ldquo;{verification.notes}&rdquo;
        </p>
        <div className="mt-2 text-[10px] opacity-75">
          Audited on {new Date(verification.visitedAt).toLocaleDateString()} • Batch {verification.verifierBatch}
        </div>
      </div>
    </div>
  );
}

