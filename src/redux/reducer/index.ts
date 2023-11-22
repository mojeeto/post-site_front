import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import toastReducer from "./toastReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  toast: toastReducer,
  posts: postReducer,
});
