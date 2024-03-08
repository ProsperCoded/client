import { Collapse, CollapseProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./../../assets/3d logo.png";
import LogoName from "./../../assets/logo_name.svg";
function Footer() {
  return (
    <footer className="footer block-container font-secondary">
      <div className="divider"></div>
      <div className="footer--try-app  ">
        <p className="col-start-2 row-start-1 text-center lg:text-start">
          Welcome to ParcelShare your go-to destination for effortless and
          dynamic file sharing.
          <br />
          At ParcelShare, we believe in breaking barriers and making file
          sharing a breeze
        </p>
        <button className="btn btn--primary  col-start-1 row-start-1 text-sm">
          Try ParcelShare Free
        </button>
      </div>
      <div>
        <div className="block-container pt-16">
          <div className="block md:hidden font-semibold">
            <Accordion />
          </div>
          <div className="lg:grid grid-cols-[1fr_2fr] block items-center">
            <div className="hidden lg:flex flex-col justify-between gap-10 border-r-2 border-[var(--color-neutral-light)] items-start">
              <img
                loading="lazy"
                src={Logo}
                alt=""
                className="w-[10rem] mx-auto"
              />
              <img
                src={LogoName}
                loading="lazy"
                alt=""
                className="w-[10rem] mx-auto"
              />
              <p className=" px-2 text-center text-lg font-thin font-serif italic">
                Empowering Connections, One File at a Time{" "}
              </p>
            </div>
            <div className="md:grid-cols-3 md:grid px-4 my-2 hidden relative gap-y-8 ">
              <div className="site-links footer__links-container">
                <h5 className="text-lg font-semibold">Site Links</h5>
                <ul className="flex list-none flex-col ml-3 footer__links ">
                  <li>
                    <Link to="/" className="link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a
                      href={`${window.location.origin}#features`}
                      className="link"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <Link to="/" className="link">
                      Quick Share
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="link">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="my-account footer__links-container">
                <h5 className="text-lg font-semibold">My Account</h5>
                <ul className="flex list-none flex-col ml-3 footer__links ">
                  <li>
                    <Link to="/sign-user" className="link">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    {/* <a href="#features">Sign Out</a> */}
                    <Link to="/sign-user" className="link">
                      Sign Out
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign-user" className="link">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="my-account footer__links-container">
                <h5 className="text-lg font-semibold">Inside Parcel Share</h5>
                <ul className="flex list-none flex-col ml-3 footer__links ">
                  <li>
                    <Link to="/about" className="link">
                      About Us
                    </Link>
                  </li>
                  <li>
                    {/* <a href="#features">Sign Out</a> */}
                    <Link to="/why" className="link">
                      Why Parcel Share
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" className="link">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3 social-links">
                <a href="facebook.com" className="link">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="instagram.com" className="link">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="instagram.com" className="link">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="font-mono w-full bg-primary-dark p-2 mt-2 text-center font-semibold">
          Copyright © 2024 ParcelShare, Inc
        </p>
      </div>
    </footer>
  );
}

function Accordion() {
  // return
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Site Links",
      children: (
        <ul className="flex list-none flex-col ml-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <Link to="/">Quick Share</Link>
          </li>
        </ul>
      ),
    },
    {
      key: "2",
      label: "My Account",
      children: (
        <ul className="flex list-none flex-col ml-3 ">
          <li>
            <Link to="/sign-user">Sign In</Link>
          </li>
          <li>
            {/* <a href="#features">Sign Out</a> */}
            <Link to="/sign-user">Sign Out</Link>
          </li>
          <li>
            <Link to="/sign-user">Sign Up</Link>
          </li>
        </ul>
      ),
    },
    {
      key: "3",
      label: "Inside Parcel Share",
      children: (
        <ul className="flex list-none flex-col ml-3 ">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            {/* <a href="#features">Sign Out</a> */}
            <Link to="/why">Why Parcel Share</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
  );
}
export default Footer;
