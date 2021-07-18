import React from "react";
import { AddFolderButton } from "..";
import { FolderState } from "../../hooks/useFolder.hook";
import { AddFilesButton } from "../Buttons";

interface ButtonBarsProps {
  state: FolderState;
}

const ButtonBars: React.FC<ButtonBarsProps> = ({
  state,
}: ButtonBarsProps): JSX.Element => {
  return (
    <div className="flex space-x-3 flex-row items-center items-md-auto items-lg-auto">
      <div className="flex-1 m-auto"></div>
      <div className="m-auto">
        <AddFolderButton currentFolder={state.folder} />
      </div>
      <div className="m-auto">
        {" "}
        <AddFilesButton currentFolder={state.folder} />{" "}
      </div>
    </div>
  );
};

export default ButtonBars;
