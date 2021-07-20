import React from "react";
import ReactDOM from "react-dom";
import { ButtonProps } from "..";
import { FileTextIcon } from "../../../Assets/Icons";
import { useAuth } from "../../../context/auth.context";
import { ROOT_FOLDER } from "../../../hooks/useFolder.hook";
import { useHook } from "./hook";

const AddFilesButton: React.FC<ButtonProps> = ({
  currentFolder,
}: ButtonProps) => {
  if (ROOT_FOLDER == null) return <></>;
  const { currentUser } = useAuth();
  const { uploadingFiles, handleFileUpload } = useHook();

  return (
    <React.Fragment>
      <div className="button-upload">
        <input
          type="file"
          className="opacity-0 absolute"
          onChange={(e) => handleFileUpload(e, currentFolder, currentUser)}
        />
        <div className="m-auto">
          {" "}
          <FileTextIcon color="blue" size={22} />{" "}
        </div>
        <div className="m-auto text-gray-700 hover:text-indigo-800">
          Add Files
        </div>
      </div>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div>
            {uploadingFiles.map((file, index) => {
              <div key={index}> {file.progress}% uploading... </div>;
            })}
          </div>,
          window.document.body
        )}
    </React.Fragment>
  );
};

export default AddFilesButton;
