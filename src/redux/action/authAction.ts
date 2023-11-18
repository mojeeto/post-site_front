import { createAction } from "@reduxjs/toolkit";

export type IAuth = {
  isAuth: boolean;
  token: string | null;
};

export const setIsAuth = createAction<IAuth>("is_auth");
