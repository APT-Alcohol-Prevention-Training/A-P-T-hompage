import React from "react";
import BG from "../assets/back.png";
import Im1 from "../assets/1.png";
import Im2 from "../assets/2.png";
import Im3 from "../assets/3.png";
import Im5 from "../assets/5.png";
import Im6 from "../assets/6.png";

const Hero = () => {
  return (
    <>
      <div className="container h-[558px] mt-[104px] ml-[90px] mr-[90px] relative w-[1260px] rounded-[15px]">
        <img src={BG} alt="background" className="w-full h-full object-cover" />
        <img
          src={Im1}
          alt="img1"
          className="absolute top-[60px] left-[225px] w-[75px] h-[75px]"
        />
        <img
          src={Im2}
          alt="img2"
          className="absolute top-[279px] left-[125px] w-[75px] h-[75px]"
        />
        <img
          src={Im3}
          alt="img3"
          className="absolute bottom-[60px] left-[225px] w-[75px] h-[75px]"
        />

        <div className="absolute w-[807px] top-[69px] h-[394px] left-[225px] right-[225px]">
          <h1 className="text-[60px] font-black w-[807px] h-[160px] mt-[47px]">
            Unlock Your Organization's Knowledge with{" "}
            <span className="text-[60px] font-black text-[#368E22]">
              LeafAI
            </span>
          </h1>
          <p className="text-[20px] font-sans text-[#6D6D6D] mt-[25px]">
            Discover the power of intelligent search across your entire digital
            workspace. LeafAI Search connects Confluence, SharePoint, and all
            your documents into one intuitive platform.{" "}
          </p>
        </div>
        <div>
          <button className="w-[165px] h-[56px] rounded-[7px] bg-[#317B22] text-white absolute bottom-[126px] left-[460px] cursor-pointer">
            Get Started
          </button>
          <button className="absolute w-[152px] h-[56px] rounded-[7px] border-[1px] border-[#368E22] text-[#368E22] bottom-[126px] right-[460px] cursor-pointer">
            See Demo
          </button>
        </div>
        <img
          src={Im3}
          alt="img4"
          className="absolute top-[60px] right-[225px] w-[75px] h-[75px]"
        />
        <img
          src={Im5}
          alt="img5"
          className="absolute top-[279px] right-[125px] w-[75px] h-[75px]"
        />
        <img
          src={Im6}
          alt="img6"
          className="absolute bottom-[60px] right-[225px] w-[75px] h-[75px]"
        />
      </div>
    </>
  );
};

export default Hero;
