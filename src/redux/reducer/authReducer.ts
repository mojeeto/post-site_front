import { createReducer } from "@reduxjs/toolkit";
import { IAuth, setIsAuth } from "../action/authAction";

const initialStateAuth = {
  isAuth: true,
  token: null,
} as IAuth;

const authReducer = createReducer(initialStateAuth, (builder) => {
  builder.addCase(setIsAuth, (_, action) => {
    return {
      isAuth: action.payload.isAuth,
      token: action.payload.token,
    };
  });
});

export default authReducer;
