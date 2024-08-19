import CustomImage from "@/components/CustomImage/CustomImage";
import {CircleIc} from "svg/index";
import styles from "./BookDetail.module.css"

type PropsType = {
  props?: {
    id: number;
    name: string;
    author: string;
    publisher: string;
    summary: string;
    img_url: string;
    state: boolean;
  };
}

function BookDetail({props}: PropsType) {
  return <div className={styles.book_detail}>
    <div><CustomImage src={props?.img_url}/></div>
    <div>
      <h1>{props?.name}</h1>
      {props?.state ?
        <span className="text-green-400"><CircleIc/> 대출가능</span> :
        <span className="text-red-600"><CircleIc/> 대출불가</span>}
      <p>작가 : {props?.author}</p>
      <p>출판사 : {props?.publisher}</p>
      <p>{props?.summary}</p>
    </div>
  </div>;
}

export default BookDetail;
