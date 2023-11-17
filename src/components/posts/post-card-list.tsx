import { Button } from "flowbite-react";
import React from "react";
import PostCard from "./post-card";

const PostCardList: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-5">
        <Button color="purple" className="flex-wrap">
          Add Post
        </Button>
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
