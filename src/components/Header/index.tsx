import React from "react";

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <div className="flex flex-wrap flex-row justify-start items-center">
        <div className="m-auto">
          <div className="text-xl text-gray-800">Google Drive</div>
        </div>
        <div className="m-auto flex-1"></div>
      </div>
    </React.Fragment>
  );
};

export default Header;
