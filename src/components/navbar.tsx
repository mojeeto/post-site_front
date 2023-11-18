import { Navbar as NavbarFlowbite } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <NavbarFlowbite className="p-5">
      <NavbarFlowbite.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-3xl md:text-xl font-semibold dark:text-white">
          Posts
        </span>
      </NavbarFlowbite.Brand>
      <NavbarFlowbite.Toggle />
      <NavbarFlowbite.Collapse>
        {auth.isAuth ? (
          <>
            <Link className="text-purple-500 text-xl md:text-sm" to="/">
              Posts
            </Link>
            <Link
              className="hover:text-purple-400 text-xl md:text-sm"
              to="/logout"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              className="hover:text-purple-400 text-xl md:text-sm"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="hover:text-purple-400 text-xl md:text-sm"
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}
      </NavbarFlowbite.Collapse>
    </NavbarFlowbite>
  );
};

export default Navbar;
