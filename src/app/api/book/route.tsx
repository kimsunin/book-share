import {supabase} from "@/utils/supabase";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  let {data, error} = await supabase
    .from('book')
    .select('*')
    .range(0, 9);

  if(data){
    return NextResponse.json({data: data, message: "success", status: 200});
  } else {
    return NextResponse.json({error:error, message:"false", status: 404});
  }
}


export async function POST(req: NextRequest) {
  let request = await req.json();
  let {data, error} = await supabase
    .from('book')
    .select('state')
    .eq('id', request.bookId)

  if (error) {
    return NextResponse.json({error: error, message: "도서를 찾지 못했습니다", status: 404})
  }

  if (!data || data[0].state == false) {
    return NextResponse.json({error: error, message: "대출불가 도서입니다", status: 404});
  } else {
    let {data, error} = await supabase
      .from('rent')
      .insert([
        {book_id: request.bookId, student_id: request.userId},
      ])
      .select()

    if (data) {
      let {data, error} = await supabase
        .from('book')
        .update({state: false})
        .eq('id', request.bookId)
        .select()

      if (data) {
        return NextResponse.json({data: data, message: "대출이 완료되었습니다", status: 200});
      } else {
        const {error} = await supabase
          .from('rent')
          .delete()
          .eq('book_id', request.bookId)
        return NextResponse.json({error: error, message: "대출이 완료되지 않았습니다", status: 404});
      }
    } else {
      return NextResponse.json({error: error, message: "대출이 완료되지 않았습니다", status: 404});
    }
  }
}


export async function DELETE(req: NextRequest) {
  let request = await req.json();

  let { error } = await supabase
    .from('rent')
    .delete()
    .eq('book_id', request.bookId)

  if(error){
    NextResponse.json({error:error, message: "false", status: 405});
  } else {
    const { data, error } = await supabase
      .from('book')
      .update({ state: true })
      .eq('id',request.bookId )
      .select()

    return NextResponse.json({data: req.body, message: "도서반납이 완료되었습니다", status: 200});
  }



}
