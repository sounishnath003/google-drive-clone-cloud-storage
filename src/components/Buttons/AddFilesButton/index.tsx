import React from "react";
import { ButtonProps } from "..";
import { FileTextIcon } from "../../../Assets/Icons";
import { useAuth } from "../../../context/auth.context";
import { database, storage } from "../../../firebase";
import { ROOT_FOLDER } from "../../../hooks/useFolder.hook";

type FileUploadEvent = React.ChangeEvent<HTMLInputElement>;

const AddFilesButton: React.FC<ButtonProps> = ({
  currentFolder,
}: ButtonProps) => {
  if (ROOT_FOLDER == null) return <></>;
  const { currentUser } = useAuth();

  async function handleFileUpload(e: FileUploadEvent) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.target.files;
    if (files !== null && files.length > 0 && typeof ROOT_FOLDER === "object") {
      const file: File = files[0];
      const parentPath: string =
        ((currentFolder as any)?.path).length > 0
          ? `${(currentFolder as any)?.path.join("/")}`
          : "";

      const filePath: string =
        currentFolder === ROOT_FOLDER
          ? `${parentPath}/${file.name}`
          : `${parentPath}/${(currentFolder as any)?.name}`;

      const uploader = storage
        .ref(`/files/${currentUser?.uid}/${filePath}`)
        .put(file);

      uploader.on(
        "state_changed",
        (snapshot) => {},
        () => {},
        () => {
          uploader.snapshot.ref.getDownloadURL().then((url: string) => {
            database.files.add({
              url,
              name: file.name,
              path: filePath,
              createdAt: database.getCurrentTimestamp(),
              folderId: currentFolder?.id,
              userId: currentUser?.uid,
            });
          });
        }
      );
    } else {
      window.location.replace("/");
    }
  }

  return (
    <React.Fragment>
      <div className="button-upload">
        <input
          type="file"
          className="opacity-0 absolute"
          onChange={handleFileUpload}
        />
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
