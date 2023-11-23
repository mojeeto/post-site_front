import React, { useEffect, useState } from "react";
import PostCard from "./post-card";
import Modal from "../modal";
import { getPosts } from "../../repo/postRepositoy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../../redux/action/toastAction";
import { GenericAbortSignal } from "axios";
import {
  addPostAction,
  addPostListAction,
  removePostAction,
} from "../../redux/action/postAction";
import { io } from "socket.io-client";

const PostCardList: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetch = async (token: string, signal: GenericAbortSignal) => {
      const response = await getPosts(token, signal);
      if (!response) return;
      const status = response.status;
      if (status !== 200) {
      } else {
        dispatch(addPostListAction(response.data.posts));
        setLoading(false);
        const socket = io("http://192.168.1.100:3000");
        socket.on("posts", (data) => {
          const { action, post } = data;
          if (action === "create") {
            dispatch(addPostAction(post));
          } else if (action === "update") {
            dispatch(addPostAction(post));
          } else if (action === "delete") {
            dispatch(removePostAction(post));
          }
        });
      }
    };
    if (!token) {
      dispatch(
        addToast({
          type: "Error",
          message: "Please Authenticate first!",
        })
      );
      navigate("/login");
    } else {
      fetch(token, signal);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return !loading ? (
    <div className="flex flex-col gap-5">
      <div className="px-5">
        <Modal value="Add Post" color="purple" />
      </div>
      <div className="flex flex-col items-center gap-5 px-5 md:px-2.5 pb-10">
        {posts.length > 0
          ? posts.map((post, index) => {
              return <PostCard post={post} key={index} />;
            })
          : "No Post Founded!"}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default PostCardList;
