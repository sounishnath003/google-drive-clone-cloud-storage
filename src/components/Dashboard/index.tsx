import React from "react";
import { useAuth } from "../../context/auth.context";
import { AddFilesButton, AddFolderButton } from "../Buttons";

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  if (currentUser === null) return <>Loading...</>;
  return (
    <React.Fragment>
      <div>Hello, {currentUser.email}!</div>

      <div className="my-8">
        <div className="flex space-x-3 flex-row items-center items-md-auto items-lg-auto">
          <div className="flex-1 m-auto"></div>
          <div className="m-auto">
            <AddFolderButton />
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
