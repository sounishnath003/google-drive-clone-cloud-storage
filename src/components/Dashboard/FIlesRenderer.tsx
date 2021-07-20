import React from "react";
import { FileIcon } from "../../Assets/Icons";
import { FolderState } from "../../hooks/useFolder.hook";

interface FilesendererProps {
  state: FolderState;
}

const FilesRenderer: React.FC<FilesendererProps> = ({
  state,
}: FilesendererProps) => {
  return (
    <React.Fragment>
      {state.childFiles.length > 0 && state.childFolders && (
        <div className="my-2">
          {" "}
          <hr />{" "}
        </div>
      )}
      {state.childFiles.length > 0 && (
        <div className="my-8 text-gray-700">
          <div className="flex items-center space-x-4 items-md-auto items-lg-auto">
            {state.childFiles.map((file: any) => (
              <a key={file.id} href={file.url} rel="noreferrer" target="_blank">
                <div className="p-3 hover:shadow-md hover:border-blue-700 hover:bg-blue-50 transition-all delay-75 hover:text-blue-600 cursor-pointer flex flex-row rounded space-x-3 border">
                  <div className="m-auto">
                    {" "}
                    <FileIcon size={20} color={"currentColor"} />{" "}
                  </div>
                  <div className="m-auto truncate"> {file.name} </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default FilesRenderer;
