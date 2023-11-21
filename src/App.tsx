import React, { useEffect } from "react";
import { Outlet as Children, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux";
import { setIsAuth } from "./redux/action/authAction";
import { ErrorMessage } from "./components/errors";
import { removeValidationError } from "./redux/action/errorAction";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(
      setIsAuth({
        isAuth: token !== null,
        token: token,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(removeValidationError());
  }, [location.pathname]);
  return (
    <React.Fragment>
      <ErrorMessage />
      <Navbar />
      <main className="mx-auto container">
        <Children />
      </main>
    </React.Fragment>
  );
}

export default App;
