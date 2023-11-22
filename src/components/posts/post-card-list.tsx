import React, { useEffect, useState } from "react";
import PostCard from "./post-card";
import Modal from "../modal";
import { getPosts } from "../../repo/postRepositoy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../../redux/action/toastAction";
import { GenericAbortSignal } from "axios";
import { addPostListAction } from "../../redux/action/postAction";

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
        {posts.map((post, index) => {
          return <PostCard post={post} key={index} />;
        })}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default PostCardList;
