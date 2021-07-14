import firebase from "firebase";
import React from "react";

interface FolderProps {
  folder: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
}

const Folder = ({ folder }: FolderProps): JSX.Element => {
  return <div> {folder.name} </div>;
};

export default Folder;
