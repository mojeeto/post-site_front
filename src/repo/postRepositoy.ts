import { GenericAbortSignal, isAxiosError } from "axios";
import axios from "../util/axios";

export type PostType = {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
  creator: {
    name: string;
  };
  createdAt: string;
};

export const getPosts = async (token: string, signal: GenericAbortSignal) => {
  try {
    return await axios.get("/posts", {
      headers: {
        Authorization: "Barber " + token,
      },
      signal,
    });
  } catch (err) {
    if (isAxiosError(err)) return err.response;
    throw new Error("Error while get posts");
  }
};

export const putPost = async (data: FormData, token: string) => {
  try {
    return await axios.put("/post", data, {
      headers: {
        Authorization: "Barber " + token,
      },
    });
  } catch (err) {
    if (isAxiosError(err)) return err.response;
    throw new Error("Error while put new post");
  }
};

export const patchPost = async (
  data: FormData,
  postId: string,
  token: string
) => {
  try {
    return await axios.patch(`/post/${postId}`, data, {
      headers: {
        Authorization: "Barber " + token,
      },
    });
  } catch (err) {
    if (isAxiosError(err)) return err.response;
    throw new Error("Error while update post");
  }
};

export const deletePost = async (postId: string, token: string) => {
  try {
    return await axios.delete(`/post/${postId}`, {
      headers: {
        Authorization: "Barber " + token,
      },
    });
  } catch (err) {
    if (isAxiosError(err)) return err.response;
    throw new Error("Error while delete post");
  }
};
