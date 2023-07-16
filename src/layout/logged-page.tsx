import React from "react";
import Header from "@/components/header";

type props = {
  children: React.ReactNode;
};
const LoggedPage: React.FC<props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="h-auto w-full px-4 py-8">{children}</main>
    </>
  );
};

export default LoggedPage;
