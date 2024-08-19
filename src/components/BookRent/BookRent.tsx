"use client"
import {useDialog} from "@/hooks/useDialog";
import {useRouter} from "next/navigation";
import styles from "./BookRent.module.css"
import {RentIc} from "svg/index";



type PropsType = {
  bookId: string;
  state?: boolean;
};

function BookRent({bookId, state}: PropsType) {
  const router = useRouter();
  const {alert, confirm} = useDialog()

  const onSubmit = () => {
    let userId = localStorage.getItem("id");
    if (userId) {
      confirm("도서를 대출하시겠습니까").then((res)=>{
        if (res) {
          rent(userId, bookId).then((res) => {
            if (res.status === 200) {
              alert(res.message).then(() => {
                router.push("/account");
              });
            } else {
              alert(res.message)
            }
          });
        }
      });
    } else {
      alert("로그인후 가능합니다")
    }
  };

  return <div className={styles.book_rent}>
    <button className={state ? "text-green-400" : "text-red-600"} onClick={onSubmit}>도서대출 <RentIc/></button>
  </div>;
}


const rent = async(userId:string, bookId:string)=>{
  let rentItem = JSON.stringify({userId:userId,
    bookId: bookId})
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "book", {
    method: "post", body: rentItem
  });
  return await res.json();
}

export default BookRent
