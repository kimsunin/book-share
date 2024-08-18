"use client";
import {useRouter} from "next/navigation";
import {useDialog} from "@/hooks/useDialog";
import {useEffect, useState} from "react";
import Profile from "@/components/Profile/Profile";
import RentList from "@/components/RentList/RentList";

function Page() {
  const router = useRouter();
  const { prompt, alert } = useDialog();

  const [data, setData] = useState<any>();
  const [visible, setVisible] = useState(false);

  const login = async () => {
    let authentication = false;
    let id = localStorage.getItem("id");
    if(id) {
      let res = await getData(id)
      console.log(res);
      if (res.status == 200) {
        setData(res.data);
        setVisible(true);
        authentication = true;
      } else {
        localStorage.removeItem("id");
      }
    }
    while (!authentication) {
      let res = await prompt("학번입력");
      if (res !== null) {
        let response = await getData(res)
        if (response.status == 200) {
          localStorage.setItem("id", res);
          setData(response.data);
          setVisible(true)
          authentication = true
        } else {
          await alert("로그인 실패")
        }
      } else {
        router.back();
        authentication = false;
      }
      ;
    }
  };

  useEffect(() => {
    login();
  }, []);

  return <section className={visible ? "isvisible" : "isinvisible"}>
    <article>
      <Profile props={data?.userData}/>
    </article>
    <article>
      <h1>대출정보</h1>
      <hr/>
      <RentList props={data?.bookData}/>
    </article>
  </section>;
}




const getData = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/account/${id}`);
  return await res.json();
};

export default Page;

