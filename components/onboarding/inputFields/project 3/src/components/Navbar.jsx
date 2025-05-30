import React from "react";
import Logo from "../assets/Layer 1.png";

const Navbar = () => {
  return (
    <>
      <div className="h-[48px] mt-[40px] ml-[90px] mr-[90px] flex justify-between items-center w-[1260px]">
        <div>
          <a href="#">
            <img src={Logo} alt="Leaf AI" />
          </a>
        </div>
        <div className="flex">
          <ul className="flex gap-10 items-center">
            <li className="text-[#317B22] font-bold">
              {" "}
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Solutions</a>
            </li>
            <li>
              {" "}
              <a href="#">Product</a>
            </li>
            <li>
              {" "}
              <a href="#">About us</a>
            </li>
            <li>
              {" "}
              <a href="#">Contact</a>
            </li>
            <button className="w-[139px] bg-[#317B22] h-[48px] pt-[12px] pr-[20px] pb-[12px] pl-[20px] text-white rounded-[7px]">
              <a href="#">Get Started</a>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
