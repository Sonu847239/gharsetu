'use client';

import React, { useState } from 'react';
import { Listing } from '@/types';
import { useApp } from '@/context/AppContext';
import { AlertTriangle, CheckCircle2, ShieldAlert, Flag } from 'lucide-react';

interface ScamReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export default function ScamReportModal({ isOpen, onClose, listing }: ScamReportModalProps) {
  const { addScamReport, currentUser } = useApp();
  const [reason, setReason] = useState<
    'fake_photos' | 'broker_disguised' | 'hidden_charges_on_visit' | 'advance_demanded' | 'rude_unsafe'
  >('broker_disguised');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addScamReport({
      listingId: listing.id,
      listingTitle: listing.title,
      reporterId: currentUser.id,
      reporterRole: currentUser.role,
      reason,
      description: description || 'Flagged through community Scam Shield.',
      reportedPhone: listing.ownerPhone,
      status: 'investigating'
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                Report Scam / Broker Pattern
              </h3>
              <p className="text-[11px] text-zinc-500">
                Community Scam Shield protection for outstation students
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

        {/* Form Body */}
        <div className="p-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300">
                <span className="font-bold block mb-0.5">Target: {listing.title}</span>
                <p className="text-[11px]">Contact: {listing.ownerPhone} ({listing.ownerName})</p>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Violation Category:
                </label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                >
                  <option value="broker_disguised">
                    Disguised Broker (Charging unauthorized brokerage)
                  </option>
                  <option value="advance_demanded">
                    Demanding Token / Visiting Fee before showing room
                  </option>
                  <option value="fake_photos">
                    Fake or Stolen Photos (Room looks different from app)
                  </option>
                  <option value="hidden_charges_on_visit">
                    Hidden Charges (Higher rent or unexpected deposit demanded on spot)
                  </option>
                  <option value="rude_unsafe">
                    Unsafe or Hostile Host Behavior
                  </option>
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Explain What Happened:
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. When I visited, the person claiming to be owner said he is an agent and demanded 1 month commission..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md shadow-rose-600/30 flex items-center justify-center gap-2"
              >
                <Flag className="w-4 h-4" />
                <span>Submit Report to Scam Shield</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                Report Logged in Moderator Queue
              </h4>
              <p className="text-xs text-zinc-500">
                Thank you for protecting your fellow students. The phone number has been flagged in our broker registry.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

