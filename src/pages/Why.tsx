import React from "react";
import Page from "./Page";
let PitchSummary =
  "Unleash the power of seamless file sharing with ParcelShare! Share files effortlessly, create groups for instant collaboration, and customize access with unique links. Our user-friendly Progressive Web App ensures quick access anytime, anywhere. Plus, enjoy smart storage management for a hassle-free experience. Join ParcelShare for a new era of easy, dynamic file sharing!";
function Why() {
  return (
    <Page
      className="why"
      displayContent1={
        <p>
          Unlock Seamless Collaboration! Welcome to ParcelShare <br />
          Your go-to destination for effortless and dynamic file sharing. Here's
          <br />
          <b>Here Is a list of reasons why we stand out:</b>
        </p>
      }
      displayContent2={
        <div>
          <h1 className="heading">
            ParcelShare:{" "}
            <span className="block">Elevate Your File Sharing</span>
          </h1>
          {PitchSummary}
        </div>
      }
      displayRightColumn={
        <ul className=" flex flex-wrap justify-around w-auto sm:flex-nowrap gap-3 h-full items-center text-sm lg:text-base xl:text-lg list-disc ml-4">
          <li>
            <b>Instant Connectivity:</b> ParcelShare connects you instantly with
            friends and groups, transforming file sharing into a collaborative
            experience.
          </li>
          <li>
            <b>Easy Customization: </b>Tailor your sharing experience with
            unique links, group collaborations, and smart access controls.
            ParcelShare puts you in control.
          </li>
        </ul>
      }
      pageTitle={
        <>
          Why <span className="lg:block">ParcelShare</span>
        </>
      }
      displayLeftColumn={
        <ul className="  flex flex-wrap justify-around w-auto sm:flex-nowrap gap-3 h-full items-center text-sm lg:text-base xl:text-lg list-disc ml-4">
          <li>
            <b> Anytime, Anywhere Access:</b> Our Progressive Web App ensures
            quick accessibility from any device, making your files available
            whenever and wherever you need them.
          </li>
          <li>
            <b>Smart Storage Solutions:</b> Enjoy worry-free file storage with
            ParcelShare's intelligent management. Your files, our priority.
            Experience the future of file sharing with ParcelShare where
            simplicity meets innovation!
          </li>
        </ul>
      }
    >
      <p className=" text-center max-w-lg mx-auto mt-10 font-serif italic font-light">
        We look forward to connecting with you and making your ParcelShare
        experience exceptional!
      </p>
    </Page>
  );
}

export default Why;
