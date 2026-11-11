'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RoommatePreferenceQuiz, RoommateProfile } from '@/types';
import {
  Users,
  HeartHandshake,
  Sparkles,
  Moon,
  BookOpen,
  Utensils,
  Cigarette,
  Music,
  CheckCircle2,
  Mail,
  Send
} from 'lucide-react';

export default function RoommateMatchPage() {
  const { roommates, currentUser } = useApp();

  const [userQuiz, setUserQuiz] = useState<RoommatePreferenceQuiz>({
    sleepTime: 'night_owl',
    studyHabits: 'pin_drop_silence',
    diet: 'strictly_vegetarian',
    smokingDrinking: 'strictly_no',
    musicPreference: 'headphones_only',
    cleanlinessStandard: 'daily_cleaner'
  });

  const [contactedId, setContactedId] = useState<string | null>(null);

  // Calculate lifestyle compatibility score (0-100%) against each roommate
  const calculateMatch = (candidate: RoommatePreferenceQuiz): number => {
    let score = 0;
    if (candidate.sleepTime === userQuiz.sleepTime) score += 20;
    else if (candidate.sleepTime === 'flexible' || userQuiz.sleepTime === 'flexible') score += 12;

    if (candidate.studyHabits === userQuiz.studyHabits) score += 20;
    else score += 8;

    if (candidate.diet === userQuiz.diet) score += 20;
    else if (
      (candidate.diet === 'veg_egg' && userQuiz.diet === 'strictly_vegetarian') ||
      (candidate.diet === 'strictly_vegetarian' && userQuiz.diet === 'veg_egg')
    )
      score += 15;
    else score += 5;

    if (candidate.smokingDrinking === userQuiz.smokingDrinking) score += 20;
    else if (userQuiz.smokingDrinking === 'strictly_no' && candidate.smokingDrinking !== 'strictly_no')
      score += 0;
    else score += 10;

    if (candidate.musicPreference === userQuiz.musicPreference) score += 10;
    else score += 5;

    if (candidate.cleanlinessStandard === userQuiz.cleanlinessStandard) score += 10;
    else score += 5;

    return Math.min(100, Math.max(20, score));
  };

  const rankedRoommates = roommates
    .map(rm => ({
      ...rm,
      compatibilityScore: calculateMatch(rm.quiz)
    }))
    .sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-900 to-zinc-900 text-white p-6 sm:p-8 border border-teal-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Peer Compatibility Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          Find Compatible Roommates Near College
        </h1>
        <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl">
          Moving from another state? Don&apos;t get stuck with a toxic roommate. Take our 60-second lifestyle quiz (sleep rhythms, study silence, diet, cleanliness) and find peers from your college before booking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lifestyle Quiz Form (Left 5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Your Lifestyle Habits</span>
            </h3>
            <span className="text-[11px] text-zinc-400">Live Match Updating</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Sleep */}
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                Sleep Schedule
              </label>
              <select
                value={userQuiz.sleepTime}
                onChange={e => setUserQuiz({ ...userQuiz, sleepTime: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
              >
                <option value="night_owl">Night Owl (Sleeps 1 AM - 3 AM)</option>
                <option value="early_bird">Early Bird (Sleeps by 11 PM)</option>
                <option value="flexible">Flexible / Exam Dependent</option>
              </select>
            </div>

            {/* Study Habits */}
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                Study Atmosphere
              </label>
              <select
                value={userQuiz.studyHabits}
                onChange={e => setUserQuiz({ ...userQuiz, studyHabits: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
              >
                <option value="pin_drop_silence">Pin Drop Silence in Room</option>
                <option value="group_study">Group Discussions & Study</option>
                <option value="background_music">Low Background Lofi / Audio</option>
              </select>
            </div>

            {/* Diet */}
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Utensils className="w-3.5 h-3.5 text-amber-500" />
                Food & Diet
              </label>
              <select
                value={userQuiz.diet}
                onChange={e => setUserQuiz({ ...userQuiz, diet: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
              >
                <option value="strictly_vegetarian">Strictly Pure Vegetarian</option>
                <option value="veg_egg">Eggetarian / OK with Eggs</option>
                <option value="non_veg">Non-Vegetarian</option>
              </select>
            </div>

            {/* Smoking */}
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Cigarette className="w-3.5 h-3.5 text-rose-500" />
                Smoking / Drinking Stance
              </label>
              <select
                value={userQuiz.smokingDrinking}
                onChange={e => setUserQuiz({ ...userQuiz, smokingDrinking: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
              >
                <option value="strictly_no">Strictly Non-Smoker / No Alcohol</option>
                <option value="occasional">Occasional / Outside only</option>
                <option value="social">Chill / Social</option>
              </select>
            </div>

            {/* Music */}
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Music className="w-3.5 h-3.5 text-purple-500" />
                Music in Room
              </label>
              <select
                value={userQuiz.musicPreference}
                onChange={e => setUserQuiz({ ...userQuiz, musicPreference: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
              >
                <option value="headphones_only">Headphones Only (Never on speaker)</option>
                <option value="low_speaker">Low Speaker Volume</option>
                <option value="party">Party / Jamming Friendly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Compatibility Match Results (Right 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Compatibility Matched Students ({rankedRoommates.length})
            </h3>
            <span className="text-xs text-emerald-600 font-semibold">
              Sorted by Lifestyle Alignment
            </span>
          </div>

          <div className="space-y-4">
            {rankedRoommates.map(rm => {
              const score = rm.compatibilityScore || 0;
              const isHighMatch = score >= 80;

              return (
                <div
                  key={rm.id}
                  className={`rounded-2xl border p-5 bg-white dark:bg-zinc-900 shadow-xs transition-all ${
                    isHighMatch
                      ? 'border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-500/20'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                          {rm.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {rm.year} • {rm.branch}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {rm.college} • Looking in {rm.preferredArea}
                      </p>
                    </div>

                    {/* Compatibility Score Circle Badge */}
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center gap-1 font-black text-sm px-3 py-1 rounded-full ${
                          isHighMatch
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>{score}% Match</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 block mt-0.5">
                        Budget: ₹{rm.budgetMax}/mo
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-700 dark:text-zinc-300 italic mt-3 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    &ldquo;{rm.bio}&rdquo;
                  </p>

                  {/* Habit Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 text-[11px]">
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded">
                      🌙 {rm.quiz.sleepTime.replace('_', ' ')}
                    </span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded">
                      📖 {rm.quiz.studyHabits.replace('_', ' ')}
                    </span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded">
                      🥗 {rm.quiz.diet.replace('_', ' ')}
                    </span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded">
                      🚭 {rm.quiz.smokingDrinking.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Verified College Domain Email
                    </span>

                    <button
                      onClick={() => setContactedId(rm.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        contactedId === rm.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-emerald-600'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{contactedId === rm.id ? 'Invite Sent! ✓' : 'Connect for Room Sharing'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

