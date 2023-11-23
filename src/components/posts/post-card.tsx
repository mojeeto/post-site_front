import { Button, Card } from "flowbite-react";
import React from "react";
import Modal from "../modal";
import { PostType, deletePost } from "../../repo/postRepositoy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { removePostAction } from "../../redux/action/postAction";
import { addToast } from "../../redux/action/toastAction";

const PostCard: React.FC<{ post: PostType }> = ({ post }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const onDeletePost = async () => {
    const response = await deletePost(post._id, token!);
    if (!response) {
      dispatch(
        addToast({ type: "Error", message: "Error 500, please try again!" })
      );
      return;
    }
    const status = response.status;
    if (status !== 200) {
      dispatch(addToast({ type: "Error", message: response.data.message }));
      return;
    }
    dispatch(addToast({ type: "Success", message: response.data.message }));
    dispatch(removePostAction(post));
  };

  return (
    post && (
      <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={`http://192.168.1.100:3000/${post.imagePath}`}
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
          <Button onClick={onDeletePost} color="failure">
            Delete
          </Button>
        </div>
      </Card>
    )
  );
};

export default PostCard;
