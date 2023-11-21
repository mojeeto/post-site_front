import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
