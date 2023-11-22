import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../redux";
import { useEffect } from "react";

const IsNotAuth: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);
  return !isAuth && <Outlet />;
};

export default IsNotAuth;
