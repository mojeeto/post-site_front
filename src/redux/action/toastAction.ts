import { createAction } from "@reduxjs/toolkit";

export type ToastMessageType = {
  type: "Error" | "Info" | "Success";
  message: string;
};

export const addToast = createAction<ToastMessageType>("add_toast");
export const removeToast = createAction<ToastMessageType>("remove_toast");
