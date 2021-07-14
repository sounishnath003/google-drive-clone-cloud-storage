import firebase from "firebase";
import React from "react";
import { useAuth } from "../../context/auth.context";
import { FolderType, useFolder } from "../../hooks/useFolder.hook";
import { AddFilesButton, AddFolderButton } from "../Buttons";
import Folder from "../Folder";

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const state = useFolder({ folderId: "iOW7eCrLkpLsjJFnK4Rk" });

  if (currentUser === null || state == null) return <>Loading...</>;
  return (
    <React.Fragment>
      <div className="text-gray-600 text-sm">
        🎉 Hello,<span className="text-indigo-600"> {currentUser.email}</span>!
      </div>

      <div className="my-8">
        <div className="flex space-x-3 flex-row items-center items-md-auto items-lg-auto">
          <div className="flex-1 m-auto"></div>
          <div className="m-auto">
            <AddFolderButton currentFolder={state.folder} />
          </div>
          <div className="m-auto">
            {" "}
            <AddFilesButton />{" "}
          </div>
        </div>

        {/* render out folders */}
        {state.folder && <> {state.folder.name} </>}
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
        {/* render out folders end */}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
