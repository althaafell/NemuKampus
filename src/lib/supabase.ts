import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
);

export type Report = {
  id: string;
  type: "hilang" | "ditemukan";
  title: string;
  category: string;
  location: string;
  location_detail: string | null;
  event_date: string;
  description: string | null;
  photo_url: string | null;
  whatsapp: string;
  status: "aktif" | "selesai";
  created_at: string;
};

// every public column except code_hash (anon has no grant on it)
export const REPORT_COLUMNS =
  "id,type,title,category,location,location_detail,event_date,description,photo_url,whatsapp,status,created_at";

export const CATEGORIES = [
  "Elektronik",
  "Dompet/Kartu",
  "Kunci",
  "Tas",
  "Pakaian",
  "Dokumen",
  "Lainnya",
];

export const LOCATIONS = [
  "Rektorat",
  "FILKOM",
  "Fakultas Teknik",
  "FMIPA",
  "FEB",
  "Fakultas Hukum",
  "FIA",
  "FISIP",
  "FIB",
  "Fakultas Kedokteran",
  "FKG",
  "FKH",
  "Fakultas Pertanian",
  "Fakultas Peternakan",
  "FPIK",
  "FTP",
  "Vokasi",
  "Perpustakaan Pusat",
  "Gedung Samantha Krida",
  "Masjid Raden Patah",
  "Stadion / GOR",
  "Kantin",
  "Parkiran",
  "Lainnya",
];

export const EXPIRY_DAYS = 60;

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
