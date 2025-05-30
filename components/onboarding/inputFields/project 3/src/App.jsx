import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Explore from "./components/explore";
import Aboutus from "./components/Aboutus";
import Feat from "./components/Feat";
import How from "./components/How";
import Pricing from "./components/Pricing";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Explore />
      <Aboutus />
      <Feat />
      <How />
      <Pricing />
    </>
  );
};

export default App;
