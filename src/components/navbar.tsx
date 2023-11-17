import { Navbar as NavbarFlowbite } from "flowbite-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <NavbarFlowbite className="p-5">
      <NavbarFlowbite.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-3xl md:text-xl font-semibold dark:text-white">
          Posts
        </span>
      </NavbarFlowbite.Brand>
      <NavbarFlowbite.Toggle />
      <NavbarFlowbite.Collapse>
        <a className="text-purple-500 text-xl md:text-sm" href="#">
          Posts
        </a>
        <a className="hover:text-purple-400 text-xl md:text-sm" href="#">
          Logout
        </a>
        <a className="hover:text-purple-400 text-xl md:text-sm" href="#">
          Login
        </a>
        <a className="hover:text-purple-400 text-xl md:text-sm" href="#">
          Signup
        </a>
      </NavbarFlowbite.Collapse>
    </NavbarFlowbite>
  );
};

export default Navbar;
