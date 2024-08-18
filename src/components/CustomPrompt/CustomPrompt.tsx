import { useState } from "react";
import styles from "./CustomPrompt.module.css"

type CustomPromptProps = {
  message: string;
  onClickOk: (input: string) => void;
  onClickCancel: () => void;
};


function CustomPrompt({message, onClickOk, onClickCancel}: CustomPromptProps) {
  const [input, setInput] = useState("");

  return (
    <div className={`${styles.custom_prompt} bg-white/60 dark:bg-white/20`}>
      <span>{message}</span>
      <input
        className="bg-white/60 dark:bg-white/20"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <button onClick={onClickCancel}>취소</button>
        <button onClick={() => onClickOk(input)}>확인</button>
      </div>
    </div>
  );
}

export default CustomPrompt;
