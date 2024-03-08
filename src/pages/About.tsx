import React from "react";

import pic1Image from "./../assets/workers/pic1.jpg";
import pic2Image from "./../assets/workers/pic2.jpg";
import pic3Image from "./../assets/workers/pic3.jpg";
import Page from "./Page";
import { Divider } from "antd";
function About() {
  return (
    <>
      <Page
        className="about"
        pageTitle={
          <>
            About <span className="lg:block">Us</span>
          </>
        }
        displayContent1={
          <>
            Welcome to ParcelShare, where file sharing meets simplicity and
            collaboration!
            <Divider orientation="left">
              <h2 className="heading-sm">Vision</h2>
            </Divider>
            At ParcelShare, we believe in breaking barriers and making file
            sharing a breeze. Founded by Prosper Enwerem, our journey began with
            a vision to redefine how individuals connect and collaborate in the
            digital realm.
          </>
        }
        displayContent2={
          <>
            <h1 className="heading">Our Story </h1> Inspired by the need for a
            user-friendly and efficient file sharing platform, ParcelShare was
            born. The driving force behind our creation was a passion for
            database management and a desire to explore innovative features that
            enhance the sharing experience.
          </>
        }
        displayRightColumn={
          <>
            {" "}
            <div className="heading text-center sm:text-start">Staffs</div>
            <div className="staffs mx-auto">
              <div>
                <div className="staff">
                  <img src={pic1Image} alt="" className="" />
                  <div>
                    <span className="staff__name">Daniel Frank</span>
                    <span className="font-semibold mx-2">CEO</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="staff ">
                  <img src={pic2Image} alt="" />
                  <div>
                    <span className="staff__name">Yekini Present</span>
                    <span className="font-semibold mx-2">CTO</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="staff ">
                  <img src={pic3Image} alt="" />
                  <div>
                    <span className="staff__name">Yekini Present</span>
                    <span className="font-semibold mx-2">CTO</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        displayLeftColumn={
          <div>
            <h1 className="heading text-3xl">What Sets Us Apart</h1>
            <ul className="flex gap-5 px-4 flex-wrap md:flex-nowrap list-disc">
              <li>
                <b>User-Centric Approach: </b>
                We prioritize your needs, ensuring a seamless and enjoyable file
                sharing experience. ParcelShare is designed with simplicity in
                mind, making it accessible to everyone.
              </li>
              <li>
                <b> Cutting-Edge Features: </b>Our platform goes beyond
                conventional file sharing. With features like instant group
                collaboration, customizable access controls, and a Progressive
                Web App for on-the-go accessibility, we're shaping the future of
                digital collaboration.
              </li>
              <li>
                <b>Smart Storage Management:</b> We understand the importance of
                space. ParcelShare optimizes storage by intelligently managing
                files, providing a worry-free environment for our users.
              </li>
            </ul>
          </div>
        }
      >
        <>
          <div className="block-container flex flex-col lg:grid grid-cols-2 gap-[5vw] text-lg text-shadow">
            <div>
              <h1 className="block-container__heading highlight">
                Our Commitment
              </h1>
              <p>
                As a team, we are committed to constant improvement and
                innovation. We value user feedback and actively seek ways to
                enhance ParcelShare's functionality and user experience.
              </p>
            </div>
            <div>
              <h1 className="block-container__heading highlight">
                Join the ParcelShare Community
              </h1>
              <p>
                Whether you're a freelancer, student, or business professional,
                ParcelShare is here to simplify your file sharing needs. Join
                our community today and experience a new era of efficient,
                dynamic collaboration. Thank you for being a part of the
                ParcelShare journey!
                <br />
                <span className="font-bold">
                  Prosper Founder,
                  <br />
                  ParcelShare
                </span>
              </p>
            </div>
          </div>
          <p className=" text-center max-w-lg mx-auto mt-10 font-serif italic font-light">
            We look forward to connecting with you and making your ParcelShare
            experience exceptional!
          </p>
        </>
      </Page>
    </>
  );
}

export default About;
