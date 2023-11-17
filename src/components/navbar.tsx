import { Navbar as NavbarFlowbite } from "flowbite-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <NavbarFlowbite className="p-5">
      <NavbarFlowbite.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Posts
        </span>
      </NavbarFlowbite.Brand>
      <NavbarFlowbite.Toggle />
      <NavbarFlowbite.Collapse>
        <a className="text-purple-500" href="#">
          Posts
        </a>
        <a className="hover:text-purple-400" href="#">
          Logout
        </a>
        <a className="hover:text-purple-400" href="#">
          Login
        </a>
        <a className="hover:text-purple-400" href="#">
          Signup
        </a>
      </NavbarFlowbite.Collapse>
    </NavbarFlowbite>
  );
};

export default Navbar;
