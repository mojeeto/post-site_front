import { Navbar as NavbarFlowbite } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
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
            <Link
              className={`text-xl md:text-sm ${
                pathname === "/" ? "text-purple-500" : "hover:text-purple-400"
              }`}
              to="/"
            >
              Posts
            </Link>
            <Link
              className={`text-xl md:text-sm ${
                pathname === "/logout"
                  ? "text-purple-500"
                  : "hover:text-purple-400"
              }`}
              to="/logout"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              className={`text-xl md:text-sm ${
                pathname === "/login"
                  ? "text-purple-500"
                  : "hover:text-purple-400"
              }`}
              to="/login"
            >
              Login
            </Link>
            <Link
              className={`text-xl md:text-sm ${
                pathname === "/signup"
                  ? "text-purple-500"
                  : "hover:text-purple-400"
              }`}
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
