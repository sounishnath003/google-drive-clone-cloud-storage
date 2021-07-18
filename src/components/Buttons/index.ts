import firebase from "firebase";
import { FolderType } from "../../hooks/useFolder.hook";
import AddFilesButton from "./AddFilesButton";
import AddFolderButton from "./AddFolderButton";

export { AddFolderButton, AddFilesButton };

export interface ButtonProps {
  currentFolder: FolderType<firebase.firestore.DocumentData> | null | undefined;
}
