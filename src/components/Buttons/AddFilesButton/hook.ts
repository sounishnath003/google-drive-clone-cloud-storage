import firebase from "firebase";
import React from "react";
import { database, storage } from "../../../firebase";
import { FolderType, ROOT_FOLDER } from "../../../hooks/useFolder.hook";

type FileUploadEvent = React.ChangeEvent<HTMLInputElement>;

interface FileUploaderInterface {
  id: string;
  name: string;
  size: number;
  progress: number;
  error: boolean;
}

interface HookInterface {
  handleFileUpload: (
    e: FileUploadEvent,
    currentFolder:
      | FolderType<firebase.firestore.DocumentData>
      | null
      | undefined,
    currentUser: firebase.User | null
  ) => Promise<void>;
  uploadingFiles: FileUploaderInterface[];
}

export function useHook(): HookInterface {
  const [uploadingFiles, setUploadingFiles] = React.useState<
    FileUploaderInterface[]
  >([]);

  async function handleFileUpload(
    e: FileUploadEvent,
    currentFolder:
      | FolderType<firebase.firestore.DocumentData>
      | null
      | undefined,
    currentUser: firebase.User | null
  ): Promise<void> {
    e.preventDefault();
    e.stopPropagation();

    const files = e.target.files;
    if (files !== null && files.length > 0 && typeof ROOT_FOLDER === "object") {
      const file: File = files[0];
      const parentPath: string =
        ((currentFolder as any)?.path).length > 0
          ? `${(currentFolder as any)?.path.join("/")}`
          : "";

      setUploadingFiles((prevState) => {
        return [
          ...prevState,
          {
            id: generateUUID(),
            name: file.name,
            size: file.size,
            progress: 0,
            error: false,
          },
        ];
      });

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

  return { handleFileUpload, uploadingFiles };
}

// custom method for generating UUIDs
function generateUUID(): string {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
  return uuid;
}
