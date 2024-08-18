import React from "react";
import type {Metadata} from "next";


export const metadata: Metadata = {
  title: "book | detail",
};

export default function DetailLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>{children}</main>
  );
};
