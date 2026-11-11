'use client';

import React, { useState } from 'react';
import { AllInMonthlyCost } from '@/types';
import { Calculator, CheckCircle2, AlertTriangle, TrendingDown, TrendingUp, Info } from 'lucide-react';

interface FairRentMeterProps {
  pricing: AllInMonthlyCost;
}

export default function FairRentMeter({ pricing }: FairRentMeterProps) {
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

  const diffPercent = Math.round(
    ((pricing.totalMonthlyEstimated - pricing.averageNeighborhoodRent) /
      pricing.averageNeighborhoodRent) *
      100
  );

  const isAffordable = diffPercent < 0;
  const isFair = diffPercent >= 0 && diffPercent <= 8;
  const isOverpriced = diffPercent > 8;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
              Fair Rent Meter & All-In Monthly Cost
            </h3>
            <p className="text-[11px] text-zinc-500">
              No hidden surprises on arrival: AC power, food, maintenance included upfront
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div
          className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
            isAffordable
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
              : isFair
              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
          }`}
        >
          {isAffordable ? (
            <>
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{Math.abs(diffPercent)}% Under Area Avg</span>
            </>
          ) : isFair ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Fair Market Rate</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{diffPercent}% Overpriced Flag</span>
            </>
          )}
        </div>
      </div>

      {/* Main Figures Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
            All-In Monthly Living Cost
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              ₹{pricing.totalMonthlyEstimated.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-500">/ month</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Fully transparent itemized breakdown
          </p>
        </div>

        <div className="sm:border-l sm:border-zinc-200 dark:sm:border-zinc-700 sm:pl-4 flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
            Area Student Benchmark (Same Vicinity)
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg sm:text-xl font-bold text-zinc-600 dark:text-zinc-400">
              ₹{pricing.averageNeighborhoodRent.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-500">/ month avg</span>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1">
            Based on 50+ nearby student tenancies
          </span>
        </div>
      </div>

      {/* Gauge Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] text-zinc-500 font-medium">
          <span className="text-emerald-600 font-bold">Great Deal (&lt; -10%)</span>
          <span className="text-blue-600 font-bold">Fair (±5%)</span>
          <span className="text-rose-600 font-bold">Overpriced (&gt; +10%)</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden flex">
          <div className="w-1/3 bg-emerald-500" />
          <div className="w-1/3 bg-blue-500" />
          <div className="w-1/3 bg-rose-500" />
        </div>
        <div className="flex justify-between text-[10px] text-zinc-400 pt-0.5">
          <span>₹7,000</span>
          <span>₹11,000</span>
          <span>₹15,000+</span>
        </div>
      </div>

      {/* Itemized Cost Breakdown Toggle */}
      <div className="pt-1">
        <button
          onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{showDetailedBreakdown ? 'Hide Detailed Itemization' : 'Show All Hidden Charges Breakdown'}</span>
        </button>

        {showDetailedBreakdown && (
          <div className="mt-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">Base Room Rent:</span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                ₹{pricing.baseRent.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">
                Electricity Estimate ({pricing.electricityBillingType.replace('_', ' ')}):
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                ₹{pricing.electricityEstimate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">Food / Mess (3 Meals/Day):</span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {pricing.foodCost > 0 ? `₹${pricing.foodCost.toLocaleString()}` : 'Self-Cook / Separate'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">Society Maintenance & Cleaning:</span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                ₹{pricing.maintenance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">High-Speed WiFi & Water Charges:</span>
              <span className="font-semibold text-emerald-600">
                {pricing.waterAndWifi === 0 ? 'FREE (Included)' : `₹${pricing.waterAndWifi}`}
              </span>
            </div>
            <div className="flex justify-between py-1 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 rounded">
              <span>Security Deposit (Refundable):</span>
              <span>₹{pricing.securityDeposit.toLocaleString()} ({pricing.depositMonths} month)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

