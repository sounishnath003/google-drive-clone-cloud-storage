import React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}: HeaderProps) => {
  return (
    <React.Fragment>
      <div className="text-xl px-4 py-2 text-gray-800">Google Drive</div>
    </React.Fragment>
  );
};

export default Header;
