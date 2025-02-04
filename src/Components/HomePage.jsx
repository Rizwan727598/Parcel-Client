import React from "react";
// import Navbar from "./Navbar";
import Banner from "./Banner";
// import Features from "./FeaturesAndStats";
// import Statistics from "./Statistics";
import Footer from "./Footer";
import TopDeliveryMen from "./TopDeliveryMen";
import FeaturesAndStats from "./FeaturesAndStats";

const HomePage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Banner />
      <FeaturesAndStats />
      {/* <Statistics /> */}
      <TopDeliveryMen></TopDeliveryMen>
      <Footer />
    </div>
  );
};

export default HomePage;
