import { College, Listing, RoommateProfile, ScamReport } from '@/types';
import { calculateComprehensiveTrustScore } from '@/lib/trust-score';

export const SAMPLE_COLLEGES: College[] = [
  {
    id: 'mu-rajkot',
    name: 'Marwadi University (MU Rajkot)',
    shortName: 'MU Rajkot',
    city: 'Rajkot',
    state: 'Gujarat',
    latitude: 22.3688,
    longitude: 70.8022,
    verifiedEmailDomain: 'marwadiuniversity.ac.in'
  },
  {
    id: 'du-north',
    name: 'Delhi University (North Campus)',
    shortName: 'DU North',
    city: 'Delhi',
    state: 'Delhi',
    latitude: 28.6904,
    longitude: 77.2125,
    verifiedEmailDomain: 'du.ac.in'
  }
];

export const CURATED_ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502005229762-ee152da92e06?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'gh-001',
    title: 'Gokul Residency - Single Deluxe Room near MU Gate',
    slug: 'gokul-residency-single-deluxe-mu',
    description: 'Direct owner property 400m from Marwadi University Main Gate on Rajkot-Morbi Highway. Full natural light, 200 Mbps fiber WiFi, 24x7 water with RO purifier. No broker.',
    roomType: 'single',
    genderPreference: 'boys_only',
    address: 'Opp. Marwadi University, Morbi Highway, Gauridad, Rajkot',
    neighborhood: 'Morbi Highway / Gauridad',
    city: 'Rajkot',
    latitude: 22.3705,
    longitude: 70.8038,
    images: [
      {
        id: 'img-101',
        url: CURATED_ROOM_IMAGES[0],
        isLiveCaptured: true,
        capturedAt: '2026-11-08T10:15:00Z',
        latitude: 22.3704,
        longitude: 70.8037,
        distanceFromListingMeters: 14,
        perceptualHash: 'c4e2a893ff109844',
        reverseSearchMatchFound: false,
        deviceMeta: 'OnePlus 11 5G In-App Camera'
      },
      {
        id: 'img-102',
        url: CURATED_ROOM_IMAGES[1],
        isLiveCaptured: true,
        capturedAt: '2026-11-08T10:18:22Z',
        latitude: 22.3705,
        longitude: 70.8038,
        distanceFromListingMeters: 6,
        perceptualHash: 'a93f0b48c21943ef',
        reverseSearchMatchFound: false,
        deviceMeta: 'OnePlus 11 5G In-App Camera'
      }
    ],
    ownerId: 'own-001',
    ownerName: 'Hasmukhbhai Patel (Retired Principal)',
    ownerPhone: '+91 98251 44321',
    ownerMaskedPhone: '+91 98251 •••••',
    isOwnerIdVerified: true,
    brokerPhoneWarning: false,
    phoneListingOccurrences: 1,
    pricing: {
      baseRent: 6500,
      electricityEstimate: 500,
      electricityBillingType: 'per_unit_submeter',
      foodCost: 2600,
      maintenance: 250,
      waterAndWifi: 0,
      securityDeposit: 6500,
      depositMonths: 1,
      totalMonthlyEstimated: 9850,
      averageNeighborhoodRent: 10500,
      priceFairnessRatio: 0.94,
      isOverpricedFlag: false
    },
    commute: {
      collegeId: 'mu-rajkot',
      collegeName: 'Marwadi University Rajkot',
      distanceKm: 0.45,
      walkingMinutes: 5,
      busMinutes: 3,
      busFareInr: 5,
      autoMinutes: 2,
      autoFareInr: 25,
      nightSafetyScore: 92,
      nightLightingNotes: 'Main Rajkot-Morbi Highway with high-mast LED streetlights, campus security posts 200m away.',
      nearbyEssentials: {
        messCountWithin500m: 6,
        nearestPharmacyMinutes: 2,
        nearestAtmMeters: 150,
        laundryAvailableNearby: true,
        hospitalWithin2Km: 'Synergy Hospital (2.0 km)'
      }
    },
    verification: {
      id: 'ver-001',
      verifierId: 'sen-01',
      verifierName: 'Kavya Shah',
      verifierBranch: 'B.Tech CSE, Final Year',
      verifierBatch: 'Marwadi University 2023-27',
      visitedAt: '2026-11-09T16:30:00Z',
      videoWalkthroughUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4198-large.mp4',
      videoDurationSec: 58,
      checklist: {
        waterSupply24x7: true,
        wifiSpeedTestedMbps: 180,
        properVentilationSunlight: true,
        curfewStrictness: 'flexible',
        cleanlinessRating: 5,
        foodTasteRating: 4,
        ownerAttitude: 'friendly',
        powerBackupWorking: true
      },
      notes: 'Personally tested the WiFi and geyser. Owner Hasmukh uncle lives in front bungalow and is very supportive. No unnecessary restrictions.',
      status: 'verified'
    },
    trustScore: {
      totalScore: 96,
      tier: 'Diamond Verified',
      photoVerificationScore: 25,
      ownerIdAndHistoryScore: 20,
      seniorVerifierAuditScore: 24,
      reviewHistoryScore: 14,
      priceFairnessScore: 13,
      badges: ['GPS Live Captured', 'Direct Owner (No Broker)', 'Senior Student Approved', 'Fair Price Certified'],
      flags: []
    },
    amenities: ['High Speed WiFi (150 Mbps+)', 'RO Drinking Water', 'Geyser in Washroom', 'Table & Study Chair', 'CCTV on Stairs', 'Bicycle Parking'],
    rules: ['No loud music after 11 PM', 'Guests allowed in daytime', 'Clean your own room'],
    reviews: [
      {
        id: 'rev-01',
        studentId: 'stu-99',
        studentName: 'Harshvardhan Rao',
        studentCollege: 'Marwadi University (Mechanical)',
        studentCollegeEmailDomain: 'marwadiuniversity.ac.in',
        isConfirmedStay: true,
        stayDurationMonths: 11,
        rating: 5,
        comment: 'Best decision of my 2nd year at MU. Walk to campus in under 5 minutes. Electricity meter is totally fair, zero surprises.',
        pros: ['Walk to MU classes in 5 mins', 'Zero water cuts', 'Chill owner'],
        cons: ['Slightly noisy during highway truck peak hours'],
        createdAt: '2026-10-15T08:00:00Z'
      }
    ],
    aiReviewSummary: {
      summary: 'Exceptionally trusted student house with confirmed zero broker markups. High praise for host transparency and proximity to Marwadi University campus.',
      positiveHighlights: ['Walkable to MU campus', 'Unfiltered senior video confirmation', '1-month refundable deposit'],
      potentialDrawbacks: ['Highway road side room gets moderate traffic sound during peak evening'],
      sentimentScore: 96
    },
    createdAt: '2026-11-05T09:00:00Z',
    isAvailable: true
  },
  {
    id: 'gh-002',
    title: 'Shree Krishna Girls PG - Twin Sharing with Kathiyawadi & North Indian Food',
    slug: 'shree-krishna-girls-pg-twin-sharing',
    description: 'Safe girls PG with biometric entry, authentic hygienic 3-time meals, and strict senior verification. 5 mins commute to Marwadi University.',
    roomType: 'double_sharing',
    genderPreference: 'girls_only',
    address: 'B-14, Shivalik Hills, Near Bedi Bypass, Rajkot',
    neighborhood: 'Bedi Bypass',
    city: 'Rajkot',
    latitude: 22.3550,
    longitude: 70.7950,
    images: [
      {
        id: 'img-201',
        url: CURATED_ROOM_IMAGES[2],
        isLiveCaptured: true,
        capturedAt: '2026-11-07T11:20:00Z',
        latitude: 22.3551,
        longitude: 70.7949,
        distanceFromListingMeters: 20,
        perceptualHash: 'd5c31e90aa447192',
        reverseSearchMatchFound: false,
        deviceMeta: 'Samsung S23 Live Capture'
      }
    ],
    ownerId: 'own-002',
    ownerName: 'Dr. Jayshreeben Joshi',
    ownerPhone: '+91 97240 11982',
    ownerMaskedPhone: '+91 97240 •••••',
    isOwnerIdVerified: true,
    brokerPhoneWarning: false,
    phoneListingOccurrences: 1,
    pricing: {
      baseRent: 5200,
      electricityEstimate: 400,
      electricityBillingType: 'per_unit_submeter',
      foodCost: 3000,
      maintenance: 200,
      waterAndWifi: 0,
      securityDeposit: 5500,
      depositMonths: 1,
      totalMonthlyEstimated: 8800,
      averageNeighborhoodRent: 9500,
      priceFairnessRatio: 0.92,
      isOverpricedFlag: false
    },
    commute: {
      collegeId: 'mu-rajkot',
      collegeName: 'Marwadi University Rajkot',
      distanceKm: 1.4,
      walkingMinutes: 16,
      busMinutes: 6,
      busFareInr: 10,
      autoMinutes: 4,
      autoFareInr: 30,
      nightSafetyScore: 96,
      nightLightingNotes: 'Gated residential colony with 24/7 security guard cabin and illuminated street.',
      nearbyEssentials: {
        messCountWithin500m: 4,
        nearestPharmacyMinutes: 3,
        nearestAtmMeters: 100,
        laundryAvailableNearby: true,
        hospitalWithin2Km: 'Wockhardt Hospital Rajkot (3.0 km)'
      }
    },
    verification: {
      id: 'ver-002',
      verifierId: 'sen-02',
      verifierName: 'Sneha Patel',
      verifierBranch: 'B.Tech Electrical, 3rd Year',
      verifierBatch: 'MU 2024-28',
      visitedAt: '2026-11-08T17:15:00Z',
      videoWalkthroughUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4198-large.mp4',
      videoDurationSec: 62,
      checklist: {
        waterSupply24x7: true,
        wifiSpeedTestedMbps: 120,
        properVentilationSunlight: true,
        curfewStrictness: 'strict_10pm',
        cleanlinessRating: 5,
        foodTasteRating: 5,
        ownerAttitude: 'friendly',
        powerBackupWorking: true
      },
      notes: 'Super clean, food is prepared by a dedicated cook from Saurashtra. Curfew is 10 PM sharp, gates locked by warden.',
      status: 'verified'
    },
    trustScore: {
      totalScore: 94,
      tier: 'Diamond Verified',
      photoVerificationScore: 25,
      ownerIdAndHistoryScore: 20,
      seniorVerifierAuditScore: 23,
      reviewHistoryScore: 13,
      priceFairnessScore: 13,
      badges: ['GPS Live Captured', 'Direct Owner (No Broker)', 'Senior Student Approved', 'Fair Price Certified'],
      flags: []
    },
    amenities: ['3 Times Hygienic Meals', 'Biometric Entry', 'Washing Machine', 'Individual Wooden Wardrobes', 'Air Cooler', 'Study Tables'],
    rules: ['Curfew 10:00 PM', 'Female guests only', 'Mess timings strictly followed'],
    reviews: [
      {
        id: 'rev-02',
        studentId: 'stu-77',
        studentName: 'Priya Joshi',
        studentCollege: 'Marwadi University (Pharmacy)',
        studentCollegeEmailDomain: 'marwadiuniversity.ac.in',
        isConfirmedStay: true,
        stayDurationMonths: 8,
        rating: 5,
        comment: 'Felt like second home in Rajkot. Kathiyawadi food taste is homelike and warden maam is very caring.',
        pros: ['Healthy food', 'Safe neighborhood', 'No hidden electricity billing'],
        cons: ['10 PM gate close is firm'],
        createdAt: '2026-10-20T14:10:00Z'
      }
    ],
    aiReviewSummary: {
      summary: 'High safety rating (96/100) with proven quality food. Ideal for outstation female students moving to Rajkot.',
      positiveHighlights: ['Home-style meals', 'Guard & Biometric entry', 'Owner is medical professional'],
      potentialDrawbacks: ['Strict 10 PM curfew requires prior warden intimation for lab late work'],
      sentimentScore: 94
    },
    createdAt: '2026-11-04T12:00:00Z',
    isAvailable: true
  },
  {
    id: 'gh-003',
    title: 'SUSPICIOUS LISTING - Royal Luxury 1BHK Student Studio',
    slug: 'suspicious-listing-royal-luxury-1bhk',
    description: 'Ultra luxury furnished flat with AC, smart TV, swimming pool access. Call immediately for token advance to lock room.',
    roomType: '1bhk',
    genderPreference: 'any',
    address: 'Near Marwadi Gate 2, Morbi Road, Rajkot',
    neighborhood: 'Morbi Road',
    city: 'Rajkot',
    latitude: 22.3600,
    longitude: 70.8100,
    images: [
      {
        id: 'img-301',
        url: CURATED_ROOM_IMAGES[9],
        isLiveCaptured: false,
        capturedAt: '2025-01-01T00:00:00Z',
        latitude: 19.0760,
        longitude: 72.8777,
        distanceFromListingMeters: 380000,
        perceptualHash: 'f0e1d2c3b4a59687',
        reverseSearchMatchFound: true,
        deviceMeta: 'Stock Web Upload (Scraped)'
      }
    ],
    ownerId: 'own-broker-99',
    ownerName: 'Rajkot Property Hub (Disguised Broker)',
    ownerPhone: '+91 99988 77766',
    ownerMaskedPhone: '+91 99988 •••••',
    isOwnerIdVerified: false,
    brokerPhoneWarning: true,
    phoneListingOccurrences: 7,
    pricing: {
      baseRent: 15500,
      electricityEstimate: 2000,
      electricityBillingType: 'per_unit_submeter',
      foodCost: 0,
      maintenance: 1500,
      waterAndWifi: 800,
      securityDeposit: 45000,
      depositMonths: 3,
      totalMonthlyEstimated: 19800,
      averageNeighborhoodRent: 10500,
      priceFairnessRatio: 1.88,
      isOverpricedFlag: true
    },
    commute: {
      collegeId: 'mu-rajkot',
      collegeName: 'Marwadi University Rajkot',
      distanceKm: 2.8,
      walkingMinutes: 34,
      busMinutes: 14,
      busFareInr: 15,
      autoMinutes: 8,
      autoFareInr: 60,
      nightSafetyScore: 62,
      nightLightingNotes: 'Isolated service lane with limited street lamps after 10 PM.',
      nearbyEssentials: {
        messCountWithin500m: 1,
        nearestPharmacyMinutes: 8,
        nearestAtmMeters: 650,
        laundryAvailableNearby: false,
        hospitalWithin2Km: 'Civil Hospital Rajkot (7.5 km)'
      }
    },
    verification: {
      id: 'ver-003',
      verifierId: 'sen-01',
      verifierName: 'Kavya Shah',
      verifierBranch: 'B.Tech CSE',
      verifierBatch: 'MU 2023-27',
      visitedAt: '2026-11-02T10:00:00Z',
      videoWalkthroughUrl: '',
      videoDurationSec: 0,
      checklist: {
        waterSupply24x7: false,
        wifiSpeedTestedMbps: 0,
        properVentilationSunlight: false,
        curfewStrictness: 'none',
        cleanlinessRating: 2,
        ownerAttitude: 'intrusive',
        powerBackupWorking: false
      },
      notes: 'FAILED VERIFICATION: The broker refused physical room inspection unless ₹2000 visiting charge was paid upfront.',
      status: 'rejected'
    },
    trustScore: {
      totalScore: 21,
      tier: 'Probation / Unverified',
      photoVerificationScore: 0,
      ownerIdAndHistoryScore: 0,
      seniorVerifierAuditScore: 0,
      reviewHistoryScore: 8,
      priceFairnessScore: 3,
      badges: [],
      flags: ['Broker Number Alert', 'Stock/Stolen Photo Warning', 'High Premium Rent', 'Visiting Fee Scam Attempt']
    },
    amenities: ['Air Conditioner', 'TV (Unverified)', 'Elevator'],
    rules: ['Brokerage mandatory 1 month rent', 'Token non-refundable'],
    reviews: [],
    aiReviewSummary: {
      summary: 'HIGH RISK WARNING: System flagged perceptual duplicate photo downloaded from stock catalog.',
      positiveHighlights: [],
      potentialDrawbacks: ['Bait-and-switch pricing', 'Non-refundable token demanded before physical visit', 'Broker pretending to be owner'],
      sentimentScore: 12
    },
    createdAt: '2026-11-01T15:00:00Z',
    isAvailable: false
  },
  {
    id: 'gh-004',
    title: 'Shiv Shakti Student Haven - Triple Sharing Budget Room',
    slug: 'shiv-shakti-triple-sharing-budget-mu',
    description: 'Affordable triple sharing room for first & second year MU students. Water cooler on each floor, quiet study room, zero broker charge.',
    roomType: 'triple_sharing',
    genderPreference: 'boys_only',
    address: 'Near Madhapar Chowk, Morbi Road, Rajkot',
    neighborhood: 'Madhapar Chowk',
    city: 'Rajkot',
    latitude: 22.3480,
    longitude: 70.7890,
    images: [
      {
        id: 'img-401',
        url: CURATED_ROOM_IMAGES[3],
        isLiveCaptured: true,
        capturedAt: '2026-11-06T15:40:00Z',
        latitude: 22.3481,
        longitude: 70.7889,
        distanceFromListingMeters: 18,
        perceptualHash: 'bc4170ea521098de',
        reverseSearchMatchFound: false,
        deviceMeta: 'Realme Narzo Live Camera'
      }
    ],
    ownerId: 'own-003',
    ownerName: 'Bhagwandas Prajapati',
    ownerPhone: '+91 94281 33201',
    ownerMaskedPhone: '+91 94281 •••••',
    isOwnerIdVerified: true,
    brokerPhoneWarning: false,
    phoneListingOccurrences: 1,
    pricing: {
      baseRent: 3500,
      electricityEstimate: 300,
      electricityBillingType: 'fixed_monthly',
      foodCost: 2500,
      maintenance: 100,
      waterAndWifi: 0,
      securityDeposit: 3500,
      depositMonths: 1,
      totalMonthlyEstimated: 6400,
      averageNeighborhoodRent: 7800,
      priceFairnessRatio: 0.82,
      isOverpricedFlag: false
    },
    commute: {
      collegeId: 'mu-rajkot',
      collegeName: 'Marwadi University Rajkot',
      distanceKm: 2.1,
      walkingMinutes: 24,
      busMinutes: 8,
      busFareInr: 10,
      autoMinutes: 6,
      autoFareInr: 35,
      nightSafetyScore: 90,
      nightLightingNotes: 'Safe residential pocket with constant student transit to Marwadi University.',
      nearbyEssentials: {
        messCountWithin500m: 7,
        nearestPharmacyMinutes: 3,
        nearestAtmMeters: 220,
        laundryAvailableNearby: true,
        hospitalWithin2Km: 'Local Community Health Centre (1.1 km)'
      }
    },
    verification: {
      id: 'ver-004',
      verifierId: 'sen-03',
      verifierName: 'Aman Verma',
      verifierBranch: 'B.Tech Civil, Final Year',
      verifierBatch: 'MU 2023-27',
      visitedAt: '2026-11-07T14:00:00Z',
      videoWalkthroughUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4198-large.mp4',
      videoDurationSec: 55,
      checklist: {
        waterSupply24x7: true,
        wifiSpeedTestedMbps: 80,
        properVentilationSunlight: true,
        curfewStrictness: 'flexible',
        cleanlinessRating: 4,
        foodTasteRating: 4,
        ownerAttitude: 'friendly',
        powerBackupWorking: true
      },
      notes: 'Checked beds and cupboards. Honest pricing, electricity is flat ₹300 per bed, no meter manipulation.',
      status: 'verified'
    },
    trustScore: {
      totalScore: 91,
      tier: 'Diamond Verified',
      photoVerificationScore: 24,
      ownerIdAndHistoryScore: 20,
      seniorVerifierAuditScore: 22,
      reviewHistoryScore: 12,
      priceFairnessScore: 15,
      badges: ['GPS Live Captured', 'Direct Owner (No Broker)', 'Senior Student Approved', 'Fair Price Certified'],
      flags: []
    },
    amenities: ['Individual Steel Almirah', 'Fixed Electricity Cap', 'Solar Water Heater', 'RO Water', 'Study Lamp Socket'],
    rules: ['Smoking strictly prohibited', 'Shared cleaning rotation'],
    reviews: [
      {
        id: 'rev-04',
        studentId: 'stu-61',
        studentName: 'Nitin Patel',
        studentCollege: 'Marwadi University',
        studentCollegeEmailDomain: 'marwadiuniversity.ac.in',
        isConfirmedStay: true,
        stayDurationMonths: 12,
        rating: 5,
        comment: 'Great budget place if you want to keep costs under 6.5k all inclusive at MU. Prajapati uncle is very honest.',
        pros: ['Under 6.5k total cost', 'Very safe area', 'Nice roommates'],
        cons: ['Shared bathroom with 3 guys'],
        createdAt: '2026-09-12T10:00:00Z'
      }
    ],
    aiReviewSummary: {
      summary: 'Top pick for budget-conscious students. Guaranteed no hidden electricity bills with flat fixed rate cap.',
      positiveHighlights: ['All-in monthly budget under ₹6,500', 'Direct landlord', 'Tested WiFi'],
      potentialDrawbacks: ['Triple sharing has shared morning washroom queue'],
      sentimentScore: 92
    },
    createdAt: '2026-11-03T11:00:00Z',
    isAvailable: true
  },
  {
    id: 'gh-005',
    title: 'Rajkot North Co-Living Flatshare - 1RK with Private Kitchenette',
    slug: 'rajkot-north-co-living-1rk-mu',
    description: 'Independent 1RK for master students or research scholars who need pin-drop silence for thesis preparation. High speed dedicated mesh router.',
    roomType: '1rk',
    genderPreference: 'co_living',
    address: 'Near Green Land Chowkadi, Morbi Road, Rajkot',
    neighborhood: 'Green Land Chowkadi',
    city: 'Rajkot',
    latitude: 22.3580,
    longitude: 70.8150,
    images: [
      {
        id: 'img-501',
        url: CURATED_ROOM_IMAGES[4],
        isLiveCaptured: true,
        capturedAt: '2026-11-08T09:30:00Z',
        latitude: 22.3581,
        longitude: 70.8151,
        distanceFromListingMeters: 12,
        perceptualHash: '8b7f1412e0915a3c',
        reverseSearchMatchFound: false,
        deviceMeta: 'Pixel 8 Pro In-App Capture'
      }
    ],
    ownerId: 'own-004',
    ownerName: 'Vipul Mehta (Architect)',
    ownerPhone: '+91 98980 55432',
    ownerMaskedPhone: '+91 98980 •••••',
    isOwnerIdVerified: true,
    brokerPhoneWarning: false,
    phoneListingOccurrences: 1,
    pricing: {
      baseRent: 8500,
      electricityEstimate: 700,
      electricityBillingType: 'per_unit_submeter',
      foodCost: 0,
      maintenance: 300,
      waterAndWifi: 0,
      securityDeposit: 9000,
      depositMonths: 1,
      totalMonthlyEstimated: 9500,
      averageNeighborhoodRent: 10500,
      priceFairnessRatio: 0.90,
      isOverpricedFlag: false
    },
    commute: {
      collegeId: 'mu-rajkot',
      collegeName: 'Marwadi University Rajkot',
      distanceKm: 1.6,
      walkingMinutes: 18,
      busMinutes: 6,
      busFareInr: 10,
      autoMinutes: 5,
      autoFareInr: 30,
      nightSafetyScore: 92,
      nightLightingNotes: 'Busy chowkadi area with student cafes open late.',
      nearbyEssentials: {
        messCountWithin500m: 8,
        nearestPharmacyMinutes: 2,
        nearestAtmMeters: 180,
        laundryAvailableNearby: true,
        hospitalWithin2Km: 'Synergy Hospital (2.5 km)'
      }
    },
    verification: {
      id: 'ver-005',
      verifierId: 'sen-01',
      verifierName: 'Kavya Shah',
      verifierBranch: 'B.Tech CSE',
      verifierBatch: 'MU 2023-27',
      visitedAt: '2026-11-09T11:00:00Z',
      videoWalkthroughUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4198-large.mp4',
      videoDurationSec: 60,
      checklist: {
        waterSupply24x7: true,
        wifiSpeedTestedMbps: 220,
        properVentilationSunlight: true,
        curfewStrictness: 'none',
        cleanlinessRating: 5,
        ownerAttitude: 'friendly',
        powerBackupWorking: true
      },
      notes: 'Amazing private space. Induction stove and mini-fridge provided. Owner lives in adjoining bungalow and respects student privacy.',
      status: 'verified'
    },
    trustScore: {
      totalScore: 93,
      tier: 'Diamond Verified',
      photoVerificationScore: 25,
      ownerIdAndHistoryScore: 20,
      seniorVerifierAuditScore: 24,
      reviewHistoryScore: 11,
      priceFairnessScore: 13,
      badges: ['GPS Live Captured', 'Direct Owner (No Broker)', 'Senior Student Approved', 'Fair Price Certified'],
      flags: []
    },
    amenities: ['Induction Cooktop', 'Mini Fridge', 'Private Washroom', 'Inverter Power Backup', 'Ergonomic Chair & Desk', 'Balcony'],
    rules: ['No loud parties after midnight', 'Maintain kitchen hygiene'],
    reviews: [
      {
        id: 'rev-05',
        studentId: 'stu-19',
        studentName: 'Aditya Swaminathan',
        studentCollege: 'Marwadi University (M.Tech)',
        studentCollegeEmailDomain: 'marwadiuniversity.ac.in',
        isConfirmedStay: true,
        stayDurationMonths: 10,
        rating: 5,
        comment: 'Completed my whole GATE and placement prep here in absolute peace. 200 Mbps internet without a single disconnection.',
        pros: ['Complete privacy', 'Mesh WiFi', 'Cooking permitted'],
        cons: ['Self cleaning'],
        createdAt: '2026-10-01T11:00:00Z'
      }
    ],
    aiReviewSummary: {
      summary: 'Ideal independent room for focused scholars. Verified high-speed connectivity and direct owner lease agreement near MU.',
      positiveHighlights: ['Zero curfew restrictions', 'Private kitchenette', 'High night safety score (92)'],
      potentialDrawbacks: ['Higher base rent than sharing rooms'],
      sentimentScore: 95
    },
    createdAt: '2026-11-02T16:00:00Z',
    isAvailable: true
  }
];

// Generate listings 6-20 around Marwadi University Rajkot
const NEIGHBORHOODS = ['Gauridad', 'Bedi Bypass', 'Morbi Highway', 'Madhapar Chowk', 'Green Land Chowkadi', '150 Feet Ring Road', 'Kuvadva Road'];
const ROOM_TYPES: Listing['roomType'][] = ['single', 'double_sharing', 'triple_sharing', '1rk', 'flat_share'];
const GENDERS: Listing['genderPreference'][] = ['boys_only', 'girls_only', 'co_living'];

for (let i = 6; i <= 20; i++) {
  const isSuspicious = i === 13 || i === 17;
  const neighborhood = NEIGHBORHOODS[(i * 3) % NEIGHBORHOODS.length];
  const roomType = ROOM_TYPES[i % ROOM_TYPES.length];
  const gender = GENDERS[i % GENDERS.length];
  const baseRent = roomType === 'single' ? 6200 + (i % 3) * 400 : roomType === 'double_sharing' ? 4500 + (i % 4) * 350 : 3400 + (i % 3) * 250;
  const foodCost = i % 2 === 0 ? 2800 : 0;
  const distanceKm = Number((0.4 + (i * 0.16)).toFixed(2));
  const walkingMin = Math.round(distanceKm * 12);
  const autoMin = Math.max(2, Math.round(distanceKm * 3));
  const isOwnerVerified = !isSuspicious;
  const phoneOccurrences = isSuspicious ? (i === 13 ? 5 : 8) : 1;

  const pricing: Listing['pricing'] = {
    baseRent,
    electricityEstimate: 450,
    electricityBillingType: 'per_unit_submeter',
    foodCost,
    maintenance: 200,
    waterAndWifi: 0,
    securityDeposit: baseRent,
    depositMonths: isSuspicious ? 3 : 1,
    totalMonthlyEstimated: baseRent + 450 + foodCost + 200,
    averageNeighborhoodRent: baseRent + 350,
    priceFairnessRatio: isSuspicious ? 1.45 : Number((baseRent / (baseRent + 350)).toFixed(2)),
    isOverpricedFlag: isSuspicious
  };

  const images: Listing['images'] = [
    {
      id: `img-${i}01`,
      url: CURATED_ROOM_IMAGES[(i - 1) % CURATED_ROOM_IMAGES.length],
      isLiveCaptured: !isSuspicious,
      capturedAt: '2026-11-07T12:00:00Z',
      latitude: 22.3688 + (i * 0.0012) * (i % 2 === 0 ? 1 : -1),
      longitude: 70.8022 + (i * 0.0014) * (i % 2 === 0 ? 1 : -1),
      distanceFromListingMeters: isSuspicious ? 12000 : 25,
      perceptualHash: isSuspicious ? 'ffff0000ffff0000' : `hash_${i}_${roomType}`,
      reverseSearchMatchFound: isSuspicious,
      deviceMeta: isSuspicious ? 'Web Scraped' : 'In-App Geotagged Camera'
    }
  ];

  const verification: Listing['verification'] = {
    id: `ver-${i}`,
    verifierId: 'sen-01',
    verifierName: 'Kavya Shah',
    verifierBranch: 'B.Tech CSE, Final Year',
    verifierBatch: 'Marwadi University 2023-27',
    visitedAt: '2026-11-06T15:00:00Z',
    videoWalkthroughUrl: isSuspicious ? undefined : 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-4198-large.mp4',
    videoDurationSec: isSuspicious ? 0 : 54,
    checklist: {
      waterSupply24x7: !isSuspicious,
      wifiSpeedTestedMbps: isSuspicious ? 10 : 95,
      properVentilationSunlight: true,
      curfewStrictness: gender === 'girls_only' ? 'strict_10pm' : 'flexible',
      cleanlinessRating: isSuspicious ? 2 : 4,
      foodTasteRating: foodCost > 0 ? 4 : undefined,
      ownerAttitude: isSuspicious ? 'intrusive' : 'friendly',
      powerBackupWorking: !isSuspicious
    },
    notes: isSuspicious ? 'Flagged broker mismatch on visit' : 'Verified in-person on MU campus cycle run.',
    status: isSuspicious ? 'rejected' : 'verified'
  };

  const reviews: Listing['reviews'] = isSuspicious ? [] : [
    {
      id: `rev-${i}01`,
      studentId: `stu-${i}`,
      studentName: `Student ${i} (MU)`,
      studentCollege: 'Marwadi University',
      studentCollegeEmailDomain: 'marwadiuniversity.ac.in',
      isConfirmedStay: true,
      stayDurationMonths: 6,
      rating: 4,
      comment: 'Very reasonable stay. Direct landlord and good peaceful studying vibe near MU.',
      pros: ['Close to food mess', 'Honest deposit refund'],
      cons: ['Laundry drying space is shared'],
      createdAt: '2026-10-18T10:00:00Z'
    }
  ];

  const trustScore = calculateComprehensiveTrustScore({
    photos: images,
    isOwnerIdVerified: isOwnerVerified,
    phoneListingOccurrences: phoneOccurrences,
    seniorVerification: verification,
    reviews,
    pricing
  });

  INITIAL_LISTINGS.push({
    id: `gh-${String(i).padStart(3, '0')}`,
    title: `${neighborhood} ${roomType.replace('_', ' ').toUpperCase()} - Student Friendly Home #${i}`,
    slug: `${neighborhood.toLowerCase()}-${roomType}-student-home-${i}`,
    description: `Comfortable and clean room located in ${neighborhood}, Rajkot. Direct interaction with owner, verified Marwadi University student community.`,
    roomType,
    genderPreference: gender,
    address: `Street ${i}, Near ${neighborhood}, Rajkot`,
    neighborhood,
    city: 'Rajkot',
    latitude: 22.3688 + (i * 0.0011) * (i % 2 === 0 ? 1 : -1),
    longitude: 70.8022 + (i * 0.0013) * (i % 2 === 0 ? 1 : -1),
    images,
    ownerId: `own-${String(i).padStart(3, '0')}`,
    ownerName: isSuspicious ? `Rajkot Rental Agent ${i}` : `Landlord Jadeja (${neighborhood})`,
    ownerPhone: `+91 9898${i} 1234${i % 10}`,
    ownerMaskedPhone: `+91 9898${i} •••••`,
    isOwnerIdVerified: isOwnerVerified,
    brokerPhoneWarning: isSuspicious,
    phoneListingOccurrences: phoneOccurrences,
    pricing,
    commute: {
      collegeId: 'mu-rajkot',
      collegeName: 'Marwadi University Rajkot',
      distanceKm,
      walkingMinutes: walkingMin,
      busMinutes: Math.max(3, Math.round(walkingMin / 3)),
      busFareInr: 10,
      autoMinutes: autoMin,
      autoFareInr: Math.max(25, Math.round(distanceKm * 20)),
      nightSafetyScore: isSuspicious ? 58 : 88 + (i % 10),
      nightLightingNotes: 'Adequate lighting along arterial university bus route.',
      nearbyEssentials: {
        messCountWithin500m: 3 + (i % 4),
        nearestPharmacyMinutes: 3,
        nearestAtmMeters: 200,
        laundryAvailableNearby: true,
        hospitalWithin2Km: 'Local Health Centre (1 km)'
      }
    },
    verification,
    trustScore,
    amenities: ['Wi-Fi', 'Bed & Mattress', 'Study Table', 'RO Water', 'Hot Geyser'],
    rules: ['Respect study silence after 11 PM', 'No subletting to brokers'],
    reviews,
    aiReviewSummary: {
      summary: isSuspicious ? 'High risk broker ring flagged. Caution advised.' : 'Reliable student residency with confirmed amenities and senior approval near MU.',
      positiveHighlights: isSuspicious ? [] : ['Authentic owner', 'Tested WiFi speeds', 'Clear all-in monthly bills'],
      potentialDrawbacks: isSuspicious ? ['Broker duplicate phone pattern', 'Overpriced security deposit'] : ['Occasional water tanker during peak summer'],
      sentimentScore: isSuspicious ? 15 : 85 + (i % 12)
    },
    createdAt: '2026-11-06T10:00:00Z',
    isAvailable: !isSuspicious
  });
}

export const SAMPLE_ROOMMATES: RoommateProfile[] = [
  {
    id: 'rm-01',
    name: 'Devang Pandya',
    gender: 'male',
    college: 'Marwadi University Rajkot',
    year: '2nd Year',
    branch: 'Computer Engineering',
    budgetMax: 6500,
    preferredArea: 'Gauridad / Morbi Road',
    bio: 'Coding enthusiast at MU, looking for a roommate who respects quiet hours during exams. Pure vegetarian.',
    quiz: {
      sleepTime: 'night_owl',
      studyHabits: 'pin_drop_silence',
      diet: 'strictly_vegetarian',
      smokingDrinking: 'strictly_no',
      musicPreference: 'headphones_only',
      cleanlinessStandard: 'daily_cleaner'
    }
  },
  {
    id: 'rm-02',
    name: 'Ananya Roy',
    gender: 'female',
    college: 'Marwadi University Rajkot',
    year: '3rd Year',
    branch: 'Pharmacy',
    budgetMax: 7500,
    preferredArea: 'Bedi Bypass',
    bio: 'Looking for a flatmate in a 2BHK near MU. I love keeping plants, early morning runner, non-smoker.',
    quiz: {
      sleepTime: 'early_bird',
      studyHabits: 'group_study',
      diet: 'veg_egg',
      smokingDrinking: 'strictly_no',
      musicPreference: 'low_speaker',
      cleanlinessStandard: 'daily_cleaner'
    }
  },
  {
    id: 'rm-03',
    name: 'Tushar Mehta',
    gender: 'male',
    college: 'Marwadi University Rajkot',
    year: '1st Year',
    branch: 'Information Technology',
    budgetMax: 4500,
    preferredArea: 'Madhapar Chowk',
    bio: 'Outstation student from Ahmedabad studying at MU, looking for budget double or triple sharing near college.',
    quiz: {
      sleepTime: 'flexible',
      studyHabits: 'background_music',
      diet: 'strictly_vegetarian',
      smokingDrinking: 'strictly_no',
      musicPreference: 'headphones_only',
      cleanlinessStandard: 'moderate'
    }
  },
  {
    id: 'rm-04',
    name: 'Riya Saxena',
    gender: 'female',
    college: 'Marwadi University Rajkot',
    year: '2nd Year',
    branch: 'Management Studies',
    budgetMax: 6000,
    preferredArea: 'Morbi Road',
    bio: 'Need a chill roommate. I study in MU central library most of the day, just need peaceful sleeping space.',
    quiz: {
      sleepTime: 'night_owl',
      studyHabits: 'pin_drop_silence',
      diet: 'non_veg',
      smokingDrinking: 'occasional',
      musicPreference: 'headphones_only',
      cleanlinessStandard: 'moderate'
    }
  }
];

export const SAMPLE_SCAM_REPORTS: ScamReport[] = [
  {
    id: 'rep-01',
    listingId: 'gh-003',
    listingTitle: 'SUSPICIOUS LISTING - Royal Luxury 1BHK Student Studio',
    reporterId: 'stu-99',
    reporterRole: 'student',
    reason: 'advance_demanded',
    description: 'Broker asked for ₹2,500 visiting fee on GPay before giving address near Marwadi University. When refused, he abused on call.',
    reportedPhone: '+91 99988 77766',
    status: 'confirmed_banned',
    createdAt: '2026-11-09T18:20:00Z'
  },
  {
    id: 'rep-02',
    listingId: 'gh-003',
    listingTitle: 'SUSPICIOUS LISTING - Royal Luxury 1BHK Student Studio',
    reporterId: 'sen-01',
    reporterRole: 'senior_verifier',
    reason: 'fake_photos',
    description: 'Image hash matches scraped Pinterest luxury loft in Bandra, Mumbai. Property does not exist in Rajkot.',
    reportedPhone: '+91 99988 77766',
    status: 'confirmed_banned',
    createdAt: '2026-11-09T19:00:00Z'
  }
];
