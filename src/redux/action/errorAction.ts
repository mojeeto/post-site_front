import { createAction } from "@reduxjs/toolkit";

export type ErrorMessageType = {
  message: string;
  type: "Error" | "Info" | "Success";
};

export type ValidationErrorMessageType = {
  msg: string;
  name: string;
};

export type ErrorActionType = {
  errorMessage: ErrorMessageType[];
  validationErrors: ValidationErrorMessageType[];
};

export const addMessagError = createAction<ErrorMessageType>("addmessageerror");
export const addValidationErrorMessage =
  createAction<ValidationErrorMessageType>("addvalidationerrormessage");

export const removeMessageError =
  createAction<ErrorMessageType>("removemessageerror");
export const removeAllMessageError = createAction("removeallmessageserror");
export const removeValidationError = createAction("removevalidationerror");
