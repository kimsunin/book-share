import {supabase} from "@/utils/supabase";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
  let id = params.id;
  let {data, error} = await supabase
    .from('book')
    .select('*')
    .eq("id", id).single();

  if(data) {
    return NextResponse.json({data: data, message: "success", status: 200});
  } else {
    return NextResponse.json({error:error, message:"false", status: 404});
  }
}
