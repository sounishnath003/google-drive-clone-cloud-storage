import React from "react";
import { FileTextIcon } from "../../../Assets/Icons";
import Modal from "../../Modal";

const AddFilesButton: React.FC = () => {
  const [showModal, setModal] = React.useState(false);
  return (
    <React.Fragment>
      {showModal && (
        <Modal
          title={"Upload file"}
          shortDesc={"Please enter the name of the file you want to create."}
          type={"ADD_FILE"}
          modalShowFunc={setModal}
        />
      )}
      <div onClick={() => setModal(true)} className="button-upload">
        <div className="m-auto">
          {" "}
          <FileTextIcon color="blue" size={22} />{" "}
        </div>
        <div className="m-auto text-gray-700 hover:text-indigo-800">
          Add Files
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddFilesButton;
