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
    const foundedPost = state.findIndex(
      (post) => post._id === action.payload._id
    );
    if (foundedPost !== -1) state[foundedPost] = action.payload;
    else state.push(action.payload);
    return state;
  });
  builder.addCase(removePostAction, (state, action) => {
    return state.filter((post) => action.payload._id !== post._id);
  });
});
