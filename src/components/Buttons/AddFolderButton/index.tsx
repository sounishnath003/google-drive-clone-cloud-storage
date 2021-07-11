import React from "react";
import { FolderPlusIcon } from "../../../Assets/Icons";

const AddFolderButton: React.FC = () => {
  return (
    <div className="button-upload">
      <div className="m-auto">
        {" "}
        <FolderPlusIcon color="blue" size={22} />{" "}
      </div>
      <div className="m-auto text-gray-700 hover:text-indigo-800">Add Folders</div>
    </div>
  );
};

export default AddFolderButton;
