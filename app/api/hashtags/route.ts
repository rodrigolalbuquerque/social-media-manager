import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET() {
  return NextResponse.json({ message: "Aloha!" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("hashtags_Block")
    .insert([body])
    .select();

  console.log(data);
  return NextResponse.json({ message: "Data received!" });
}
