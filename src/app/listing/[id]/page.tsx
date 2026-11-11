'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import TrustBadge from '@/components/TrustBadge';
import FairRentMeter from '@/components/FairRentMeter';
import CommuteCard from '@/components/CommuteCard';
import SeniorVerificationCard from '@/components/SeniorVerificationCard';
import VisitBookingModal from '@/components/VisitBookingModal';
import ScamReportModal from '@/components/ScamReportModal';
import {
  MapPin,
  ShieldAlert,
  ArrowLeft,
  Calendar,
  Camera,
  Star,
  MessageSquare,
  Check,
  Sparkles
} from 'lucide-react';

function ListingDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { listings } = useApp();

  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const listingId = params?.id as string;
  const listing = listings.find(l => l.id === listingId) || listings[0];

  if (!listing) {
    return (
      <div className="p-12 text-center">
        <p className="font-bold text-lg">Listing not found</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const isBrokerFlagged = listing.brokerPhoneWarning || listing.trustScore.totalScore < 50;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Report Listing / Broker</span>
        </button>
      </div>

      {/* Main Title & Trust Overview */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-md">
            {listing.roomType.replace('_', ' ').toUpperCase()}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md">
            {listing.genderPreference.replace('_', ' ').toUpperCase()}
          </span>
          {isBrokerFlagged && (
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-md flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> BROKER WARNING
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
          {listing.title}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-500 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
          <span>{listing.address}</span>
        </p>
      </div>

      {/* Trust Score Header Banner */}
      <TrustBadge score={listing.trustScore} size="lg" showDetailsToggle={true} />

      {/* Photo Gallery with Live Proof Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Photo Display */}
        <div className="lg:col-span-8 space-y-2">
          <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-black border border-zinc-200 dark:border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listing.images[activePhotoIdx]?.url}
              alt={listing.title}
              className="w-full h-full object-cover"
            />

            {/* Live Camera Watermark Tag */}
            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {listing.images[activePhotoIdx]?.isLiveCaptured
                  ? 'LIVE IN-CAMERA CAPTURE'
                  : 'GALLERY / STOCK UPLOAD'}
              </span>
            </div>

            {/* GPS Watermark Footer */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-mono p-2.5 rounded-xl border border-white/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  GPS: {listing.images[activePhotoIdx]?.latitude.toFixed(4)}°N,{' '}
                  {listing.images[activePhotoIdx]?.longitude.toFixed(4)}°E (
                  {listing.images[activePhotoIdx]?.distanceFromListingMeters}m from listing)
                </span>
              </div>
              <span className="text-[11px] text-zinc-300">
                pHash: #{listing.images[activePhotoIdx]?.perceptualHash.substring(0, 10)}...
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {listing.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-transform ${
                    activePhotoIdx === i
                      ? 'border-emerald-500 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Sidebar / Booking Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block">
                Total Monthly Real Living Cost
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black text-zinc-900 dark:text-white">
                  ₹{listing.pricing.totalMonthlyEstimated.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-500">/ month all-in</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Zero broker fee • 1-month refundable security deposit
              </p>
            </div>

            {/* Direct Owner Protection Pill */}
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Host / Landlord:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {listing.ownerName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Direct Contact:</span>
                <span className="font-mono text-zinc-600 dark:text-zinc-300 font-bold">
                  {listing.ownerMaskedPhone}
                </span>
              </div>

              <p className="text-[11px] text-zinc-500 border-t border-zinc-200 dark:border-zinc-700 pt-1.5">
                🔒 Phone number unmasks automatically when you confirm an in-person visit slot.
              </p>
            </div>

            <button
              onClick={() => setIsVisitModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Visit + Parent Safety Link</span>
            </button>

            <p className="text-[10px] text-center text-zinc-400">
              Parents can monitor visit timings and route safety in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Grids: Fair Rent Meter & Commute Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <FairRentMeter pricing={listing.pricing} />
        <CommuteCard commute={listing.commute} />
      </div>

      {/* Senior Verifier Walkthrough Audit */}
      <SeniorVerificationCard verification={listing.verification} />

      {/* Amenities & House Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amenities */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
            Included Amenities
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {listing.amenities.map((item, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2 text-zinc-800 dark:text-zinc-200"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* House Rules */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
            House Guidelines & Curfew
          </h3>
          <div className="space-y-2 text-xs">
            {listing.rules.map((rule, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Review Summary & Verified Tenant Reviews */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Verified Outstation Student Reviews</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  @svnit.ac.in Domain Verified Only
                </span>
              </h3>
              <p className="text-[11px] text-zinc-500">
                Only students with confirmed stay history can leave ratings
              </p>
            </div>
          </div>
        </div>

        {/* AI Synthesis Box */}
        <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-xs space-y-2 text-teal-950 dark:text-teal-200">
          <div className="flex items-center gap-1.5 font-bold text-teal-800 dark:text-teal-300">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI Review Digest & Sentiment Analysis</span>
          </div>
          <p className="leading-relaxed">{listing.aiReviewSummary.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
            <div>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                Top Praises:
              </span>
              <ul className="list-disc list-inside space-y-0.5 opacity-90">
                {listing.aiReviewSummary.positiveHighlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                Points to Consider:
              </span>
              <ul className="list-disc list-inside space-y-0.5 opacity-90">
                {listing.aiReviewSummary.potentialDrawbacks.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Actual Reviews Feed */}
        <div className="space-y-3">
          {listing.reviews.map(rev => (
            <div
              key={rev.id}
              className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {rev.studentName}
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                      ✓ Confirmed Stay ({rev.stayDurationMonths} mos)
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">{rev.studentCollege}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{rev.comment}</p>

              <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                {rev.pros.map((p, i) => (
                  <span
                    key={i}
                    className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded"
                  >
                    + {p}
                  </span>
                ))}
                {rev.cons.map((c, i) => (
                  <span
                    key={i}
                    className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded"
                  >
                    - {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isVisitModalOpen && (
        <VisitBookingModal
          isOpen={true}
          onClose={() => setIsVisitModalOpen(false)}
          listing={listing}
        />
      )}

      {isReportModalOpen && (
        <ScamReportModal
          isOpen={true}
          onClose={() => setIsReportModalOpen(false)}
          listing={listing}
        />
      )}
    </div>
  );
}

export default function ListingDetailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading Verified Listing Proof...</div>}>
      <ListingDetailContent />
    </Suspense>
  );
}
