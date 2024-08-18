"use client"
import {ReactNode, useState} from "react";
import Overlay from "@/layouts/Overlay/Overlay";
import {DialogContext} from "@/hooks/useDialog";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import CustomAlert from "@/components/CustomAlert/CustomAlert";
import CustomPrompt from "@/components/CustomPrompt/CustomPrompt";

interface AlertState  {
  type: "alert"
  message: string;
  onClickOk: () => void
}

interface ConfirmState {
  type: "confirm"
  message: string;
  onClickOk: () => void
  onClickCancel: () => void
}

interface PromptState {
  type:"prompt"
  message: string;
  onClickOk: (input: string) => void;
  onClickCancel: () => void;
}

type DialogState = ConfirmState | AlertState | PromptState;

type PropsType = {
  children: ReactNode;
}

function DialogProvider({children}: PropsType) {
  const [state, setState] = useState<DialogState>();


  const alert = (message?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        type: "alert",
        message: message ?? '',
        onClickOk: () => {
          setState(undefined);
          resolve(true);
        },
      });
    });
  };

  const confirm = (message?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        type:"confirm",
        message: message ?? '',
        onClickOk: () => {
          setState(undefined);
          resolve(true);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(false);
        },
      });
    });
  };

  const prompt = (message?: string): Promise<string | null> => {
    return new Promise((resolve) => {
      setState({
        type: "prompt",
        message: message ?? '',
        onClickOk: (input: string) => {
          setState(undefined);
          resolve(input);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(null);
        },
      });
    });
  };



  return (
    <DialogContext.Provider value={{alert, confirm, prompt}}>
      {children}
      {state && (
        <Overlay>
          {state.type == "alert" && <CustomAlert message={state.message} onClickOk={state.onClickOk}/>}
          {state.type == "confirm" &&
              <CustomConfirm message={state.message} onClickOk={state.onClickOk} onClickCancel={state.onClickCancel}/>}
          {state.type == "prompt" &&
              <CustomPrompt message={state.message} onClickOk={state.onClickOk} onClickCancel={state.onClickCancel}/>}
        </Overlay>
      )}
    </DialogContext.Provider>
  );
}

export default DialogProvider;

