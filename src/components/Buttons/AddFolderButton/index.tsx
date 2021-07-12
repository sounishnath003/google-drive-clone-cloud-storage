import React from "react";
import { FolderPlusIcon } from "../../../Assets/Icons";
import Modal from "../../Modal";

const AddFolderButton: React.FC = () => {
  const [showModal, setModal] = React.useState(false);

  return (
    <React.Fragment>
      {showModal && (
        <Modal
          title={"Upload folder"}
          shortDesc={
            "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
          }
          type={"ADD_FOLDER"}
          modalShowFunc={setModal}
        />
      )}
      <div onClick={() => setModal(true)} className="button-upload">
        <div className="m-auto">
          {" "}
          <FolderPlusIcon color="blue" size={22} />{" "}
        </div>
        <div className="m-auto text-gray-700 hover:text-indigo-800">
          Add Folders
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddFolderButton;
