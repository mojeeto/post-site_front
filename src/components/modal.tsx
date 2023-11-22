import React, { FormEventHandler, useEffect, useState } from "react";
import {
  Button,
  FileInput,
  Label,
  Modal as ModalFlowbite,
  TextInput,
  Textarea,
} from "flowbite-react";
import ValidationMessages, {
  ValidationMessageItemType,
  makeValidationResponse,
} from "./errors/validation-errors";
import { putPost } from "../repo/postRepositoy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux";
import { addToast } from "../redux/action/toastAction";
import { useNavigate } from "react-router-dom";
import { addPostAction } from "../redux/action/postAction";

const Modal: React.FC<{
  value?: string;
  color?: "purple" | "blue" | "success";
  edit?: boolean;
  postId?: string;
}> = ({ color = "blue", value = "undefined", edit = false, postId = null }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [validationMessages, setValidationMessages] =
    useState<ValidationMessageItemType | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal((state) => !state);
    if (!showModal) {
      setImageFile(null);
      setImage(null);
      setTitle("");
      setContent("");
    }
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImageFile(files[0]);
    }
  };

  useEffect(() => {
    let reader: FileReader | null = null;
    if (imageFile) {
      reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        reader && setImage(reader.result);
      };
    }

    if (!token) {
      navigate("/login");
      dispatch(
        addToast({
          type: "Error",
          message: "Please login first!",
        })
      );
    }

    return () => {
      if (reader) {
        reader.abort();
        setImage(null);
      }
    };
  }, [imageFile, token]);

  const addPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (title && content && imageFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("postImage", imageFile);
      formData.append("content", content);
      const response = await putPost(formData, token!);
      if (!response) {
        dispatch(
          addToast({ type: "Error", message: "Error 500, please try again." })
        );
        setLoading(false);
        return;
      }
      const status = response.status;
      if (status !== 201) {
        if (status !== 403) {
          dispatch(
            addToast({ type: "Error", message: "Error 500, please try again." })
          );
          setLoading(false);
          return;
        }
        const validationResponse = response.data.validationReponse;
        if (validationResponse) {
          dispatch(addToast({ type: "Error", message: "Validation Error!" }));
          setValidationMessages(makeValidationResponse(validationResponse));
        } else {
          dispatch(
            addToast({
              type: "Error",
              message: "Forbbiden 403 Error!, Please Authenticate first!",
            })
          );
        }
      } else {
        dispatch(addPostAction(response.data.post));
        dispatch(
          addToast({
            type: "Success",
            message: response.data.message,
          })
        );
        toggleModal();
      }

      setLoading(false);
    }
  };

  return (
    <>
      <Button color={color} onClick={toggleModal}>
        {value}
      </Button>
      <ModalFlowbite show={showModal} onClose={toggleModal} position={"center"}>
        <ModalFlowbite.Header>
          {edit ? "Update Post" : "Create Post"}
        </ModalFlowbite.Header>
        <ModalFlowbite.Body>
          <form className="space-y-6" onSubmit={addPost}>
            {validationMessages && (
              <ValidationMessages validationMessages={validationMessages} />
            )}
            <div>
              <Label htmlFor="title" value="Title" className="text-md" />
              <TextInput
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="image" value="Image" className="text-md" />
              <FileInput id="image" onChange={onChangeFileInput} required />
              <div className="pt-5">
                {image ? (
                  <img src={`${image}`} width={150} />
                ) : (
                  "Please select a image"
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="content" value="Content" className="text-md" />
              <Textarea
                id="content"
                rows={2}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="flex pt-5 gap-5">
              <Button color="failure" onClick={toggleModal}>
                Cancel
              </Button>
              <Button
                color={edit ? "purple" : "success"}
                disabled={
                  title === "" ||
                  content === "" ||
                  (image === null && !edit) ||
                  loading
                }
                type="submit"
              >
                {edit ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </ModalFlowbite.Body>
      </ModalFlowbite>
    </>
  );
};

export default Modal;
