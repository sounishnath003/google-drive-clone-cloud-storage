import firebase from "firebase";
import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <div className="flex flex-row space-x-3 justify-start items-center">
      {paths.map((folder: { name: string; id: string }) => (
        <Link
          to={`/folder/${folder.id}`}
          key={folder.id}
          className="text text-gray-700 hover:text-blue-600"
        >
          {" "}
          {folder.name}
          {"  "} /
        </Link>
      ))}
      {currentFolder && (
        <div className="text text-gray-700"> {currentFolder.name} </div>
      )}
    </div>
  );
};

export default FolderBreadCrumbs;
