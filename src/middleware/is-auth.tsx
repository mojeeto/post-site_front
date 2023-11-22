import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../redux";
import { useEffect } from "react";

const IsAuth: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return isAuth && <Outlet />;
};

export default IsAuth;
