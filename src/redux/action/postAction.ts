import { createAction } from "@reduxjs/toolkit";
import { PostType } from "../../repo/postRepositoy";

export const addPostListAction = createAction<PostType[]>("add_post_list");
export const addPostAction = createAction<PostType>("add_post_action");
export const removePostAction = createAction<PostType>("remove_post_action");
