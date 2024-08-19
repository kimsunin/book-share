import {supabase} from "@/utils/supabase";
import {NextRequest, NextResponse} from "next/server";

export async function GET( req: NextRequest,{params}: { params: { id: string } }) {
  let id = params.id;
  const datas:any = {userData:[], rentData:[], bookData:[]}

  let {data, error} = await supabase
    .from('student')
    .select("*").eq("id", id).single();

  datas.userData = data;

  if(data) {
    let {data, error} = await supabase
      .from("rent")
      .select("*")
      .eq("student_id", id);

    datas.rentData = data;


    if (data) {
      for (const item of datas.rentData) {
          let {data, error} = await supabase
            .from("book")
            .select("*")
            .eq("id", item.book_id);

          if (data) {
            datas.bookData.push(data[0])
          }
        }

      return NextResponse.json({data: datas, message: "success", status: 200});

    } else {
      return NextResponse.json({error: error, message: "false", status: 404});
    }
  } else {
    return NextResponse.json({error: error, message: "존재하지 않는 학생입니다", status: 404});
  }
}


