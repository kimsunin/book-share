"use client"
import {useState, useEffect} from "react";

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
      </section>
    </main>
  );
}
