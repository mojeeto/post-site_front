import { createReducer } from "@reduxjs/toolkit";
import { PostType } from "../../repo/postRepositoy";
import {
  addPostAction,
  addPostListAction,
  removePostAction,
} from "../action/postAction";

const initialStatePostReducer: PostType[] = [];

export default createReducer(initialStatePostReducer, (builder) => {
  builder.addCase(addPostListAction, (state, action) => {
    return action.payload;
  });
  builder.addCase(addPostAction, (state, action) => {
    return state.map((p) => {
      if (p._id !== action.payload._id) return p;
      return action.payload;
    });
  });
  builder.addCase(removePostAction, (state, action) => {
    return state.filter((post) => action.payload._id !== post._id);
  });
});