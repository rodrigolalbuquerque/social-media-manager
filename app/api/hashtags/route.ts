import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/example-from-docs";

export async function GET() {
  const { data, error } = await supabase.from("hashtags_Block").select("*");
  if (error) console.log(error);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { error } = await supabase
    .from("hashtags_Block")
    .insert([body])
    .select();

  if (error) console.log(error);

  return NextResponse.json({ message: "Blocos inseridos" });
}
