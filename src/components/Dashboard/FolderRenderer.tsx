import firebase from "firebase";
import React from "react";
import { FolderState, FolderType } from "../../hooks/useFolder.hook";
import Folder from "../Folder";

interface FolderRendererProps {
  state: FolderState;
}

const FolderRenderer: React.FC<FolderRendererProps> = ({
  state,
}: FolderRendererProps): JSX.Element => {
  return (
    <React.Fragment>
      {state.childFolders.length > 0 && (
        <div className="my-8 text-gray-700">
          <div className="flex items-center space-x-4 items-md-auto items-lg-auto">
            {state.childFolders.map(
              (folder: FolderType<firebase.firestore.DocumentData>) => (
                <Folder folder={folder} key={folder.id} />
              )
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default FolderRenderer;
