import { Outlet } from "react-router-dom";
import Navbar from "./SharedComponents/Navbar";
import Footer from "./SharedComponents/Footer";

const ParentLayout = () => {
  return (
    <div className="">
      <div className="z-10 bg-[#a7dada]">
        <Navbar></Navbar>
      </div>
      <div className={`pt-[68px] min-h-[calc(100vh-300px)] w-11/12 mx-auto`}>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};
// sad

export default ParentLayout;
