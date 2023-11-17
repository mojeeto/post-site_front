import React from "react";
import Navbar from "../components/navbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="px-5">{children}</main>
    </React.Fragment>
  );
};

export default MainLayout;
