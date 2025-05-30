import React from "react";
import Boxer from "../assets/box1.png";
import Green from "../assets/GA.png";
import Boxer1 from "../assets/box2.png";
import Boxer2 from "../assets/box3.png";
import Boxer3 from "../assets/box4.png";

function Card({ icon, title, desc }) {
  return (
    <div>
      <div className="relative box1 w-[297px] h-[271px] rounded-[20px] drop-shadow-md border-1 border-[#00000040]">
        <img
          src={Green}
          alt="green"
          className="absolute w-[36px] h-[36px] top-[45px] left-[140px] "
        />
        <img
          src={icon}
          alt="boxer"
          className="absolute w-[45px] h-[45px] top-[50px] left-[122px]"
        />
        <div className="w-[246px] h-[119px] mt-[116px] ml-[26px] ">
          <h1 className="text-[23px] font-bold leading-[32px] tracking-[-0.5px] ml-[30px] ">
            {title}
          </h1>
          <p className="text-[17px] font-[400] leading-[26px] tracking-[-0.2px] text-center">
            {desc}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
