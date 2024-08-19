import styles from "./BookList.module.css"
import Link from "next/link";
import CustomImage from "@/components/CustomImage/CustomImage";
import {CircleIc} from "svg/index";

type PropsType = {
  props?: {
    id: number;
    name: string;
    author: string;
    publisher: string;
    summary: string;
    state: boolean;
    img_url: string;
  }[];
};

function BookList({props}: PropsType) {
  const bookList = props?.map((item, index) => (
      <li key={index} className={styles.list_item}>
        <Link href={`/detail/${item.id}`}>
          <div><CustomImage src={item.img_url}/></div>
          <div className="border-black/10 dark:border-white/10">
            <div>
              <div>
                <h1>{item.name}</h1>
                <span className={item.state ? "text-green-400" : "text-red-600"}><CircleIc/></span>
              </div>
              <span>{item.author}</span>
            </div>
            <p>{item.summary}</p>
            <p>{item.publisher} 출판</p>
          </div>
        </Link>
      </li>
    )
  );

  if(!props){
    return <p className="text-[14px]">도서가 존재하지 않습니다</p>
  }

  return <ul className={styles.book_list}>
    {bookList}
  </ul>;

}

export default BookList;
