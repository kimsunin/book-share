import {NextRequest, NextResponse} from "next/server";
import {supabase} from "@/utils/supabase";

export async function GET(req: NextRequest, {params}: { params: { slug: string[] } }): Promise<any> {
  if(params.slug[1] == "undefined") {
    console.log("hello")
    let {data, error} = await supabase
      .from('book')
      .select('*')
      .range(Number(params.slug[0]) * 10 - 10, Number(params.slug[0]) * 10 - 1);

    if (data) {
      return NextResponse.json({data: data, message: "success", status: 200});
    } else {
      return NextResponse.json({error: error, message: "false", status: 404});
    }

  } else {
    let {data, error} = await supabase.from('book')
      .select('*')
      .or(`name.ilike.%${params.slug[1]}%,author.ilike.%${params.slug[1]}%,publisher.ilike.%${params.slug[1]}%,summary.ilike.%${params.slug[1]}%`)
      .range(Number(params.slug[0]) * 10 - 10, Number(params.slug[0]) * 10 - 1);

    if (data) {
      return NextResponse.json({data: data, message: "success", status: 200});
    } else {
      return NextResponse.json({error: error, message: "도서가 존재하지 않습니다", status: 404});
    }
  }

}



