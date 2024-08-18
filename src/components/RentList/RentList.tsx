import styles from "./RentList.module.css";
import {useDialog} from "@/hooks/useDialog";

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

function RentList({props}: PropsType) {

  const {alert, confirm} = useDialog()


  const returnBook = (id:number) => {
    confirm("도서를 반납하시겠습니까 ?").then((res)=>{
      if(res){
        returning(id).then((res)=>{
          if(res.status == 200){
            alert(res.message).then(() => {
              window.location.reload();
            })
          } else {
            alert(res.message)
          }
        })
      }
    })

  }


  const rentList = props?.map((item, index) => (
    <li key={index} className="border-black/10 dark:border-white/10">
      <div>
        <h1>{item.name}</h1>
      </div>
      <div>
        <button onClick={()=>returnBook(item.id)}>도서반납</button>
      </div>
    </li>
  ));

  if(props?.length == 0){
    return <p className="text-[14px]">대출도서가 없습니다</p>
  }

  return <ul className={styles.rent_list}>
    {rentList}
  </ul>;
}

const returning = async (id: number) => {
  let res = await fetch(process.env.NEXT_PUBLIC_API_URL + "book", {method: "delete", body: JSON.stringify({bookId: id})})
  return await res.json()
};


  export default RentList;
