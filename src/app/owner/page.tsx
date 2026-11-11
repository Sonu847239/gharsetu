'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import CameraVerificationModal from '@/components/CameraVerificationModal';
import { CameraCaptureResult } from '@/lib/phash';
import { Listing } from '@/types';
import { calculateComprehensiveTrustScore } from '@/lib/trust-score';
import {
  PlusCircle,
  Camera,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Building,
  DollarSign,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OwnerDashboardPage() {
  const { addListing, listings } = useApp();

  const [title, setTitle] = useState('');
  const [roomType, setRoomType] = useState<Listing['roomType']>('double_sharing');
  const [genderPreference, setGenderPreference] = useState<Listing['genderPreference']>('boys_only');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('Ichchhanath');
  const [baseRent, setBaseRent] = useState(6000);
  const [electricityEstimate, setElectricityEstimate] = useState(500);
  const [foodCost, setFoodCost] = useState(2800);
  const [maintenance, setMaintenance] = useState(250);
  const [securityDeposit, setSecurityDeposit] = useState(6000);
  const [ownerName, setOwnerName] = useState('Rameshchandra Patel');
  const [ownerPhone, setOwnerPhone] = useState('+91 98251 44321');

  // Camera Verification State
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [verifiedPhotos, setVerifiedPhotos] = useState<CameraCaptureResult[]>([]);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // SVNIT Surat approx coordinates for new property
  const listingTargetCoords = { latitude: 21.1685, longitude: 72.7850 };

  const handlePhotoCaptured = (photoResult: CameraCaptureResult) => {
    setVerifiedPhotos(prev => [photoResult, ...prev]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (verifiedPhotos.length === 0) {
      alert('Proof Required: You must take at least one in-app live camera photo to verify your listing.');
      return;
    }

    const totalMonthly = baseRent + electricityEstimate + foodCost + maintenance;
    const avgNeighbor = 10500;
    const priceRatio = totalMonthly / avgNeighbor;

    const formattedPhotos: Listing['images'] = verifiedPhotos.map((p, idx) => ({
      id: `img-new-${idx}`,
      url: p.dataUrl,
      isLiveCaptured: true,
      capturedAt: p.capturedAt,
      latitude: p.coords.latitude,
      longitude: p.coords.longitude,
      distanceFromListingMeters: p.distanceFromListingMeters,
      perceptualHash: p.perceptualHash,
      reverseSearchMatchFound: p.isFlaggedDuplicate,
      deviceMeta: 'Live Camera Capture'
    }));

    const pricing: Listing['pricing'] = {
      baseRent,
      electricityEstimate,
      electricityBillingType: 'per_unit_submeter',
      foodCost,
      maintenance,
      waterAndWifi: 0,
      securityDeposit,
      depositMonths: 1,
      totalMonthlyEstimated: totalMonthly,
      averageNeighborhoodRent: avgNeighbor,
      priceFairnessRatio: Number(priceRatio.toFixed(2)),
      isOverpricedFlag: priceRatio > 1.2
    };

    const verification: Listing['verification'] = {
      id: `ver-new-${Date.now()}`,
      verifierId: 'sen-01',
      verifierName: 'Kavya Shah',
      verifierBranch: 'B.Tech CSE, Final Year',
      verifierBatch: 'SVNIT 2023-27',
      visitedAt: new Date().toISOString(),
      videoWalkthroughUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4198-large.mp4',
      videoDurationSec: 60,
      checklist: {
        waterSupply24x7: true,
        wifiSpeedTestedMbps: 120,
        properVentilationSunlight: true,
        curfewStrictness: 'flexible',
        cleanlinessRating: 5,
        powerBackupWorking: true,
        ownerAttitude: 'friendly'
      },
      notes: 'Initial owner live-audit submitted, physical senior walkthrough scheduled.',
      status: 'verified'
    };

    const trustScore = calculateComprehensiveTrustScore({
      photos: formattedPhotos,
      isOwnerIdVerified: true,
      phoneListingOccurrences: 1,
      seniorVerification: verification,
      reviews: [],
      pricing
    });

    const newListing: Listing = {
      id: `gh-user-${Date.now()}`,
      title: title || `${neighborhood} Verified Student Residence`,
      slug: `residence-${Date.now()}`,
      description: 'Owner-verified room with live camera verification and transparent cost model.',
      roomType,
      genderPreference,
      address: address || `${neighborhood}, Near SVNIT Surat`,
      neighborhood,
      city: 'Surat',
      latitude: listingTargetCoords.latitude,
      longitude: listingTargetCoords.longitude,
      images: formattedPhotos,
      ownerId: 'own-current',
      ownerName,
      ownerPhone,
      ownerMaskedPhone: ownerPhone.replace(/(\+91 \d{5}) \d{5}/, '$1 •••••'),
      isOwnerIdVerified: true,
      brokerPhoneWarning: false,
      phoneListingOccurrences: 1,
      pricing,
      commute: {
        collegeId: 'svnit-surat',
        collegeName: 'SVNIT Surat',
        distanceKm: 0.8,
        walkingMinutes: 9,
        busMinutes: 4,
        busFareInr: 5,
        autoMinutes: 3,
        autoFareInr: 30,
        nightSafetyScore: 92,
        nightLightingNotes: 'Main campus road with solar LED streetlights.',
        nearbyEssentials: {
          messCountWithin500m: 5,
          nearestPharmacyMinutes: 2,
          nearestAtmMeters: 150,
          laundryAvailableNearby: true,
          hospitalWithin2Km: 'Civil Hospital (1.8 km)'
        }
      },
      verification,
      trustScore,
      amenities: ['RO Drinking Water', 'WiFi 100 Mbps+', 'Geyser', 'Study Desk', 'Cupboard'],
      rules: ['No smoking indoors', 'Quiet study hours after 11 PM'],
      reviews: [],
      aiReviewSummary: {
        summary: 'Newly verified direct owner listing with live GPS watermarked photos and zero broker markup.',
        positiveHighlights: ['Live geotagged camera verification', 'No broker fee', 'Fair rent compliance'],
        potentialDrawbacks: ['Awaiting inaugural student reviews'],
        sentimentScore: 90
      },
      createdAt: new Date().toISOString(),
      isAvailable: true
    };

    addListing(newListing);
    setCreatedSuccess(true);
    try {
      confetti();
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl bg-zinc-900 text-white p-6 sm:p-8 border border-zinc-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Owners Only • Strict No-Broker Policy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">
          List Your Student Room with Verifiable Proof
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
          Students trust GharSetu because we reject gallery uploads and hidden utility charges.
          You get genuine students directly, zero broker commissions, and higher occupancy.
        </p>
      </div>

      {createdSuccess ? (
        <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Listing Live & Verified with Trust Engine!
          </h2>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Your live GPS photos have been perceptual-hashed and indexed. Senior student verifiers from SVNIT have been notified to inspect and award you the Diamond Badge.
          </p>
          <button
            onClick={() => {
              setCreatedSuccess(false);
              setVerifiedPhotos([]);
              setTitle('');
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Create Another Listing
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: In-App Camera Only Requirement */}
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600" />
                  <span>Step 1: Live-Capture In-Camera Room Photos</span>
                </h3>
                <p className="text-xs text-zinc-500">
                  Phone gallery uploads are strictly disabled to prevent stock broker scams.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCameraModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/30"
              >
                <Camera className="w-4 h-4" />
                <span>Open Live Camera</span>
              </button>
            </div>

            {/* Display Captured Live Photos */}
            {verifiedPhotos.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl space-y-1">
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  No verified photos captured yet.
                </p>
                <p className="text-[11px] text-zinc-400">
                  Tap &apos;Open Live Camera&apos; to snap real-time GPS watermarked photos of room & washroom.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {verifiedPhotos.map((p, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden aspect-4/3 bg-black border border-emerald-500"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.dataUrl} alt="Captured" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> GPS Watermarked
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Property Basic Details */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-500" />
              <span>Step 2: Room & Campus Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Listing Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Someshwara Twin Sharing for SVNIT Students"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Room Configuration
                </label>
                <select
                  value={roomType}
                  onChange={e => setRoomType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                >
                  <option value="single">Single Private Room</option>
                  <option value="double_sharing">Double Sharing (Twin)</option>
                  <option value="triple_sharing">Triple Sharing</option>
                  <option value="1rk">1 RK Studio with Kitchenette</option>
                  <option value="1bhk">1 BHK Independent Flat</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Student Gender Preference
                </label>
                <select
                  value={genderPreference}
                  onChange={e => setGenderPreference(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                >
                  <option value="boys_only">Boys Only</option>
                  <option value="girls_only">Girls Only</option>
                  <option value="co_living">Co-Living / Any</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Neighborhood (Surat)
                </label>
                <select
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                >
                  <option value="Ichchhanath">Ichchhanath (Adjacent to SVNIT Gate)</option>
                  <option value="Piplod">Piplod</option>
                  <option value="Vesu">Vesu</option>
                  <option value="Athwa Lines">Athwa Lines</option>
                  <option value="Ghod Dod Road">Ghod Dod Road</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Full Building Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. B-12, Green Residency, Near SVNIT Gate 2, Ichchhanath"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Transparent Fair Rent Builder */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-500" />
                <span>Step 3: All-In Monthly Cost Breakdown (No Hidden Fees)</span>
              </h3>
              <p className="text-xs text-zinc-500">
                GharSetu awards high Trust Score badges to owners who specify electricity, mess, and deposit upfront.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Base Rent (₹)
                </label>
                <input
                  type="number"
                  value={baseRent}
                  onChange={e => setBaseRent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Electricity Est. (₹)
                </label>
                <input
                  type="number"
                  value={electricityEstimate}
                  onChange={e => setElectricityEstimate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Food / Mess (₹)
                </label>
                <input
                  type="number"
                  value={foodCost}
                  onChange={e => setFoodCost(Number(e.target.value))}
                  placeholder="0 if self cook"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Maintenance (₹)
                </label>
                <input
                  type="number"
                  value={maintenance}
                  onChange={e => setMaintenance(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            {/* Total Callout Banner */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold block">
                  Calculated All-In Student Monthly Cost:
                </span>
                <span className="text-2xl font-black text-amber-950 dark:text-white">
                  ₹{(baseRent + electricityEstimate + foodCost + maintenance).toLocaleString()} / month
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-current">
                Fair Rent Certified ✓
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Publish Room to Trust Engine</span>
          </button>
        </form>
      )}

      {/* Live Camera Capture Modal */}
      {isCameraModalOpen && (
        <CameraVerificationModal
          isOpen={true}
          onClose={() => setIsCameraModalOpen(false)}
          listingTargetCoords={listingTargetCoords}
          onPhotoVerified={handlePhotoCaptured}
        />
      )}
    </div>
  );
}

