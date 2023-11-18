import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setIsAuth } from "../../redux/action/authAction";

const Logout: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      localStorage.clear();
      dispatch(setIsAuth({ isAuth: false, token: null }));
      navigate("/login");
    }
  }, []);
  return <></>;
};

export default Logout;
