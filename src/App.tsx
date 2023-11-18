import React, { useEffect } from "react";
import { Outlet as Children } from "react-router-dom";
import Navbar from "./components/navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux";
import { setIsAuth } from "./redux/action/authAction";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(
      setIsAuth({
        isAuth: token !== null,
        token: token,
      })
    );
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <main className="mx-auto container">
        <Children />
      </main>
    </React.Fragment>
  );
}

export default App;
