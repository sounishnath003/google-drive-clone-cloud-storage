import firebase from "firebase";
import React from "react";
import { FolderPlusIcon } from "../../../Assets/Icons";
import { FolderType } from "../../../hooks/useFolder.hook";
import Modal from "../../Modal";

interface AddFolderButtonProps {
  currentFolder: FolderType<firebase.firestore.DocumentData> | null | undefined;
}

const AddFolderButton: React.FC<AddFolderButtonProps> = ({
  currentFolder,
}: AddFolderButtonProps): JSX.Element => {
  const [showModal, setModal] = React.useState(false);

  return (
    <React.Fragment>
      {showModal && (
        <Modal
          title={"Upload folder"}
          shortDesc={"Please enter the name of the folder you want to create."}
          type={"ADD_FOLDER"}
          modalShowFunc={setModal}
          currentFolder={currentFolder}
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
