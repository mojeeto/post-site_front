import { Button, Card } from "flowbite-react";
import React from "react";
import Modal from "../modal";
import { PostType } from "../../repo/postRepositoy";

const PostCard: React.FC<{ post?: PostType }> = ({ post }) => {
  return (
    post && (
      <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={`http://192.168.1.100:8080/${post.imagePath}`}
        horizontal
      >
        <div>
          <span className="text-gray-400 text-xs">
            Writed by <b>{post.creator.name}</b> at{" "}
            <b>{new Date(post.createdAt).toLocaleDateString()}</b>
          </span>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {post.content}
        </p>
        <div className="flex gap-2">
          <Modal color="success" value="Edit" edit={true} post={post} />
          <Button color="failure">Delete</Button>
        </div>
      </Card>
    )
  );
};

export default PostCard;
