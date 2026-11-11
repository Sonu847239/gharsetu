-- GharSetu PostgreSQL Database Schema (Supabase compatible)
-- Provides multi-role authentication, listings, photo integrity hashes,
-- senior verifications, roommate preferences, and visit logs with parent mode.

-- 1. Colleges
CREATE TABLE IF NOT EXISTS colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    verified_email_domain VARCHAR(100) NOT NULL, -- e.g. svnit.ac.in
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users (Student, Owner, Senior Verifier, Admin)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    college_email VARCHAR(255),
    is_college_email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(30) CHECK (role IN ('student', 'owner', 'senior_verifier', 'admin')) DEFAULT 'student',
    avatar_url TEXT,
    college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
    is_owner_gov_id_verified BOOLEAN DEFAULT FALSE,
    senior_reward_points INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Listings
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    room_type VARCHAR(50) CHECK (room_type IN ('single', 'double_sharing', 'triple_sharing', '1rk', '1bhk', 'flat_share')),
    gender_preference VARCHAR(30) CHECK (gender_preference IN ('boys_only', 'girls_only', 'co_living', 'any')),
    address TEXT NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Transparent All-in Monthly Pricing
CREATE TABLE IF NOT EXISTS listing_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID UNIQUE NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    base_rent NUMERIC(10, 2) NOT NULL,
    electricity_estimate NUMERIC(10, 2) DEFAULT 0,
    electricity_billing_type VARCHAR(30) DEFAULT 'per_unit_submeter',
    food_cost NUMERIC(10, 2) DEFAULT 0,
    maintenance NUMERIC(10, 2) DEFAULT 0,
    water_and_wifi NUMERIC(10, 2) DEFAULT 0,
    security_deposit NUMERIC(10, 2) NOT NULL,
    deposit_months INT DEFAULT 1,
    total_monthly_estimated NUMERIC(10, 2) NOT NULL,
    average_neighborhood_rent NUMERIC(10, 2) NOT NULL,
    price_fairness_ratio NUMERIC(5, 2) NOT NULL,
    is_overpriced_flag BOOLEAN DEFAULT FALSE
);

-- 5. Live-Captured Photos with GPS & Perceptual Hashing
CREATE TABLE IF NOT EXISTS listing_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    is_live_captured BOOLEAN DEFAULT TRUE,
    captured_at TIMESTAMP WITH TIME ZONE NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    distance_from_listing_meters INT NOT NULL,
    perceptual_hash VARCHAR(64) NOT NULL,
    reverse_search_match_found BOOLEAN DEFAULT FALSE,
    device_meta TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Senior Student Walkthrough Verification & Audits
CREATE TABLE IF NOT EXISTS senior_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID UNIQUE NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    verifier_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    visited_at TIMESTAMP WITH TIME ZONE NOT NULL,
    video_walkthrough_url TEXT,
    video_duration_sec INT DEFAULT 60,
    water_supply_24x7 BOOLEAN DEFAULT TRUE,
    wifi_speed_tested_mbps INT DEFAULT 50,
    proper_ventilation_sunlight BOOLEAN DEFAULT TRUE,
    curfew_strictness VARCHAR(30) DEFAULT 'flexible',
    cleanliness_rating INT CHECK (cleanliness_rating BETWEEN 1 AND 5),
    power_backup_working BOOLEAN DEFAULT TRUE,
    owner_attitude VARCHAR(30) DEFAULT 'friendly',
    notes TEXT,
    status VARCHAR(20) DEFAULT 'verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Commute Intelligence & Safety Cache
CREATE TABLE IF NOT EXISTS commute_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    distance_km NUMERIC(5, 2) NOT NULL,
    walking_minutes INT NOT NULL,
    bus_minutes INT NOT NULL,
    bus_fare_inr NUMERIC(6, 2) DEFAULT 10,
    auto_minutes INT NOT NULL,
    auto_fare_inr NUMERIC(6, 2) DEFAULT 40,
    night_safety_score INT CHECK (night_safety_score BETWEEN 0 AND 100),
    night_lighting_notes TEXT,
    nearby_mess_count INT DEFAULT 4,
    nearest_pharmacy_minutes INT DEFAULT 3,
    nearest_atm_meters INT DEFAULT 200,
    laundry_available_nearby BOOLEAN DEFAULT TRUE,
    hospital_within_2km VARCHAR(200)
);

-- 8. Reviews (Restricted to verified college emails & verified stays)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_confirmed_stay BOOLEAN DEFAULT TRUE,
    stay_duration_months INT DEFAULT 6,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    pros JSONB DEFAULT '[]',
    cons JSONB DEFAULT '[]',
    owner_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Visit Bookings with Parent Safety Links
CREATE TABLE IF NOT EXISTS visit_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    slot_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(30) DEFAULT 'pending',
    parent_safety_token VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Roommate Compatibility Profiles & Lifestyle Quiz
CREATE TABLE IF NOT EXISTS roommate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    gender VARCHAR(20) NOT NULL,
    year_of_study VARCHAR(20) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    budget_max NUMERIC(10, 2) NOT NULL,
    preferred_area VARCHAR(100),
    bio TEXT,
    sleep_time VARCHAR(30) NOT NULL,
    study_habits VARCHAR(30) NOT NULL,
    diet VARCHAR(30) NOT NULL,
    smoking_drinking VARCHAR(30) NOT NULL,
    music_preference VARCHAR(30) NOT NULL,
    cleanliness_standard VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Scam Shield, Blacklists & Phone Registry (Broker Ring Detection)
CREATE TABLE IF NOT EXISTS scam_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    reported_phone VARCHAR(30) NOT NULL,
    status VARCHAR(30) DEFAULT 'investigating',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS broker_phone_registry (
    phone VARCHAR(30) PRIMARY KEY,
    total_listings_count INT DEFAULT 1,
    is_blacklisted BOOLEAN DEFAULT FALSE,
    reason TEXT,
    last_detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

