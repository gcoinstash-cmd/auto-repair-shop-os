# AUTO REPAIR SHOP OS — Supabase Setup Guide
**Ghost Factory™ | Stage 3: Brain Gate | 3-Minute Setup**

---

## Step 1 — Create Your Supabase Project (60 seconds)
1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name it: `auto-repair-shop-os`
3. Set a strong database password → **Create Project**
4. Copy your **Project URL** and **anon public key** from Settings → API

---

## Step 2 — Run the Schema (60 seconds)
1. In your Supabase dashboard → click **SQL Editor**
2. Paste the full contents of `supabase/schema.sql`
3. Click **Run** — creates 4 tables with Row Level Security:
   - `service_bookings` — customer appointments and status tracking
   - `bay_status` — live garage bay occupancy management
   - `services_catalog` — configurable service offerings
   - `customer_reviews` — verified social proof display

---

## Step 3 — Seed Mock Data (30 seconds)
1. In SQL Editor → open a new query tab
2. Paste the full contents of `supabase/seed.sql`
3. Click **Run** — inserts realistic demo data (5 bookings, 5 bays, 4 reviews)

---

## Step 4 — Wire Environment Variables (30 seconds)
Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Admin Demo Access
- **URL**: `https://auto-repair-shop-os.onrender.com/admin`
- **Passkey**: `autorepair2026`
- **1-Click Auto-Fill**: Click `[ 1-CLICK DEMO AUTO-FILL: autorepair2026 ]` button in the modal

---

## Tables Overview

| Table | Purpose | RLS |
|---|---|---|
| `service_bookings` | Customer appointments, vehicle info, status | Insert: public / Read+Update: admin |
| `bay_status` | Live garage bay occupancy | Read: public / Update: admin |
| `services_catalog` | Service menu with pricing | Read: public |
| `customer_reviews` | Verified social proof | Verified only: public / All: admin |

---

*Ghost Factory™ — Auto Repair Shop OS v1.0.0 | Automotive Vault (3/40)*
