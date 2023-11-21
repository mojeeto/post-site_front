import { createReducer } from "@reduxjs/toolkit";
import {
  ErrorActionType,
  addMessagError,
  addValidationErrorMessage,
  removeAllMessageError,
  removeMessageError,
  removeValidationError,
} from "../action/errorAction";

const initialStateErrorReducer: ErrorActionType = {
  errorMessage: [],
  validationErrors: [],
};

export default createReducer(initialStateErrorReducer, (builder) => {
  builder.addCase(addMessagError, (state, action) => {
    state.errorMessage.push(action.payload);
    return state;
  });
  builder.addCase(addValidationErrorMessage, (state, action) => {
    state.validationErrors.push(action.payload);
    return state;
  });
  builder.addCase(removeMessageError, (state, action) => {
    state.errorMessage = state.errorMessage.filter((errorMessage) => {
      return errorMessage.message !== action.payload.message;
    });
    return state;
  });
  builder.addCase(removeAllMessageError, (state, action) => {
    state.errorMessage = [];
    return state;
  });
  builder.addCase(removeValidationError, (state, action) => {
    state.validationErrors = [];
    return state;
  });
});
