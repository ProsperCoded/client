import React from "react";
import Main from "../components/Main/Main";
import DashboardDisplay from "../components/DashboardDisplay/DashboardDisplay";
import Features from "../components/Features/Features";

function Home() {
  return (
    <div className="home" id="home">
      <Main />
      <DashboardDisplay />
      <Features />
      <p className=" text-center max-w-lg mx-auto mt-10 font-serif italic font-light">
        We look forward to connecting with you and making your ParcelShare
        experience exceptional!
      </p>
    </div>
  );
}

export default Home;
