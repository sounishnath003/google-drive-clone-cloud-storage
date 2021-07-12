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
          shortDesc={
            "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
          }
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
