"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const routes = ["/medical-professional", "/ai-chatbot", "/student"];

  const handleChatBotRedirect = () => {
    setClicked(!clicked);
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    router.push(randomRoute);
  };

  const handleClick = () => {
    router.push("/onboarding/sectionCode");
    return;
  };

  return (
    <div className="relative px-[32px] md:px-[64px] flex flex-col  pt-[40px] min-h-screen bg-[#F6F6F2]">
      <div className=" absolute left-6 top-6">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      <div className="flex flex-col justify-between flex-grow items-center mt-[100px]">
        <p className="text-[32px] leading-[38px] font-semibold text-[#000000] ">
          Welcome to the
        </p>
        <div>
          <Image src="/logo3.svg" width={365} height={80} alt="logo" />
        </div>
        <button
          onClick={() => {
            setClicked(!clicked);
            handleClick();
          }}
          className="bg-gradient-to-r flex items-center text-[16px] sm:text-[24px] leading-[29px] font-bold text-white px-[20px] sm:px-[40px] py-[16.5px]  gap-2 rounded-[99px] from-[#28AAE1] via-[#0364B3] to-[#012B4D]"
        >
          {"Let's Get Started"}
          <Image src="/arrow-right.svg" width={28} height={28} alt="arrow" />
        </button>
        <button
          onClick={handleChatBotRedirect}
          className="bg-gradient-to-r flex items-center text-[16px] sm:text-[24px] leading-[29px] font-bold text-white px-[20px] sm:px-[40px] py-[16.5px]  gap-2 rounded-[99px] from-[#28AAE1] via-[#0364B3] to-[#012B4D]"
        >
          {"Let's Chat "}
          <Image src="/arrow-right.svg" width={28} height={28} alt="arrow" />
        </button>

        <Image src="/hands.svg" width={471} height={471} alt="logo" />
      </div>
    </div>
  );
}
