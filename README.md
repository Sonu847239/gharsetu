# GharSetu (घरसेतु)
### PG & Room Finder for Outstation Students near Marwadi University (MU Rajkot)
**Core Philosophy:** *"Proof, not promises."*

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Tunnel-F38020?logo=cloudflare)](https://cloudflare.com/)

---

## 🎯 The Problem
Every academic year, thousands of outstation students relocate to university towns like **Rajkot** to join **Marwadi University (MU)** and colleges along the Morbi Highway. They consistently face:
1. **Bait-and-Switch Broker Rings**: Stock interior photos scraped from Pinterest, fake Google reviews, and non-refundable ₹1,000–₹3,000 "visiting charges" demanded before revealing room locations.
2. **Hidden Charge Shocks**: Rent quoted at ₹4,000/month abruptly jumps to ₹8,500/month after commercial electricity sub-meter markups, undisclosed mess charges, and 3-month non-refundable security deposits.
3. **Unsafe Commutes & Subterranean Rooms**: Dark unlit alleyways with zero night route safety, rooms with no natural sunlight or ventilation, broken plumbing, or undisclosed strict 8 PM curfews.
4. **Parent Anxiety**: Parents hundreds of kilometers away have no verifiable proof of where their teenager is staying.

---

## 🛡️ The GharSetu Trust Engine

GharSetu replaces broker promises with cryptographic and peer-audited proof:

| Feature | How GharSetu Solves It |
| :--- | :--- |
| **Live-Capture Photo Verification** | Disables camera roll/gallery uploads. Landlords snap photos in-app with auto-imprinted GPS coordinates, ISO timestamps, and a 64-bit Average Perceptual Hash (`aHash`) checked against scraped broker image databases. |
| **Trust Score (0–100 Breakdown)** | Mathematical scoring across 5 factors: Photo Integrity (25%), Direct Owner ID (20%), Senior Student Audit (25%), Verified Reviews (15%), and Fair Rent Meter (15%). |
| **Fair Rent Meter** | Computes an **All-In Monthly Cost** (base rent + metered electricity + 3 daily meals + maintenance + deposit) and benchmarks against the local student neighborhood median. |
| **Senior Verifier System** | Verified seniors from Marwadi University physically inspect rooms, record a 60-second unfiltered walkthrough video, test WiFi speed, verify 24/7 water supply, and earn reward points. |
| **Commute Intelligence** | Direct walking, city bus, and auto transit times & fares to the **Marwadi University Campus Gate**, paired with a 0–100 Night Route Safety Score and nearby essentials (messes, ATMs, pharmacies). |
| **Roommate Matcher** | A 6-factor lifestyle quiz (sleep cycles, study silence, diet, smoking, room music) that computes peer compatibility before room booking. |
| **Scam Shield & Broker Ring Detector** | Monitors phone numbers across student listings. If a contact number appears across different landlords or neighborhoods, a **Broker Ring Warning** triggers automatically. |
| **Parent Safety Link** | Generates a read-only tokenized dashboard for parents showing campus distance, confirmed visit time slots, landlord ID check status, and route safety. |
| **Zero Image Failure Guarantee** | Features built-in vector room illustrations for seamless loading on slow mobile networks. |

---

## 📁 Repository Structure

```
gharsetu-app/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Home: Interactive Map + List split view, multi-filter hub
│   │   ├── listing/[id]/page.tsx     # Listing Detail: Trust breakdown, video tour, AI review digest
│   │   ├── owner/page.tsx            # Owner Dashboard: In-camera geotag capture, All-in cost builder
│   │   ├── verifier/page.tsx         # Senior Verifier Portal: Checklist audit, 60s video, reward points
│   │   ├── roommates/page.tsx        # Roommate Matcher: 6-question quiz & compatibility ranker
│   │   ├── admin/page.tsx            # Scam Shield: Broker phone ring detection & blacklist enforcement
│   │   ├── parent-view/[token]/      # Parent Safety Mode: Read-only visit schedule & route brief
│   │   ├── layout.tsx                # Global Shell & AppProvider
│   │   └── globals.css               # Tailwind styling
│   ├── components/
│   │   ├── Navbar.tsx                # Responsive navigation with 1-click Role Persona Switcher
│   │   ├── TrustBadge.tsx            # 0-100 Score badge with interactive proof factor breakdown
│   │   ├── RoomIllustration.tsx      # SVG room art preventing broken images on mobile
│   │   ├── CameraVerificationModal.tsx # In-app camera, GPS tagger & perceptual duplicate scanner
│   │   ├── FairRentMeter.tsx         # Itemized all-in living cost & area benchmark meter
│   │   ├── CommuteCard.tsx           # Walking/Bus/Auto times, night route safety & nearby essentials
│   │   ├── SeniorVerificationCard.tsx# 60s video tour player & senior student checklist
│   │   ├── InteractiveMapSplit.tsx   # SVG coordinate map anchored to Marwadi University campus
│   │   ├── ListingCard.tsx           # Room preview card with Trust badges and quick booking
│   │   ├── VisitBookingModal.tsx     # Visit scheduler, broker-free privacy lock & parent link
│   │   └── ScamReportModal.tsx       # Student scam reporting modal
│   ├── context/
│   │   └── AppContext.tsx            # Client state for listings, reports, and personas
│   ├── lib/
│   │   ├── trust-score.ts            # Mathematical Trust Score Algorithm (0-100)
│   │   ├── phash.ts                  # Perceptual image hashing (aHash) & Haversine distance
│   │   └── mock-data.ts              # 20 Seed listings around Marwadi University Rajkot
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces for listings, audits, and users
│   └── db/
│       └── schema.sql                # Supabase PostgreSQL relational schema
└── README.md
```

---

## 🧮 Trust Score Algorithm Specification (`src/lib/trust-score.ts`)

$$\text{Trust Score} = S_{\text{photo}} + S_{\text{owner}} + S_{\text{senior}} + S_{\text{reviews}} + S_{\text{fairness}}$$

1. **Photo Verification ($S_{\text{photo}}$, 0–25 pts):**
   - 10 pts: 100% live in-camera captures (zero gallery uploads).
   - 10 pts: Geolocation within 300 meters of property coordinates.
   - 5 pts: Perceptual hash collision clean (no stock/Pinterest matches).
2. **Owner Identity & Anti-Broker Shield ($S_{\text{owner}}$, 0–20 pts):**
   - 12 pts: Aadhaar/Government ID & utility bill verified.
   - 8 pts: Single residential property (penalized to 0 if contact appears in $\ge 3$ properties).
3. **Senior Verifier Physical Audit ($S_{\text{senior}}$, 0–25 pts):**
   - 10 pts: On-site audit by verified university senior.
   - 5 pts: 60-second raw walkthrough video submitted.
   - 10 pts: Verified checklist (24/7 water, WiFi $\ge 30$ Mbps, natural light, hygiene $\ge 4/5$).
4. **Verified Student Reviews ($S_{\text{reviews}}$, 0–15 pts):**
   - Gated to confirmed student stays with verified `@marwadiuniversity.ac.in` domain emails.
5. **Fair Rent Meter ($S_{\text{fairness}}$, 0–15 pts):**
   - Benchmarks all-in cost against the neighborhood student median. Penalizes hidden charge markups.

---

## 🚀 Quick Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/gharsetu.git
cd gharsetu/gharsetu-app

# Install dependencies
npm install

# Run the production build
npm run build

# Start the server
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎙️ 5-Slide Pitch Outline

### Slide 1: The Outstation Trap
- **Headline:** Moving to college shouldn't feel like navigating a minefield.
- **Problem:** Over 12M Indian students migrate for higher education annually. 74% report broker exploitation: stolen photos, bait-and-switch pricing, undisclosed utility charges, and fake review syndicates.
- **Visual:** Contrast of a glossy broker ad vs. a photo of the damp reality.

### Slide 2: The Core Differentiator — "Proof, Not Promises"
- **Headline:** Trust shouldn't be claimed; it must be calculated.
- **Solution:** GharSetu creates an un-gameable Trust Engine:
  - In-app live camera photos with GPS tags & reverse perceptual hashing.
  - Transparent All-In Monthly Rent meter with zero surprise bills.
  - Direct owner-student connection without middleman brokers.

### Slide 3: The Senior Verifier Network
- **Headline:** Seniors protecting juniors.
- **Mechanism:** Students from the same college campus physically visit properties, record a 60-second unfiltered walkthrough, and test water, WiFi, and ventilation.
- **Incentive:** Seniors earn micro-bounties and campus leadership badges while building a peer-verified housing safety net.

### Slide 4: Safety & Parent Peace of Mind
- **Headline:** Real-time protection for students, total transparency for families.
- **Features:**
  - Route Safety Scores for night commutes to campus.
  - One-tap Parent Safety Links sharing verified building location and visit slots.
  - Automated Broker Ring Scanners flagging reused contact numbers across the city.
  - Lifestyle compatibility quiz for matching harmonious roommates.

### Slide 5: Market Opportunity & Expansion
- **Market Size:** \$10B+ student housing and co-living market across tier-1, tier-2, and university towns in India (Rajkot, Surat, Kota, Pune, Delhi).
- **Revenue Model:**
  - Verified Landlord listing subscriptions (₹499/room/season).
  - Premium Parent Guarantee Protection & instant booking fee (₹199).
  - College campus partnerships for official off-campus accommodation portals.
- **Traction Hook:** Hyperlocal university rollout starting with **Marwadi University (MU Rajkot)**, expanding to 50 engineering & medical campuses nationwide.
