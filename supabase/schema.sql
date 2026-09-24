-- ============================================================
-- AUTO REPAIR SHOP OS — Supabase Schema (with RLS)
-- Ghost Factory™ Stage 3: Brain Gate
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- TABLE: service_bookings
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  estimated_price NUMERIC(10, 2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in-progress', 'ready', 'completed', 'cancelled')),
  notes TEXT,
  appointment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert bookings" ON service_bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read all bookings" ON service_bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update bookings" ON service_bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- TABLE: bay_status
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bay_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bay_number INTEGER UNIQUE NOT NULL,
  bay_label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in-use', 'reserved', 'maintenance')),
  current_ticket_id TEXT,
  technician_name TEXT,
  vehicle_description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE bay_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read bay status" ON bay_status
  FOR SELECT USING (true);

CREATE POLICY "Admins can update bay status" ON bay_status
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- TABLE: services_catalog
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  estimate_price NUMERIC(10, 2),
  duration TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE services_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read services" ON services_catalog
  FOR SELECT USING (true);

-- ------------------------------------------------------------
-- TABLE: customer_reviews
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customer_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  service_name TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read verified reviews" ON customer_reviews
  FOR SELECT USING (verified = true);

CREATE POLICY "Admins can manage reviews" ON customer_reviews
  FOR ALL USING (auth.role() = 'authenticated');
