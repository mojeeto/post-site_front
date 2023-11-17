import { Button, Card } from "flowbite-react";
import React from "react";
import Modal from "../modal";

// TODO::Must accept a post with posttype from PostModel
const PostCard: React.FC = () => {
  return (
    <Card
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="https://www.flowbite-react.com/images/blog/image-1.jpg"
      horizontal
    >
      <div>
        <span className="text-gray-400 text-xs">
          Writed by <b>Mojeeto</b> at <b>2022-05-21</b>
        </span>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <div className="flex gap-2">
        <Button color="purple">View</Button>
        <Modal color="success" value="Edit" edit={true} />
        <Button color="failure">Delete</Button>
      </div>
    </Card>
  );
};

export default PostCard;
