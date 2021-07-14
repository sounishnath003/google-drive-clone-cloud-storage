import firebase from "firebase";
import React from "react";
import { FolderIcon } from "../../Assets/Icons";

interface FolderProps {
  folder: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
}

const Folder = ({ folder }: FolderProps): JSX.Element => {
  return (
    <React.Fragment>
      <div className="button-upload">
        <div className="px-2 w-30 space-x-2 hover:text-indigo-600 rounded py-2 flex flex-row justify-between items-center">
          <div className="m-auto">
            {" "}
            <FolderIcon />{" "}
          </div>
          <div className="m-auto truncate"> {folder.name} </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Folder;