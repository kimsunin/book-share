"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useDialog} from "@/hooks/useDialog";
import BookDetail from "@/components/BookDetail/BookDetail";
import BookRent from "@/components/BookRent/BookRent";


function Page({params}: {params: {id:string}}) {
  const router = useRouter();
  const {alert} = useDialog()

  const [data, setData] = useState<any>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData(params?.id).then((res)=>{
      if(res.status == 200){
        console.log(res.data)
        setData(res.data)
        setVisible(true)
      } else {
        alert(res.error).then(() =>
          router.back());
      }
    })
  }, []);


  return <section className={visible ? "isvisible" : "isinvisible"}>
    <article>
      <BookDetail props={data}/>
      <BookRent bookId={params.id} state={data?.state}/>
    </article>
  </section>;
}

const getData = async(id:string) =>{
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/detail/" + id);
  return res.json();
}

export default Page
