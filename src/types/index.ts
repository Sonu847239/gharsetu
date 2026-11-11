// TypeScript definitions for GharSetu

export type UserRole = 'student' | 'owner' | 'senior_verifier' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  collegeEmail?: string;
  isCollegeEmailVerified: boolean;
  phone: string;
  role: UserRole;
  avatar: string;
  collegeName: string;
  verificationBadge?: string;
  seniorPoints?: number;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  verifiedEmailDomain: string;
}

export interface PhotoVerificationMeta {
  id: string;
  url: string;
  isLiveCaptured: boolean;
  capturedAt: string; // ISO timestamp
  latitude: number;
  longitude: number;
  distanceFromListingMeters: number;
  perceptualHash: string; // Hex representation
  reverseSearchMatchFound: boolean;
  reverseSearchScore?: number; // 0 to 1, where 1 means exact duplicate stolen photo
  deviceMeta?: string;
}

export interface SeniorWalkthroughVerification {
  id: string;
  verifierId: string;
  verifierName: string;
  verifierBranch: string;
  verifierBatch: string;
  visitedAt: string;
  videoWalkthroughUrl?: string;
  videoDurationSec: number;
  checklist: {
    waterSupply24x7: boolean;
    wifiSpeedTestedMbps: number;
    properVentilationSunlight: boolean;
    curfewStrictness: 'none' | 'flexible' | 'strict_9pm' | 'strict_10pm';
    cleanlinessRating: number; // 1 to 5
    foodTasteRating?: number; // 1 to 5
    ownerAttitude: 'friendly' | 'neutral' | 'intrusive';
    powerBackupWorking: boolean;
  };
  notes: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface AllInMonthlyCost {
  baseRent: number;
  electricityEstimate: number; // e.g. ₹500 - ₹1200 depending on AC meter
  electricityBillingType: 'included' | 'per_unit_submeter' | 'fixed_monthly';
  foodCost: number; // ₹0 if self-cook or ₹2500-₹3500 for 3 meals
  maintenance: number;
  waterAndWifi: number;
  securityDeposit: number;
  depositMonths: number;
  totalMonthlyEstimated: number; // Sum of base + elec + food + maint + wifi
  averageNeighborhoodRent: number;
  priceFairnessRatio: number; // listing / neighborhood (e.g. 0.95 = 5% cheaper than avg)
  isOverpricedFlag: boolean;
}

export interface CommuteIntelligence {
  collegeId: string;
  collegeName: string;
  distanceKm: number;
  walkingMinutes: number;
  busMinutes: number;
  busFareInr: number;
  autoMinutes: number;
  autoFareInr: number;
  nightSafetyScore: number; // 0 - 100
  nightLightingNotes: string;
  nearbyEssentials: {
    messCountWithin500m: number;
    nearestPharmacyMinutes: number;
    nearestAtmMeters: number;
    laundryAvailableNearby: boolean;
    hospitalWithin2Km: string;
  };
}

export interface TrustScoreBreakdown {
  totalScore: number; // 0 - 100
  tier: 'Diamond Verified' | 'Gold Trust' | 'Silver Verified' | 'Probation / Unverified';
  photoVerificationScore: number; // out of 25
  ownerIdAndHistoryScore: number; // out of 20
  seniorVerifierAuditScore: number; // out of 25
  reviewHistoryScore: number; // out of 15
  priceFairnessScore: number; // out of 15
  badges: string[];
  flags: string[];
}

export interface Review {
  id: string;
  studentId: string;
  studentName: string;
  studentCollege: string;
  studentCollegeEmailDomain: string;
  isConfirmedStay: boolean;
  stayDurationMonths: number;
  rating: number; // 1 to 5
  comment: string;
  pros: string[];
  cons: string[];
  createdAt: string;
  ownerResponse?: string;
}

export interface RoommatePreferenceQuiz {
  sleepTime: 'early_bird' | 'night_owl' | 'flexible';
  studyHabits: 'pin_drop_silence' | 'group_study' | 'background_music';
  diet: 'strictly_vegetarian' | 'veg_egg' | 'non_veg';
  smokingDrinking: 'strictly_no' | 'occasional' | 'social';
  musicPreference: 'headphones_only' | 'low_speaker' | 'party';
  cleanlinessStandard: 'daily_cleaner' | 'moderate' | 'chill';
}

export interface RoommateProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'any';
  college: string;
  year: string;
  branch: string;
  budgetMax: number;
  preferredArea: string;
  bio: string;
  quiz: RoommatePreferenceQuiz;
  compatibilityScore?: number; // Calculated on the fly against active user
}

export interface VisitBooking {
  id: string;
  listingId: string;
  listingTitle: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  slotDateTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  parentSafetyToken: string;
  parentViewUrl: string;
  createdAt: string;
}

export interface ScamReport {
  id: string;
  listingId: string;
  listingTitle: string;
  reporterId: string;
  reporterRole: UserRole;
  reason: 'fake_photos' | 'broker_disguised' | 'hidden_charges_on_visit' | 'advance_demanded' | 'rude_unsafe';
  description: string;
  reportedPhone: string;
  status: 'investigating' | 'confirmed_banned' | 'dismissed';
  createdAt: string;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  description: string;
  roomType: 'single' | 'double_sharing' | 'triple_sharing' | '1rk' | '1bhk' | 'flat_share';
  genderPreference: 'boys_only' | 'girls_only' | 'co_living' | 'any';
  address: string;
  neighborhood: string;
  city: string;
  latitude: number;
  longitude: number;
  images: PhotoVerificationMeta[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string; // Masked until visit booked
  ownerMaskedPhone: string;
  isOwnerIdVerified: boolean;
  brokerPhoneWarning: boolean; // Flagged if phone appears in > 3 listings across city
  phoneListingOccurrences: number;
  
  pricing: AllInMonthlyCost;
  commute: CommuteIntelligence;
  verification: SeniorWalkthroughVerification;
  trustScore: TrustScoreBreakdown;
  
  amenities: string[];
  rules: string[];
  reviews: Review[];
  aiReviewSummary: {
    summary: string;
    positiveHighlights: string[];
    potentialDrawbacks: string[];
    sentimentScore: number; // 0 to 100
  };
  createdAt: string;
  isAvailable: boolean;
}

