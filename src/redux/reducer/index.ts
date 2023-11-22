import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import toastReducer from "./toastReducer";

export default combineReducers({
  auth: authReducer,
  toast: toastReducer,
});
