// import React from "react";
// import Topbar from "./components/Topbar";
import BrandingStrip from "./components/BrandingStrip";
import NavMenu from "../navmenu/Navmenu";

const Header = ({ onAccessClick }) => {
  return (
    <div className="w-full">
      {/* <Topbar /> */}
      <BrandingStrip onAccessClick={onAccessClick} />
      <NavMenu />
    </div>
  );
};

export default Header;