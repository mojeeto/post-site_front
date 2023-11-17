import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <React.Fragment>
      <header>Header</header>
      <main>{children}</main>
    </React.Fragment>
  );
};

export default MainLayout;
