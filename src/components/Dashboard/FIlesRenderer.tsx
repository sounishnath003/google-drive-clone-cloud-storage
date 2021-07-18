import React from "react";
import { FolderState } from "../../hooks/useFolder.hook";

interface FilesendererProps {
  state: FolderState;
}

const FilesRenderer: React.FC<FilesendererProps> = ({
  state,
}: FilesendererProps) => {
  return (
    <React.Fragment>
      {state.childFiles.length > 0 && (
        <div className="my-8 text-gray-700">
          <div className="flex items-center space-x-4 items-md-auto items-lg-auto">
            {state.childFiles.map((file: any) => (
              <div key={file.id}> {file.name} </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default FilesRenderer;
