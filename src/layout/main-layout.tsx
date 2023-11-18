import React from "react";
import Navbar from "../components/navbar";
import { Outlet as Children } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="mx-auto container">
        <Children />
      </main>
    </React.Fragment>
  );
};

export default MainLayout;
