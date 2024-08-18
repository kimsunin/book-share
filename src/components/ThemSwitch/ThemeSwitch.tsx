"use client";
import {useTheme} from "next-themes";
import styles from "./ThemeSwitch.module.css"
import {MoonIc, SunIc} from "svg/index";

function ThemeSwitch() {
  const {setTheme, systemTheme, resolvedTheme} = useTheme();


  const switchTheme = () => {
    if (resolvedTheme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button onClick={() => switchTheme()} className={styles.theme_switch}>
      {resolvedTheme == "light" && <SunIc/>}
      {resolvedTheme == "dark" && <MoonIc/>}
    </button>
  );
}

export default ThemeSwitch;
