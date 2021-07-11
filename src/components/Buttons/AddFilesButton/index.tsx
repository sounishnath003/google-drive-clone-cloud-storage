import React from "react";
import { FileTextIcon } from "../../../Assets/Icons";
import Modal from "../../Modal";

const AddFilesButton: React.FC = () => {
  return (
    <>
      <div onClick={() => alert("kdl")} className="button-upload">
        <div className="m-auto">
          {" "}
          <FileTextIcon color="blue" size={22} />{" "}
        </div>
        <div className="m-auto text-gray-700 hover:text-indigo-800">
          Add Files
        </div>
      </div>

      <Modal/>
    </>
  );
};

export default AddFilesButton;
