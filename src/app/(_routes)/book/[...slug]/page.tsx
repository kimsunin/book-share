"use client"
import BookList from "@/components/BookList/BookList";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useDialog} from "@/hooks/useDialog";

function Page({params}: { params: { slug: string[] } }) {
  const router = useRouter();
  const {alert} = useDialog();

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (params.slug) {
      getData(params.slug[0]).then((res) => {
        setData(res.data)
        setVisible(true)
      });
    }
  }, []);


  return <section className={visible ? "isvisible" : "isinvisible"}>
    <article>
      <h1>{`도서정보  (${decodeURI(params.slug[0])})`}</h1>
      <hr/>
      <BookList props={data}/>
    </article>
  </section>;
}

const getData = async (slug: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/book/${slug}`, { cache: "no-store" });
  return await res.json();
};


export default Page;
