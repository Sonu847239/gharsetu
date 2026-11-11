'use client';

import React, { useState } from 'react';
import { Listing } from '@/types';
import { Calendar, Shield, Share2, Copy, Check, Lock, PhoneCall, Clock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VisitBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export default function VisitBookingModal({ isOpen, onClose, listing }: VisitBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('2026-11-12');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM - 12:00 PM');
  const [studentPhone, setStudentPhone] = useState('+91 98790 12345');
  const [parentPhone, setParentPhone] = useState('+91 98250 88776');
  const [isBooked, setIsBooked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const parentSafetyToken = `safe-${listing.id}-${Date.now().toString(36)}`;
  const parentUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/parent-view/${parentSafetyToken}`;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }
  };

  const copyParentLink = () => {
    navigator.clipboard.writeText(parentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                Book Verified In-Person Visit
              </h3>
              <p className="text-[11px] text-zinc-500">
                Direct owner appointment with Parent Safety Protection Link
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {!isBooked ? (
            <form onSubmit={handleBooking} className="space-y-4 text-xs">
              {/* Listing Snippet */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={listing.images[0]?.url}
                  alt={listing.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-900 dark:text-white truncate">
                    {listing.title}
                  </h4>
                  <p className="text-zinc-500 text-[11px] truncate">{listing.address}</p>
                  <p className="text-emerald-600 font-semibold text-[11px]">
                    ₹{listing.pricing.totalMonthlyEstimated}/mo (All-in)
                  </p>
                </div>
              </div>

              {/* Broker-Free Privacy Guarantee */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Broker-Free Privacy Protection:
                </span>
                <p className="text-[11px] leading-relaxed">
                  Your phone number and the owner&apos;s direct phone number are protected. Direct phone contact is unlocked immediately once this appointment is confirmed to eliminate middleman brokers.
                </p>
              </div>

              {/* Slot Picking */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Select Visit Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={e => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                  >
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    <option>04:00 PM - 05:00 PM</option>
                    <option>05:30 PM - 06:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Parent Phone for Parent Safety Link */}
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Parent / Guardian WhatsApp or Phone (For Safety Mode)
                </label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={e => setParentPhone(e.target.value)}
                  placeholder="+91 98xxx xxxxx"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                  required
                />
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  We generate a read-only safety view showing them the verified location and visit timing.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Visit & Unlock Owner Phone</span>
              </button>
            </form>
          ) : (
            /* Booking Confirmed State */
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-bold text-lg text-zinc-900 dark:text-white">
                  Visit Confirmed & Verified!
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Slot scheduled for {selectedDate} ({selectedSlot})
                </p>
              </div>

              {/* Unlocked Owner Contact Details */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-left space-y-2 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  Direct Owner Contact Unlocked (No Brokerage)
                </span>
                <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">{listing.ownerName}</p>
                    <p className="text-emerald-600 font-mono font-bold text-sm">
                      {listing.ownerPhone}
                    </p>
                  </div>
                  <a
                    href={`tel:${listing.ownerPhone}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                  >
                    Call Owner
                  </a>
                </div>
              </div>

              {/* Parent Safety Link Box */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-left space-y-2 text-xs">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Parent Safety Link Ready
                </span>
                <p className="text-[11px] text-zinc-500">
                  Share this read-only link with your parents so they can inspect the building GPS, verification video, and visit details in peace.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={parentUrl}
                    className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-300 font-mono truncate"
                  />
                  <button
                    onClick={copyParentLink}
                    className="px-3 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs flex items-center gap-1 shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

