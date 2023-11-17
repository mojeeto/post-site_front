import React from "react";
import Navbar from "../components/navbar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="mx-auto container">{children}</main>
    </React.Fragment>
  );
};

export default MainLayout;
