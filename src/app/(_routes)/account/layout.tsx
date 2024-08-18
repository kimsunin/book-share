import React from "react";
import type {Metadata} from "next";


export const metadata: Metadata = {
  title: "book | account",
};

export default function AcountLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>{children}</main>
  );
};
