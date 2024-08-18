import React from 'react';
import Header from "@/layouts/Header/Header";
import styles from "./RootContainer.module.css";



function RootContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.root_container}>
    <Header/>
    {children}
  </div>;
}

export default RootContainer;
