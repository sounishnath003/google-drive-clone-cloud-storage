import firebase from "firebase";
import React from "react";
import { FolderType, ROOT_FOLDER } from "../../hooks/useFolder.hook";

interface FolderBreadCrumbsProps {
  currentFolder: FolderType<firebase.firestore.DocumentData> | null | undefined;
}

const FolderBreadCrumbs: React.FC<FolderBreadCrumbsProps> = ({
  currentFolder,
}: FolderBreadCrumbsProps): JSX.Element => {
  // getting folder paths dynamically
  const paths =
    currentFolder && currentFolder.path
    ? [...ROOT_FOLDER.path].concat(...currentFolder.path)
    : [];

    console.log(paths);
    
    
  return (
    <div>
      {currentFolder && (
        <div className="text text-gray-700"> {currentFolder.name} </div>
      )}
      {JSON.stringify(paths)}
    </div>
  );
};

export default FolderBreadCrumbs;
