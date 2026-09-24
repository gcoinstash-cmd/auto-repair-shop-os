-- ============================================================
-- AUTO REPAIR SHOP OS — Seed Data
-- Ghost Factory™ Stage 3: Brain Gate
-- ============================================================

-- Seed: Bay Status
INSERT INTO bay_status (bay_number, bay_label, status, technician_name, vehicle_description) VALUES
(1, 'Bay 1', 'in-use', 'Marcus T.', 'Porsche 911 GT3 RS — ECU Calibration'),
(2, 'Bay 2', 'in-use', 'Derrick L.', 'BMW M4 Competition — Chassis Balancing'),
(3, 'Bay 3', 'open', NULL, NULL),
(4, 'Bay 4', 'in-use', 'Sofia R.', 'Ferrari 488 Pista — Ceramic Coating'),
(5, 'Bay 5', 'open', NULL, NULL)
ON CONFLICT (bay_number) DO NOTHING;

-- Seed: Services Catalog
INSERT INTO services_catalog (id, name, category, estimate_price, duration, description) VALUES
('fluid-service', 'Precision Fluid & Safety Audit', 'maintenance', 165, '1 Hour', 'High-grade endurance engine oil change, premium filter, multi-point safety analysis.'),
('ecu-tuning', 'Stage 1/2 ECU Calibration & Dyno', 'tuning', 799, '3.5 Hours', 'Custom fuel-map dyno optimization, ignition timing, throttle response amplification.'),
('telemetry-diag', 'OEM-Level Telemetry & Diagnostics', 'diagnostics', 185, '1.5 Hours', 'Bespoke diagnostic sweeps with live sensor sweep capture and CAN-bus system reset.'),
('paint-ceramic', '9H Multi-Coat Paint Correction & Ceramic', 'detailing', 650, '6 Hours', 'Three-stage orbital paint correction with 9H ultra-hydrophobic ceramic coating.'),
('chassis-balance', 'Chassis Tuning & Corner Balancing', 'tuning', 420, '2.5 Hours', 'Precision coilover height calibration, corner weight distribution, performance alignment.'),
('track-prep', 'Track-Day Preparation Package', 'diagnostics', 280, '2 Hours', 'High-temp brake fluid flush, tire pressure tuning, component stress audit, telemetry check.')
ON CONFLICT (id) DO NOTHING;

-- Seed: Service Bookings
INSERT INTO service_bookings (ticket_id, customer_name, customer_email, customer_phone, vehicle_make, vehicle_model, vehicle_year, service_id, service_name, estimated_price, status, appointment_date) VALUES
('TKT-2026-001', 'Marcus Chen', 'marcus@example.com', '(310) 555-0101', 'Porsche', '911 GT3 RS', 2024, 'ecu-tuning', 'Stage 1/2 ECU Calibration & Dyno', 799, 'in-progress', NOW() - INTERVAL '2 hours'),
('TKT-2026-002', 'Layla Hassan', 'layla@example.com', '(424) 555-0182', 'BMW', 'M4 Competition', 2023, 'fluid-service', 'Precision Fluid & Safety Audit', 165, 'completed', NOW() - INTERVAL '4 hours'),
('TKT-2026-003', 'Derek Owens', 'derek@example.com', '(323) 555-0193', 'Ferrari', '488 Pista', 2022, 'track-prep', 'Track-Day Preparation Package', 280, 'pending', NOW() + INTERVAL '2 hours'),
('TKT-2026-004', 'Sofia Reyes', 'sofia@example.com', '(310) 555-0204', 'Lamborghini', 'Huracán EVO', 2023, 'paint-ceramic', '9H Paint Correction & Ceramic', 650, 'pending', NOW() + INTERVAL '4 hours'),
('TKT-2026-005', 'James Kota', 'james@example.com', '(424) 555-0215', 'Aston Martin', 'Vantage', 2024, 'chassis-balance', 'Chassis Tuning & Corner Balancing', 420, 'completed', NOW() - INTERVAL '1 hour')
ON CONFLICT (ticket_id) DO NOTHING;

-- Seed: Customer Reviews
INSERT INTO customer_reviews (customer_name, rating, review_text, service_name, verified) VALUES
('Marcus Chen', 5, 'The ECU calibration on my GT3 RS is insane. Felt a completely different car on the highway. +38hp and the throttle response is razor sharp. Highly recommend.', 'Stage 1/2 ECU Calibration & Dyno', true),
('Layla Hassan', 5, 'Super clean shop, professional staff. The fluid audit was thorough and they flagged an issue I had no idea about. Saved me from a blown engine.', 'Precision Fluid & Safety Audit', true),
('James Kota', 5, 'Corner balancing transformed my Vantage. Corners feel planted and steering is precise. Will be back for the track package before my next event.', 'Chassis Tuning & Corner Balancing', true),
('Derek Owens', 5, 'Best track prep in Los Angeles. They know exotics, the techs actually own performance cars. My 488 is dialed in perfectly for the track season.', 'Track-Day Preparation Package', true)
ON CONFLICT DO NOTHING;
