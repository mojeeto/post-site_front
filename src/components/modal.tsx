import React, { useEffect, useState } from "react";
import {
  Button,
  FileInput,
  Label,
  Modal as ModalFlowbite,
  TextInput,
  Textarea,
} from "flowbite-react";

const Modal: React.FC<{
  value?: string;
  color?: "purple" | "blue" | "success";
  edit?: boolean;
}> = ({ color = "blue", value = "undefined", edit = false }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

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
    return () => {
      if (reader) {
        reader.abort();
        setImage(null);
      }
    };
  }, [imageFile]);

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
          <div className="space-y-6">
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
          </div>
          <div className="flex pt-5 gap-5">
            <Button color="failure" onClick={toggleModal}>
              Cancel
            </Button>
            <Button
              color={edit ? "purple" : "success"}
              disabled={
                title === "" || content === "" || (image === null && !edit)
              }
            >
              {edit ? "Update" : "Save"}
            </Button>
          </div>
        </ModalFlowbite.Body>
      </ModalFlowbite>
    </>
  );
};

export default Modal;
