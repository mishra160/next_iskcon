import React from "react";
import Slider from "@/components/Slider";
import Event from "@/components/Event";
import Devotee from "@/components/Devotee";
import Donation from "@/components/Donation";
import Subscribe from "@/components/Subscribe";

const Home = () => {
  return (
    <>
      <Slider />
      <Event />
      <Devotee />
      <Donation />
      <Subscribe />
    </>
  );
};

export default Home;
