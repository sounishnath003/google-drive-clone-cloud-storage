import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Link to={"/"}>
        <div className="flex flex-wrap flex-row justify-start items-center">
          <div className="m-auto">
            <div className="text-xl text-gray-800">Google Drive</div>
          </div>
          <div className="m-auto flex-1"></div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Header;
