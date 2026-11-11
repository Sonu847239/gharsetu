'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldAlert,
  Ban,
  CheckCircle2,
  PhoneCall,
  Search,
  AlertTriangle,
  Flame,
  FileText,
  UserX
} from 'lucide-react';

export default function AdminModerationPage() {
  const { scamReports, listings, setListings } = useApp();
  const [bannedPhones, setBannedPhones] = useState<string[]>(['+91 99988 77766']);
  const [searchPhone, setSearchPhone] = useState('');

  // Detect broker phone rings: find phones that appear across multiple listings
  const phoneDistribution: Record<string, { count: number; ownerNames: string[]; listings: string[] }> = {};

  listings.forEach(l => {
    if (!phoneDistribution[l.ownerPhone]) {
      phoneDistribution[l.ownerPhone] = { count: 0, ownerNames: [], listings: [] };
    }
    phoneDistribution[l.ownerPhone].count += 1;
    if (!phoneDistribution[l.ownerPhone].ownerNames.includes(l.ownerName)) {
      phoneDistribution[l.ownerPhone].ownerNames.push(l.ownerName);
    }
    phoneDistribution[l.ownerPhone].listings.push(l.title);
  });

  const brokerPatterns = Object.entries(phoneDistribution).filter(([_, data]) => data.count >= 2);

  const handleBanPhone = (phone: string) => {
    if (!bannedPhones.includes(phone)) {
      setBannedPhones(prev => [...prev, phone]);
      // Demote trust score of listings with this phone
      setListings(prev =>
        prev.map(l => {
          if (l.ownerPhone === phone) {
            return {
              ...l,
              isAvailable: false,
              brokerPhoneWarning: true,
              trustScore: {
                ...l.trustScore,
                totalScore: 10,
                tier: 'Probation / Unverified',
                flags: Array.from(new Set([...l.trustScore.flags, 'Phone Blacklisted by Admin']))
              }
            };
          }
          return l;
        })
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl bg-zinc-900 text-white p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Scam Shield Moderation Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          Community Blacklist & Broker Ring Detector
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
          GharSetu monitors phone number reuse across different names and addresses to detect disguised brokers operating multi-flat cartels near campus.
        </p>
      </div>

      {/* Broker Ring Detection Engine */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                Automated Broker Ring Detection
              </h3>
              <p className="text-[11px] text-zinc-500">
                Phone numbers linked to multiple distinct listings across town
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-full">
            {brokerPatterns.length} Broker Rings Flagged
          </span>
        </div>

        <div className="space-y-3">
          {brokerPatterns.map(([phone, data]) => {
            const isBanned = bannedPhones.includes(phone);

            return (
              <div
                key={phone}
                className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-rose-700 dark:text-rose-400">
                      {phone}
                    </span>
                    <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                      Linked to {data.count} properties
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                    Operates under aliases: <span className="font-semibold">{data.ownerNames.join(', ')}</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Sample Listing: {data.listings[0]}
                  </p>
                </div>

                <button
                  onClick={() => handleBanPhone(phone)}
                  disabled={isBanned}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                    isBanned
                      ? 'bg-zinc-400 text-white cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30'
                  }`}
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>{isBanned ? 'Blacklisted & Quarantined' : '1-Tap Ban Number'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Incident Reports Log */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4 shadow-xs">
        <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Active Student Scam Reports Feed</span>
        </h3>

        <div className="space-y-3">
          {scamReports.map(rep => (
            <div
              key={rep.id}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm">
                    {rep.listingTitle}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-zinc-500 font-mono">{rep.reportedPhone}</span>
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded text-[10px]">
                      {rep.reason.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-zinc-400">
                  {new Date(rep.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                &ldquo;{rep.description}&rdquo;
              </p>

              <div className="flex justify-between items-center pt-1 text-[11px]">
                <span className="text-zinc-500">
                  Reported by: <span className="font-semibold capitalize">{rep.reporterRole}</span>
                </span>
                <button
                  onClick={() => handleBanPhone(rep.reportedPhone)}
                  className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Ban className="w-3 h-3" />
                  <span>Enforce Blacklist</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

