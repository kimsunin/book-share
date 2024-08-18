import {useRouter} from "next/navigation";
import CustomImage from "@/components/CustomImage/CustomImage";
import styles from "./Profile.module.css"
import {useDialog} from "@/hooks/useDialog";

type PropsType = {
  props?: {
    id: string,
    name: string;
    number: string;
  };
}

function Profile({props}: PropsType) {
  const router = useRouter();
  const {confirm} = useDialog();

  const logout = async () => {
    const res = await confirm("로그아웃 하시겠습니까 ?")
    if (res) {
      localStorage.removeItem("id");
      router.push("/")
    }
  };

  return <div className={styles.profile}>
    <div><CustomImage src={null}/></div>
    <div>
      <h1>{props?.name}</h1>
      <p>학번 : {props?.id}</p>
      <p>전화번호 : {props?.number}</p>
      <div>
        <button onClick={logout}>LOGOUT</button>
      </div>
    </div>
  </div>;
}

export default Profile;
