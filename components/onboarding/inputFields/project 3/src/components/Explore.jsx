import React from "react";
import Boxer from "../assets/box1.png";
import Green from "../assets/GA.png";
import Boxer1 from "../assets/box2.png";
import Boxer2 from "../assets/box3.png";
import Boxer3 from "../assets/box4.png";
import Card from "./Card";

const Explore = () => {
  const cardsContent = [
    {
      icon: Boxer,
      title: "AI-Driven Insights",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
    {
      icon: Boxer1,
      title: "Unified Search Experience",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
    {
      icon: Boxer2,
      title: "Boosted Productivity",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
    {
      icon: Boxer3,
      title: "Secure & Complaint",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
    {
      icon: Boxer,
      title: "AI-Driven Insights",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
    {
      icon: Boxer1,
      title: "Unified Search Experience",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
    {
      icon: Boxer2,
      title: "Boosted Productivity",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
    {
      icon: Boxer3,
      title: "Secure & Complaint",
      desc: " With lots of unique blocks, you can easily build a page without coding.",
    },
  ];

  const renderCards = () => {
    return cardsContent.map((card, index) => (
      <Card key={index} icon={card.icon} title={card.title} desc={card.desc} />
    ));
  };

  return (
    <>
      <div className="w-[1260px] h-[482px] mx-[92px] mt-[150px]">
        <div className="container flex justify-between w-[1260px] h-[142px] ">
          <div className="heading w-[555px] h-[120px]">
            <h1 className="text-[48px] font-bold leading-[60px] tracking-[-1.2px]">
              Let’s Explore our Top
            </h1>
            <h1 className="text-[48px] font-bold leading-[60px] tracking-[-1.2px]">
              Key Features
            </h1>
          </div>
          <div className="side w-[566px] h-[141px] rounded-[10px]">
            <p className="text-[20px] font-[400] leading-[32px] tracking-[-0.2px]">
              LeafAI Search sprouted from a simple idea: make enterprise
              knowledge as easy to find as a Google search
            </p>
            <button className="btn w-[165px] h-[56px] bg-[#317B22] rounded-[10px] text-white mt-[9px]">
              Get Started
            </button>
          </div>
        </div>
        <div className="w-[1260px]  mt-[69px] flex flex-wrap gap-5 justify-between">
          {renderCards()}
          {/* <div className="w-[297px] h-[271px] rounded-[20px] drop-shadow-md border-1 border-[#00000040] ">
            <img
              src={Green}
              alt="green"
              className="absolute w-[36px] h-[36px] top-[45px] left-[140px] "
            />
            <img
              src={Boxer1}
              alt="boxer1"
              className="absolute w-[45px] h-[45px] top-[50px] left-[122px]"
            />
            <div className="w-[270px] h-[119px]  mt-[116px] ml-[15px] ">
              <h1 className="text-[23px] font-bold leading-[32px] tracking-[-0.5px] ml-[0px]">
                Unified Search Experience
              </h1>
              <p className="text-[17px] font-[400] leading-[26px] tracking-[-0.2px] text-center w-[246px]">
                With lots of unique blocks, you can easily build a page without
                coding.{" "}
              </p>
            </div>
          </div>
          <div className="w-[297px] h-[271px] rounded-[20px] drop-shadow-md border-1 border-[#00000040]">
            <img
              src={Green}
              alt="green"
              className="absolute w-[36px] h-[36px] top-[45px] left-[140px] "
            />
            <img
              src={Boxer2}
              alt="boxer2"
              className="absolute w-[45px] h-[45px] top-[50px] left-[122px]"
            />
            <div className="w-[246px] h-[119px]  mt-[116px] ml-[26px] ">
              <h1 className="text-[23px] font-bold leading-[32px] tracking-[-0.5px] ml-[30px] ">
                Boosted Productivity
              </h1>
              <p className="text-[17px] font-[400] leading-[26px] tracking-[-0.2px] text-center">
                With lots of unique blocks, you can easily build a page without
                coding.{" "}
              </p>
            </div>
          </div>
          <div className="w-[297px] h-[271px] rounded-[20px] drop-shadow-md border-1 border-[#00000040]">
            <img
              src={Green}
              alt="green"
              className="absolute w-[36px] h-[36px] top-[45px] left-[140px] "
            />
            <img
              src={Boxer3}
              alt="boxer4"
              className="absolute w-[45px] h-[45px] top-[50px] left-[122px]"
            />
            <div className="w-[246px] h-[119px]  mt-[116px] ml-[26px] ">
              <h1 className="text-[23px] font-bold leading-[32px] tracking-[-0.5px] ml-[30px] ">
                Secure & Complaint
              </h1>
              <p className="text-[17px] font-[400] leading-[26px] tracking-[-0.2px] text-center">
                With lots of unique blocks, you can easily build a page without
                coding.{" "}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Explore;
