import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

const supabase = createServerComponentClient<Database>({ cookies });

export default supabase;
