import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : "";

export const supabase = createClient<Database>(url, key);
