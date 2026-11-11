'use client';

import React, { createContext, useContext, useState } from 'react';
import { Listing, RoommateProfile, ScamReport, UserProfile } from '@/types';
import { INITIAL_LISTINGS, SAMPLE_ROOMMATES, SAMPLE_SCAM_REPORTS } from '@/lib/mock-data';
import { Language, translations } from '@/lib/i18n';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en'];
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  roommates: RoommateProfile[];
  scamReports: ScamReport[];
  addScamReport: (report: Omit<ScamReport, 'id' | 'createdAt'>) => void;
  addListing: (listing: Listing) => void;
  updateListingVerification: (listingId: string, updatedVer: Listing['verification']) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'stu-current',
  name: 'Aarav Sharma',
  email: 'aarav.sharma24@gmail.com',
  collegeEmail: 'aarav.s@marwadiuniversity.ac.in',
  isCollegeEmailVerified: true,
  phone: '+91 98790 12345',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  collegeName: 'Marwadi University Rajkot',
  seniorPoints: 450
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [roommates, setRoommates] = useState<RoommateProfile[]>(SAMPLE_ROOMMATES);
  const [scamReports, setScamReports] = useState<ScamReport[]>(SAMPLE_SCAM_REPORTS);

  const t = translations.en;

  const addScamReport = (report: Omit<ScamReport, 'id' | 'createdAt'>) => {
    const newReport: ScamReport = {
      ...report,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setScamReports(prev => [newReport, ...prev]);

    setListings(prev =>
      prev.map(item => {
        if (item.id === report.listingId) {
          return {
            ...item,
            trustScore: {
              ...item.trustScore,
              flags: Array.from(new Set([...item.trustScore.flags, 'Community Scam Report Filed'])),
              totalScore: Math.max(10, item.trustScore.totalScore - 20)
            }
          };
        }
        return item;
      })
    );
  };

  const addListing = (listing: Listing) => {
    setListings(prev => [listing, ...prev]);
  };

  const updateListingVerification = (listingId: string, updatedVer: Listing['verification']) => {
    setListings(prev =>
      prev.map(item => {
        if (item.id === listingId) {
          return {
            ...item,
            verification: updatedVer,
            trustScore: {
              ...item.trustScore,
              seniorVerifierAuditScore: 24,
              totalScore: Math.min(100, item.trustScore.totalScore + 15),
              badges: Array.from(new Set([...item.trustScore.badges, 'Senior Student Approved']))
            }
          };
        }
        return item;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        currentUser,
        setCurrentUser,
        listings,
        setListings,
        roommates,
        scamReports,
        addScamReport,
        addListing,
        updateListingVerification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
