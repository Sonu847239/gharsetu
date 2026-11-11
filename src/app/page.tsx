'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import ListingCard from '@/components/ListingCard';
import InteractiveMapSplit from '@/components/InteractiveMapSplit';
import VisitBookingModal from '@/components/VisitBookingModal';
import ScamReportModal from '@/components/ScamReportModal';
import { Listing } from '@/types';
import {
  Search,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  Layers,
  Map as MapIcon,
  List as ListIcon
} from 'lucide-react';

export default function HomePage() {
  const { listings, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(15000);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(3.5);
  const [onlyVerifiedTrust, setOnlyVerifiedTrust] = useState<boolean>(false);
  const [foodIncludedOnly, setFoodIncludedOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');

  const [activeListingModal, setActiveListingModal] = useState<Listing | null>(null);
  const [activeReportModal, setActiveReportModal] = useState<Listing | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchArea = item.neighborhood.toLowerCase().includes(q);
        const matchCollege = item.commute.collegeName.toLowerCase().includes(q);
        if (!matchTitle && !matchArea && !matchCollege) return false;
      }

      if (selectedGender !== 'all' && item.genderPreference !== selectedGender) {
        return false;
      }

      if (selectedRoomType !== 'all' && item.roomType !== selectedRoomType) {
        return false;
      }

      if (item.pricing.totalMonthlyEstimated > maxBudget) {
        return false;
      }

      if (item.commute.distanceKm > maxDistanceKm) {
        return false;
      }

      if (onlyVerifiedTrust && item.trustScore.totalScore < 75) {
        return false;
      }

      if (foodIncludedOnly && item.pricing.foodCost === 0) {
        return false;
      }

      return true;
    });
  }, [
    listings,
    searchQuery,
    selectedGender,
    selectedRoomType,
    maxBudget,
    maxDistanceKm,
    onlyVerifiedTrust,
    foodIncludedOnly
  ]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Hero Header with Trust Value Proposition */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-5 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:flex items-center justify-center">
          <ShieldCheck className="w-80 h-80" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Anti-Broker • Live In-Camera Proof • Senior Student Verified</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Stop guessing rooms. <br />
            <span className="text-emerald-400">Demand transparent proof.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            {t.tagline} Every PG near Marwadi University Rajkot has a transparent 0-100 Trust Score, live GPS-tagged photos, a 60-second video walkthrough by college seniors, and zero hidden electricity bills.
          </p>

          {/* College Campus Quick Selector */}
          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs text-emerald-200 font-medium">Selected Campus:</span>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Marwadi University (MU Rajkot)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Control Hub */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        {/* Top Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search near Marwadi University, Gauridad, Bedi Bypass, Morbi Road..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Gender */}
          <div>
            <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Gender</label>
            <select
              value={selectedGender}
              onChange={e => setSelectedGender(e.target.value)}
              className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium"
            >
              <option value="all">All Genders</option>
              <option value="boys_only">Boys Only</option>
              <option value="girls_only">Girls Only</option>
              <option value="co_living">Co-Living</option>
            </select>
          </div>

          {/* Sharing Type */}
          <div>
            <label className="font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Room Type</label>
            <select
              value={selectedRoomType}
              onChange={e => setSelectedRoomType(e.target.value)}
              className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium"
            >
              <option value="all">All Room Types</option>
              <option value="single">Single Room</option>
              <option value="double_sharing">Double Sharing</option>
              <option value="triple_sharing">Triple Sharing</option>
              <option value="1rk">1 RK / Studio</option>
              <option value="1bhk">1 BHK Flat</option>
            </select>
          </div>

          {/* Max Budget Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-zinc-600 dark:text-zinc-400">Max All-In</label>
              <span className="font-extrabold text-emerald-600">₹{maxBudget}</span>
            </div>
            <input
              type="range"
              min="4000"
              max="20000"
              step="500"
              value={maxBudget}
              onChange={e => setMaxBudget(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Max Distance */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-zinc-600 dark:text-zinc-400">Campus Radius</label>
              <span className="font-extrabold text-emerald-600">{maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.5"
              value={maxDistanceKm}
              onChange={e => setMaxDistanceKm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Checkboxes */}
          <div className="col-span-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300 font-medium">
              <input
                type="checkbox"
                checked={onlyVerifiedTrust}
                onChange={e => setOnlyVerifiedTrust(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
              />
              <span>Diamond Trust (75+) Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300 font-medium">
              <input
                type="checkbox"
                checked={foodIncludedOnly}
                onChange={e => setFoodIncludedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
              />
              <span>Food / Mess Included</span>
            </label>
          </div>
        </div>

        {/* View Toggle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3 gap-2">
          <p className="text-xs font-semibold text-zinc-500">
            Showing <span className="text-zinc-900 dark:text-white font-bold">{filteredListings.length}</span> verified student listings near Marwadi University
          </p>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-white dark:bg-zinc-700 text-emerald-600 font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-zinc-700 text-emerald-600 font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <ListIcon className="w-3.5 h-3.5" />
              <span>List Only</span>
            </button>

            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-zinc-700 text-emerald-600 font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map Only</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-6">
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* List Column (7 cols) */}
            <div className="order-2 lg:order-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {filteredListings.length === 0 ? (
                <div className="sm:col-span-2 p-10 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="font-bold text-zinc-900 dark:text-white">No listings match your filter parameters</p>
                  <p className="text-xs text-zinc-500">Try widening your budget range or distance limit.</p>
                </div>
              ) : (
                filteredListings.map(listing => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onBookVisit={l => setActiveListingModal(l)}
                    onOpenReport={l => setActiveReportModal(l)}
                  />
                ))
              )}
            </div>

            {/* Map Column (5 cols sticky) */}
            <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-20 h-[380px] sm:h-[450px] lg:h-[640px]">
              <InteractiveMapSplit
                listings={filteredListings}
                selectedListingId={selectedPinId}
                onSelectListing={id => {
                  setSelectedPinId(id);
                  const el = document.getElementById(`listing-${id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        )}

        {viewMode === 'list' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredListings.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onBookVisit={l => setActiveListingModal(l)}
                onOpenReport={l => setActiveReportModal(l)}
              />
            ))}
          </div>
        )}

        {viewMode === 'map' && (
          <div className="h-[520px] sm:h-[680px]">
            <InteractiveMapSplit
              listings={filteredListings}
              selectedListingId={selectedPinId}
              onSelectListing={id => setSelectedPinId(id)}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {activeListingModal && (
        <VisitBookingModal
          isOpen={true}
          onClose={() => setActiveListingModal(null)}
          listing={activeListingModal}
        />
      )}

      {activeReportModal && (
        <ScamReportModal
          isOpen={true}
          onClose={() => setActiveReportModal(null)}
          listing={activeReportModal}
        />
      )}
    </div>
  );
}
