import React from "react";
import Navbar from "./Navbar";
import Wrapper, { WrapperVarient } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVarient;
}

const Layout: React.FC<LayoutProps> = ({ variant = "regular", children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
