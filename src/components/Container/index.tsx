import React from "react";

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return <div className="px-3 py-1">{children}</div>;
};

export default Container;
