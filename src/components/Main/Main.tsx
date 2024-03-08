import React from "react";

import HeroImage from "./../../assets/hero-image.png";
function Main() {
  return (
    <div
      className="h-fit block-container
      flex flex-col gap-y-4 text-sm
  md:grid lg:text-base grid-cols-[2fr_1.5fr] gap-x-2 main"
    >
      <h1 className="intro text-xl md:text-4xl font-semibold font-primary  lg:tracking-wider xl:text-5xl">
        Tired of local storage limitations?
        <br /> ParcelShare revolutionizes file sharing, providing a seamless
        platform designed for swift and effortless sharing.
      </h1>
      <div>
        <div className="max-w-[80%] mx-auto space-y-3 text-center md:text-left">
          <p className=" more-info text-shadow">
            Collaboration is made easy with our cloud storage platform. You can
            easily share files with friends, family, or colleagues, and even
            work on them together in real-time
          </p>
          <button className="btn btn--primary">
            Try ParcelShare for Free{" "}
            <i className="bi bi-arrow-right-circle-fill m-2"></i>
          </button>
        </div>
        <img src={HeroImage} alt="" className="w-full hidden md:block" />
      </div>
    </div>
  );
}

export default Main;
