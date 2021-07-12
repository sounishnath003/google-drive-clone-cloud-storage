import React from "react";
import { useAuth } from "../../context/auth.context";
import { useFolder } from "../../hooks/useFolder.hook";
import { AddFilesButton, AddFolderButton } from "../Buttons";

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const state = useFolder();

  console.log({ state });

  if (currentUser === null) return <>Loading...</>;
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
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
