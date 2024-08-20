"use client"
import styles from "./Pagination.module.css"
import {DotIc, LeftIc, RightIc} from "svg/index";
import {useRouter} from "next/navigation";

type PropsType = {
  p?:number,
  q?:string
  lastPage:boolean
}

function Pagination({p, q, lastPage}: PropsType) {
  const router = useRouter();

  return <div className={styles.pagination}>
    <button onClick={() => {
      if (p && p > 1) {
        router.push(`/book/${p - 1}/${q ? `${q}` : ""}`)
      }
    }}><LeftIc/></button>
    <DotIc/>
    <button onClick={() => {
      if(!lastPage) {
        router.push(`/book/${Number(p) + 1}/${q ? `${q}` : ""}`)
      }
    }}><RightIc/></button>
  </div>;
}

export default Pagination;
