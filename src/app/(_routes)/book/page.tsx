"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useDialog} from "@/hooks/useDialog";
import BookList from "@/components/BookList/BookList";

function Page(){
  const router = useRouter()
  const {alert} = useDialog()

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData().then((res)=>{
      if(res.status == 200) {
        setData(res.data)
        setVisible(true)
      } else {
       alert(res.error).then(()=>{
         router.back();
       })
      }
    })
  }, []);

  return <section className={visible ? "isvisible" : "isinvisible"}>
    <article>
      <h1>도서정보</h1>
      <hr/>
      <BookList props={data}/>
    </article>
  </section>;
}

const getData = async ()=>{
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/book",{ cache: "no-store" });
  return res.json();
}

export default Page
