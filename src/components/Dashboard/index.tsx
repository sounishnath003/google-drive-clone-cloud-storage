import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useFolder } from "../../hooks/useFolder.hook";
import FolderBreadCrumbs from "../BreadCrumbs";
import ButtonBars from "./ButtonBars";
import FolderRenderer from "./FolderRenderer";

const Dashboard: React.FC = () => {
  // get param from url
  const param = useParams() as { folderId: string };
  // get currentuser
  const { currentUser } = useAuth();

  // get folder from useFolder hook state
  const state = useFolder({
    folderId: param.folderId || null,
  });

  if (currentUser === null || state == null) return <>Loading...</>;

  return (
    <React.Fragment>
      <div className="text-gray-600 text-sm">
        🎉 Hello,<span className="text-indigo-600"> {currentUser.email}</span>!
      </div>

      <div className="my-8">
        <ButtonBars state={state} />
        <FolderBreadCrumbs currentFolder={state.folder} />
        <FolderRenderer state={state} />
        {/* render out folders end */}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
