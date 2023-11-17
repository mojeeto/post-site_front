import React from "react";
import PostCard from "./post-card";
import Modal from "../modal";

const PostCardList: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-5">
        <Modal value="Add Post" color="purple" />
      </div>
      <div className="flex flex-col items-center gap-5 px-5 md:px-2.5 pb-10">
        {Array(5)
          .fill("")
          .map((_, index) => {
            return <PostCard key={index} />;
          })}
      </div>
    </div>
  );
};

export default PostCardList;
