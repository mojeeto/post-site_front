import { Button } from "flowbite-react";
import React from "react";
import PostCard from "./post-card";

const PostCardList: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Button color="purple" className="flex-wrap">
          Add Post
        </Button>
      </div>
      <div className="flex flex-wrap gap-5 justify-evenly">
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
