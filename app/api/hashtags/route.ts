import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/example-from-docs";

export async function GET() {
  return NextResponse.json({ message: "Aloha!" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("hashtags_Block")
    .insert([body])
    .select();

  return NextResponse.json({ message: "Data received!" });
}
