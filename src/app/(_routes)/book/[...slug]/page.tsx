"use client"
import BookList from "@/components/BookList/BookList";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useDialog} from "@/hooks/useDialog";
import Pagination from "@/components/Pagination/Pagination";

function Page({params}: { params: { slug: string[] } }) {
  const router = useRouter();
  const {alert} = useDialog();

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    if (params.slug) {
      getData(params.slug).then((res) => {
        if (res.status == 200) {
          if (res.data.length < 10) {
            setLastPage(true);
          }
          setData(res.data)
          setVisible(true)
        } else {
          alert(res.message).then(() => router.back());
        }
      });
    }
  }, []);


  return <section className={visible ? "isvisible" : "isinvisible"}>
    <article>
      <h1>도서정보 {params.slug[1] && `(${decodeURI(params.slug[1])})`}</h1>
      <hr/>
      <BookList props={data}/>
      <Pagination p={Number(params?.slug[0])} q={params?.slug[1]} lastPage={lastPage}/>
    </article>
  </section>;
}

const getData = async (slug: string[]) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/book/${slug[0]}/${slug[1]}`, { cache: "no-store" });
  return await res.json();
};


export default Page;
