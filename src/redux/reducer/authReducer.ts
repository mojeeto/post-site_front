import { createReducer } from "@reduxjs/toolkit";
import { IAuth, setIsAuth } from "../action/authAction";

const getInitalStateAuth = (): IAuth => {
  const token = localStorage.getItem("token");
  return {
    isAuth: token !== null,
    token: token,
  };
};

const authReducer = createReducer(getInitalStateAuth(), (builder) => {
  builder.addCase(setIsAuth, (_, action) => {
    return {
      isAuth: action.payload.isAuth,
      token: action.payload.token,
    };
  });
});

export default authReducer;
