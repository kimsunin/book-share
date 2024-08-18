import React from "react";
import type {Metadata} from "next";


export const metadata: Metadata = {
  title: "book | book",
};

export default function BookLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>{children}</main>
  );
};
