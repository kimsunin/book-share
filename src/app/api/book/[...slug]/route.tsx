import {NextRequest, NextResponse} from "next/server";
import {supabase} from "@/utils/supabase";

export async function GET(req: NextRequest, {params}: { params: { slug: string[] } }): Promise<any> {
  console.log(params.slug[0]);

  let {data, error} = await supabase.from('book')
    .select('*')
    .or(`name.ilike.%${params.slug[0]}%,author.ilike.%${params.slug[0]}%,publisher.ilike.%${params.slug[0]}%,summary.ilike.%${params.slug[0]}%`);

  if (data && data.length > 0) {
    return NextResponse.json({data: data, message: "success", status: 200});
  } else {
    return NextResponse.json({error: error, message: "도서가 존재하지 않습니다", status: 404});
  }
}



