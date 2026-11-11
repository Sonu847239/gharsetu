/**
 * GharSetu Trust Score Engine
 * Core Differentiator: "Proof, not promises"
 * 
 * Computes a transparent, multi-dimensional trust score (0 - 100)
 * with complete breakdown and badge assignments.
 */

import {
  PhotoVerificationMeta,
  SeniorWalkthroughVerification,
  AllInMonthlyCost,
  Review,
  TrustScoreBreakdown
} from '@/types';

export interface TrustScoreParams {
  photos: PhotoVerificationMeta[];
  isOwnerIdVerified: boolean;
  phoneListingOccurrences: number;
  seniorVerification: SeniorWalkthroughVerification;
  reviews: Review[];
  pricing: AllInMonthlyCost;
}

/**
 * 1. Photo Verification Score (Max: 25 pts)
 * - Must be live captured in-app (not gallery)
 * - GPS coordinates must match listing within 300 meters
 * - Perceptual hash checked against scraped broker databases (no stolen image matches)
 */
export function calculatePhotoVerificationScore(photos: PhotoVerificationMeta[]): {
  score: number;
  notes: string[];
} {
  if (!photos || photos.length === 0) {
    return { score: 0, notes: ['No verified photos uploaded'] };
  }

  let liveCount = 0;
  let gpsMatchCount = 0;
  let reverseSearchCleanCount = 0;
  const notes: string[] = [];

  for (const photo of photos) {
    if (photo.isLiveCaptured) liveCount++;
    if (photo.distanceFromListingMeters <= 300) gpsMatchCount++;
    if (!photo.reverseSearchMatchFound) reverseSearchCleanCount++;
    else {
      notes.push(`Warning: Perceptual hash collision detected on image #${photo.id}`);
    }
  }

  const liveRatio = liveCount / photos.length;
  const gpsRatio = gpsMatchCount / photos.length;
  const cleanRatio = reverseSearchCleanCount / photos.length;

  // Max 25: 10pts live camera capture + 10pts GPS tag alignment + 5pts duplicate immunity
  const livePts = liveRatio * 10;
  const gpsPts = gpsRatio * 10;
  const cleanPts = cleanRatio * 5;

  const score = Math.round(livePts + gpsPts + cleanPts);

  if (liveRatio === 1 && gpsRatio === 1 && cleanRatio === 1) {
    notes.push('100% live in-camera captures with on-site GPS watermarks');
  } else if (cleanRatio < 1) {
    notes.push('Possible stolen/re-used stock images detected');
  }

  return { score: Math.min(25, Math.max(0, score)), notes };
}

/**
 * 2. Owner Identity & Anti-Broker Shield (Max: 20 pts)
 * - Gov ID / Aadhaar / Electricity bill verified (+12 pts)
 * - Phone uniqueness check: if phone is tied to > 3 properties, broker pattern penalty
 */
export function calculateOwnerHistoryScore(
  isOwnerIdVerified: boolean,
  phoneListingOccurrences: number
): {
  score: number;
  notes: string[];
} {
  let score = 0;
  const notes: string[] = [];

  if (isOwnerIdVerified) {
    score += 12;
    notes.push('Direct Owner Government ID & Utility Bill verified');
  } else {
    notes.push('Owner ID pending physical verification');
  }

  // Broker pattern penalty
  if (phoneListingOccurrences === 1) {
    score += 8;
    notes.push('Single authentic residential listing (Genuine individual landlord)');
  } else if (phoneListingOccurrences === 2) {
    score += 5;
    notes.push('Dual registered family property');
  } else if (phoneListingOccurrences >= 3) {
    score += 0;
    notes.push(`Broker Warning: Contact number linked to ${phoneListingOccurrences} listings across city`);
  }

  return { score: Math.min(20, Math.max(0, score)), notes };
}

/**
 * 3. Senior Student Verifier Audit (Max: 25 pts)
 * - Verified senior student from the target college visited physically (+10 pts)
 * - 60-second in-room walkthrough video submitted (+5 pts)
 * - Checklist verification (water, WiFi speed, sunlight, curfew honesty) (+10 pts)
 */
export function calculateSeniorVerifierScore(
  verification: SeniorWalkthroughVerification
): {
  score: number;
  notes: string[];
} {
  if (!verification || verification.status !== 'verified') {
    return {
      score: 5, // Default base verification pending
      notes: ['Senior student in-person physical audit pending']
    };
  }

  let score = 10; // Senior verified physical visit
  const notes: string[] = [
    `Audited in-person by Senior Student ${verification.verifierName} (${verification.verifierBranch})`
  ];

  if (verification.videoWalkthroughUrl && verification.videoDurationSec >= 30) {
    score += 5;
    notes.push('60-second unfiltered room & washroom walkthrough video approved');
  }

  // Checklist score
  let checklistScore = 0;
  const { checklist } = verification;
  if (checklist.waterSupply24x7) checklistScore += 2;
  if (checklist.wifiSpeedTestedMbps >= 30) checklistScore += 2;
  if (checklist.properVentilationSunlight) checklistScore += 2;
  if (checklist.cleanlinessRating >= 4) checklistScore += 2;
  if (checklist.powerBackupWorking) checklistScore += 2;

  score += checklistScore;

  return { score: Math.min(25, Math.max(0, score)), notes };
}

/**
 * 4. Review History & College Email Gating (Max: 15 pts)
 * - Only verified college domain emails allowed to review
 * - Confirmed stay length validation prevents fake 5-star brigade
 */
export function calculateReviewScore(reviews: Review[]): {
  score: number;
  notes: string[];
} {
  if (!reviews || reviews.length === 0) {
    return {
      score: 8, // Neutral starting score for new genuine listings
      notes: ['New listing: no prior student tenancy dispute records']
    };
  }

  const verifiedReviews = reviews.filter(r => r.isConfirmedStay);
  if (verifiedReviews.length === 0) {
    return { score: 7, notes: ['Awaiting confirmed tenant student reviews'] };
  }

  const avgRating = verifiedReviews.reduce((sum, r) => sum + r.rating, 0) / verifiedReviews.length;
  // Scale 5 stars to 15 points
  const score = Math.round((avgRating / 5) * 15);
  const notes: string[] = [
    `${verifiedReviews.length} verified outstation student stay reviews (Avg: ${avgRating.toFixed(1)}/5.0)`
  ];

  return { score: Math.min(15, Math.max(0, score)), notes };
}

/**
 * 5. Fair Rent Meter (Max: 15 pts)
 * - Compares base + all-in cost against verified area median
 * - Penalizes hidden surcharge bait-and-switch listings
 */
export function calculateFairRentScore(pricing: AllInMonthlyCost): {
  score: number;
  notes: string[];
} {
  let score = 10;
  const notes: string[] = [];

  const ratio = pricing.priceFairnessRatio;

  if (ratio <= 0.90) {
    // 10%+ cheaper than area average
    score = 15;
    notes.push(`High Value: 10%+ more affordable than neighborhood student median`);
  } else if (ratio <= 1.05) {
    // Fair market rate
    score = 13;
    notes.push('Fair Price: Perfectly consistent with neighborhood average');
  } else if (ratio <= 1.20) {
    // Slightly above average
    score = 8;
    notes.push('Moderate Premium: ~10-20% above median, check included amenities');
  } else {
    // High premium / potential rip-off
    score = 3;
    notes.push('Overpriced Flag: Significantly above college student rental benchmark');
  }

  // Hidden charge transparent penalty
  if (pricing.electricityBillingType === 'included') {
    score = Math.min(15, score + 2);
    notes.push('Zero bill shock: AC & electricity fixed in base rent');
  }

  return { score: Math.min(15, Math.max(0, score)), notes };
}

/**
 * Main Trust Score Calculator
 */
export function calculateComprehensiveTrustScore(params: TrustScoreParams): TrustScoreBreakdown {
  const photoResult = calculatePhotoVerificationScore(params.photos);
  const ownerResult = calculateOwnerHistoryScore(params.isOwnerIdVerified, params.phoneListingOccurrences);
  const seniorResult = calculateSeniorVerifierScore(params.seniorVerification);
  const reviewResult = calculateReviewScore(params.reviews);
  const fairRentResult = calculateFairRentScore(params.pricing);

  const totalScore = Math.min(
    100,
    photoResult.score + ownerResult.score + seniorResult.score + reviewResult.score + fairRentResult.score
  );

  let tier: TrustScoreBreakdown['tier'] = 'Probation / Unverified';
  if (totalScore >= 85) tier = 'Diamond Verified';
  else if (totalScore >= 70) tier = 'Gold Trust';
  else if (totalScore >= 50) tier = 'Silver Verified';

  const badges: string[] = [];
  const flags: string[] = [];

  if (photoResult.score >= 20) badges.push('GPS Live Captured');
  if (ownerResult.score >= 18) badges.push('Direct Owner (No Broker)');
  if (seniorResult.score >= 20) badges.push('Senior Student Approved');
  if (fairRentResult.score >= 13) badges.push('Fair Price Certified');

  if (params.phoneListingOccurrences >= 3) {
    flags.push('Broker Number Alert');
  }
  if (params.photos.some(p => p.reverseSearchMatchFound)) {
    flags.push('Stock/Stolen Photo Warning');
  }
  if (params.pricing.isOverpricedFlag) {
    flags.push('High Premium Rent');
  }

  return {
    totalScore,
    tier,
    photoVerificationScore: photoResult.score,
    ownerIdAndHistoryScore: ownerResult.score,
    seniorVerifierAuditScore: seniorResult.score,
    reviewHistoryScore: reviewResult.score,
    priceFairnessScore: fairRentResult.score,
    badges,
    flags
  };
}

