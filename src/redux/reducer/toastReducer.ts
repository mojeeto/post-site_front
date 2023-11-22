import { createReducer } from "@reduxjs/toolkit";
import { ToastMessageType, addToast, removeToast } from "../action/toastAction";

export default createReducer<ToastMessageType[]>([], (builder) => {
  builder.addCase(addToast, (state, action) => {
    state.push(action.payload);
    return state;
  });
  builder.addCase(removeToast, (state, action) => {
    state = state.filter((toast) => toast.message !== action.payload.message);
    return state;
  });
});
