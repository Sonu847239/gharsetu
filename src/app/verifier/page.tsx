'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Listing } from '@/types';
import {
  Award,
  Video,
  CheckCircle2,
  Droplets,
  Wifi,
  Sun,
  ShieldCheck,
  Star,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VerifierPortalPage() {
  const { listings, updateListingVerification, currentUser } = useApp();

  const [selectedListingId, setSelectedListingId] = useState<string>(listings[0]?.id || '');
  const [water24x7, setWater24x7] = useState(true);
  const [wifiSpeed, setWifiSpeed] = useState(150);
  const [ventilation, setVentilation] = useState(true);
  const [curfew, setCurfew] = useState<'none' | 'flexible' | 'strict_9pm' | 'strict_10pm'>('flexible');
  const [cleanliness, setCleanliness] = useState(5);
  const [powerBackup, setPowerBackup] = useState(true);
  const [notes, setNotes] = useState('Tested WiFi router in person, water pressure is consistent on 2nd floor, clean washroom tiles.');
  const [submitted, setSubmitted] = useState(false);

  const targetListing = listings.find(l => l.id === selectedListingId) || listings[0];

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedVerification: Listing['verification'] = {
      id: `ver-${Date.now()}`,
      verifierId: currentUser.id,
      verifierName: currentUser.name || 'Kavya Shah',
      verifierBranch: 'B.Tech CSE, Final Year',
      verifierBatch: 'SVNIT 2023-27',
      visitedAt: new Date().toISOString(),
      videoWalkthroughUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4198-large.mp4',
      videoDurationSec: 60,
      checklist: {
        waterSupply24x7: water24x7,
        wifiSpeedTestedMbps: wifiSpeed,
        properVentilationSunlight: ventilation,
        curfewStrictness: curfew,
        cleanlinessRating: cleanliness,
        powerBackupWorking: powerBackup,
        ownerAttitude: 'friendly'
      },
      notes,
      status: 'verified'
    };

    updateListingVerification(selectedListingId, updatedVerification);
    setSubmitted(true);
    try {
      confetti({ particleCount: 80, spread: 70 });
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Gamified Senior Verifier Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-zinc-900 text-white p-6 sm:p-8 border border-purple-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/40 text-purple-300 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black">Senior Student Verifier Hub</h1>
              <p className="text-xs text-purple-200">
                Peer Auditing Portal • SVNIT Surat Chapter
              </p>
            </div>
          </div>

          {/* Senior Verifier Reward Points Badge */}
          <div className="bg-purple-950/80 border border-purple-400/40 px-4 py-2 rounded-xl flex items-center gap-3">
            <div>
              <span className="text-[10px] text-purple-300 uppercase font-semibold block">
                Your Honor Points
              </span>
              <span className="text-xl font-extrabold text-amber-400 flex items-center gap-1">
                <Zap className="w-4 h-4 fill-amber-400" />
                {currentUser.seniorPoints || 450} pts
              </span>
            </div>
            <span className="text-xs font-bold bg-purple-500/30 text-purple-200 px-2 py-1 rounded-md">
              Level 3 Campus Ambassador
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed max-w-2xl">
          As a senior, your on-site physical visit shields juniors from fake photos and bait-and-switch landlords.
          Earn ₹300 Amazon/Swiggy voucher credits + campus ambassador badges for each verified audit.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Audit Successfully Submitted!
          </h2>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            +50 Senior Points credited! The listing has been updated on the student explore map with your verified checklist and video badge.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
          >
            Audit Another Property
          </button>
        </div>
      ) : (
        <form onSubmit={handleAuditSubmit} className="space-y-6">
          {/* Pick Listing to Audit */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <label className="font-bold text-sm text-zinc-900 dark:text-white block">
              Select Property for On-Site Audit:
            </label>
            <select
              value={selectedListingId}
              onChange={e => setSelectedListingId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-xs sm:text-sm"
            >
              {listings.map(l => (
                <option key={l.id} value={l.id}>
                  {l.title} ({l.neighborhood}) • Current Trust: {l.trustScore.totalScore}/100
                </option>
              ))}
            </select>
          </div>

          {/* 60s Video Upload Demonstration */}
          <div className="rounded-2xl border-2 border-purple-500/40 bg-purple-50/20 dark:bg-purple-950/20 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  <span>Step 1: 60-Second Walkthrough Video Tour</span>
                </h3>
                <p className="text-xs text-zinc-500">
                  Walk from entrance into bedroom and bathroom. No fancy edits or filters.
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                Video Stream Attached ✓
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 text-white text-xs flex items-center justify-between border border-zinc-800">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <span className="font-mono">walkthrough_svnit_inspected.mp4 (58 secs)</span>
              </div>
              <span className="text-zinc-400 font-mono">1080p • 24MB</span>
            </div>
          </div>

          {/* Physical Audit Checklist */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Step 2: On-Site Rigorous Checklist</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* 24x7 Water */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <div>
                    <span className="font-bold block text-zinc-900 dark:text-white">
                      24x7 Water Supply
                    </span>
                    <span className="text-[10px] text-zinc-500">RO drinking water + tap pressure</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={water24x7}
                  onChange={e => setWater24x7(e.target.checked)}
                  className="w-5 h-5 rounded accent-emerald-600"
                />
              </div>

              {/* WiFi Speedtest */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-emerald-500" />
                  <div>
                    <span className="font-bold block text-zinc-900 dark:text-white">
                      Tested WiFi Speed
                    </span>
                    <span className="text-[10px] text-zinc-500">In-room Ookla speed test</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <input
                    type="number"
                    value={wifiSpeed}
                    onChange={e => setWifiSpeed(Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-right"
                  />
                  <span>Mbps</span>
                </div>
              </div>

              {/* Natural Sunlight */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="font-bold block text-zinc-900 dark:text-white">
                      Proper Sunlight & Ventilation
                    </span>
                    <span className="text-[10px] text-zinc-500">No damp or subterranean rooms</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={ventilation}
                  onChange={e => setVentilation(e.target.checked)}
                  className="w-5 h-5 rounded accent-emerald-600"
                />
              </div>

              {/* Curfew Strictness */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <div>
                    <span className="font-bold block text-zinc-900 dark:text-white">
                      Curfew Reality
                    </span>
                    <span className="text-[10px] text-zinc-500">Actual gate closure rule</span>
                  </div>
                </div>
                <select
                  value={curfew}
                  onChange={e => setCurfew(e.target.value as any)}
                  className="p-1 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 font-medium"
                >
                  <option value="none">No Curfew</option>
                  <option value="flexible">Flexible / Intimation</option>
                  <option value="strict_10pm">Strict 10:00 PM</option>
                  <option value="strict_9pm">Strict 9:00 PM</option>
                </select>
              </div>

              {/* Cleanliness Rating */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 sm:col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <div>
                    <span className="font-bold block text-zinc-900 dark:text-white">
                      Washroom & Common Area Cleanliness
                    </span>
                    <span className="text-[10px] text-zinc-500">1 (Unlivable) to 5 (Spotless)</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setCleanliness(star)}
                      className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                        cleanliness >= star
                          ? 'bg-amber-500 text-white'
                          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600'
                      }`}
                    >
                      {star}★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Honest Senior Notes */}
            <div>
              <label className="font-bold text-xs text-zinc-700 dark:text-zinc-300 block mb-1">
                Senior Verifier Public Advice to Juniors:
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <Award className="w-5 h-5" />
            <span>Certify Audit & Claim +50 Reward Points</span>
          </button>
        </form>
      )}
    </div>
  );
}

