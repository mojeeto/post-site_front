import React, { useState } from "react";
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
  // TODO:: Add States for handling custom form datas in modal

  const toggleModal = () => {
    setShowModal((state) => !state);
    if (!showModal) {
      // TODO:: clear all states
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
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" value="Title" className="text-md" />
              <TextInput id="title" required />
            </div>
            <div>
              <Label htmlFor="image" value="Image" className="text-md" />
              <FileInput id="image" required />
              {/** Create state to preview the image */}
              <img
                src="https://www.flowbite-react.com/images/blog/image-1.jpg"
                width={300}
                className="pt-5"
              />
            </div>
            <div>
              <Label htmlFor="content" value="Content" className="text-md" />
              <Textarea id="content" rows={2} required />
            </div>
          </div>
          <div className="flex pt-5 gap-5">
            <Button color="failure" onClick={toggleModal}>
              Cancel
            </Button>
            <Button color={edit ? "purple" : "success"} disabled>
              {edit ? "Update" : "Save"}
            </Button>
          </div>
        </ModalFlowbite.Body>
      </ModalFlowbite>
    </>
  );
};

export default Modal;
