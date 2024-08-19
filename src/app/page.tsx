"use client"
import {useState, useEffect} from "react";
import Link from "next/link";
import {EmailIc, GithubIc} from "svg/index";

export default function Home() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, []);


  return (
    <main>
      <section className={visible ? "isvisible" : "isinvisible"}>
        <article>
          <p>도서대출 서비스입니다</p>
        </article>
        {/*<article>*/}
        {/*  <div className="flex">*/}
        {/*    <Link href="https://github.com/kimsunin/book-share" target="_blank"><GithubIc/></Link>*/}
        {/*    <Link href="https://suninkim10@gmail.com" type="email" target="_blank"><EmailIc/></Link>*/}
        {/*  </div>*/}
        {/*</article>*/}
      </section>
    </main>
  );
}
