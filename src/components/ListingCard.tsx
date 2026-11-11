'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import TrustBadge from './TrustBadge';
import RoomIllustration from './RoomIllustration';
import { MapPin, Navigation, AlertCircle, ShieldCheck } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onOpenReport?: (listing: Listing) => void;
  onBookVisit?: (listing: Listing) => void;
}

export default function ListingCard({ listing, onOpenReport, onBookVisit }: ListingCardProps) {
  const [imgError, setImgError] = useState(false);
  const isSuspicious = listing.trustScore.totalScore < 50 || listing.brokerPhoneWarning;

  // Extract numerical seed from listing ID (e.g. gh-001 -> 1)
  const idNumber = parseInt(listing.id.replace(/\D/g, ''), 10) || 1;
  const primaryImgUrl = listing.images[0]?.url;

  return (
    <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
      <div>
        {/* Image & Quick Badges Container */}
        <div className="relative aspect-16/10 overflow-hidden bg-zinc-900">
          {!imgError && primaryImgUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={primaryImgUrl}
              alt={listing.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <RoomIllustration roomType={listing.roomType} seed={idNumber} />
          )}

          {/* Top Floating Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {listing.roomType.replace('_', ' ').toUpperCase()}
            </span>

            {isSuspicious ? (
              <span className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> BROKER WARNING
              </span>
            ) : (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VERIFIED PROOF
              </span>
            )}
          </div>

          {/* Bottom Live Geotag Watermark */}
          {listing.images[0]?.isLiveCaptured && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/65 backdrop-blur-xs text-[10px] text-zinc-300 px-2 py-1 rounded font-mono flex items-center justify-between">
              <span>📍 GPS Match: {listing.images[0].distanceFromListingMeters}m</span>
              <span className="text-emerald-400 font-semibold">Live Captured</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          {/* Trust Score Header */}
          <TrustBadge score={listing.trustScore} size="sm" showDetailsToggle={false} />

          {/* Title & Location */}
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 transition-colors">
              {listing.title}
            </h3>
            <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{listing.neighborhood}, {listing.city}</span>
            </p>
          </div>

          {/* Commute Quick Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-medium">
              <Navigation className="w-3 h-3" />
              {listing.commute.walkingMinutes} min walk to campus
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-medium">
              ★ {listing.commute.nightSafetyScore}/100 Night Safety
            </span>
          </div>

          {/* All-in Price Summary */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-semibold block">
                All-In Monthly Cost
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  ₹{listing.pricing.totalMonthlyEstimated.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-500">/mo</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-zinc-500 block">Area Median</span>
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                ₹{listing.pricing.averageNeighborhoodRent.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 flex gap-2">
        <Link
          href={`/listing/${listing.id}`}
          className="flex-1 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-center font-bold text-xs hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-colors"
        >
          Inspect Proof & Badges
        </Link>
        {onBookVisit && (
          <button
            onClick={() => onBookVisit(listing)}
            className="px-3.5 py-2.5 rounded-xl border border-emerald-600 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
          >
            Book Visit
          </button>
        )}
      </div>
    </div>
  );
}
