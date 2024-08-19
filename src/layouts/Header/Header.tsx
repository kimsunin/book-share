"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import ThemeSwitch from "@/components/ThemSwitch/ThemeSwitch";
import styles from  "./Header.module.css"
import {PersonIc, SearchIc, HomeIc} from "svg/index";


function Header() {
  const router = useRouter();

  const [isClick, setIsClick] = useState(false)
  const [value, setValue] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/book/${value}`);
  };


  return <header className={styles.header}>
    <div>
      <div>
        <Link href="/">BOOK-SHARE</Link>
      </div>
      <div>
        <button onClick={() => setIsClick(!isClick)}><SearchIc/></button>
        <ThemeSwitch/>
        <Link href="/account">
          <PersonIc/>
        </Link>
      </div>
    </div>
    <form className={`${isClick ? styles.on : styles.off}`} onSubmit={onSubmit}>
      <input placeholder="찾으시는 도서가 있으신가요 ?" value={value} onChange={(e) => setValue(e.target.value)}/>
    </form>
  </header>;
}

export default Header;
