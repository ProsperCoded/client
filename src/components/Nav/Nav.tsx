import React, { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import logoSvg from "./../../assets/logo.svg";
import { Link } from "react-router-dom";
// import Link from "react-router-dom";
import navToggler from "../../assets/navtoggler.svg";

const currentOrigin = window.location.origin;
function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  // const navBackgroundColor = useRef({
  //   top: "",
  //   active: "rgba(var(--code-neutral-dark), 0.5)",
  // });
  // useEffect(() => {
  //   const handleScroll = (e: any) => {
  //     console.log("scroll position is at:", window.scrollY, e);
  //     if (
  //       window.scrollY > 100 &&
  //       navRef.current!.style.backgroundColor !=
  //         navBackgroundColor.current.active
  //     ) {
  //       navRef.current!.style.backgroundColor =
  //         navBackgroundColor.current.active;
  //     } else if (
  //       window.scrollY < 5 &&
  //       navRef.current!.style.backgroundColor != navBackgroundColor.current.top
  //     ) {
  //       navRef.current!.style.backgroundColor = navBackgroundColor.current.top;
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  // }, []);
  return (
    <nav className="nav text-sm lg:text-base " ref={navRef}>
      <Link to="/" className="flex flex-nowrap items-center ">
        <ReactSVG src={logoSvg} className="logo cursor-pointer select-none " />
        <span className="logo-label text-wrap">Parcel Share</span>
      </Link>

      <NavLinks className="hidden md:flex" />
      <ThemeToggler />
      <button className="btn btn--primary hidden md:block">
        Login / Sign Up
        <i className="bi bi-box-arrow-in-right mx-2 hidden lg:inline-block"></i>
      </button>
      <div className="relative md:hidden">
        <ReactSVG
          src={navToggler}
          onClick={() => {
            setNavOpen((p) => !p);
          }}
          onBlur={(e) => {
            if (e.relatedTarget?.tagName !== "A") setNavOpen(false);
          }}
          className="cursor-pointer select-none nav__toggler"
          tabIndex={1}
        />
        <div
          className={`bg-secondary rounded-md shadow-md nav__float  rounded-tr-none ${
            navOpen && "nav--open"
          }`}
          tabIndex={1}
        >
          <div className="relative">
            <NavLinks />
            <button className="btn btn--primary  my-4">
              Login / Sign Up
              <i className="bi bi-box-arrow-in-right m-2 "></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`nav__links ${className}`}>
      <li>
        <Link to="/" className="link">
          Home
        </Link>
      </li>
      <li>
        <a href={`${currentOrigin}#features`} className="link">
          Features
        </a>
      </li>
      <li>
        <Link to="/quick-share" className="link">
          Quick Share
        </Link>
      </li>
      <li>
        <Link to="/about" className="link">
          About
        </Link>
      </li>
      <li>
        <Link to="/contact-us" className="link">
          Contact
        </Link>
      </li>
      <li>
        <Link to="/explorer" className="link">
          Explorer
        </Link>
      </li>
    </ul>
  );
}
enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
function ThemeToggler() {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  // const [open,]

  useEffect(() => {
    implementTheme(theme);
  }, [theme]);
  function implementTheme(theme: Theme) {
    // document.documentElement.className = `theme-${theme}`;

    localStorage.setItem("color-theme", theme);
    document.documentElement.classList.remove(
      theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
    document.documentElement.classList.add(theme);
  }
  return (
    <div
      className="theme-container"
      onClick={() => {
        setTheme(() => (theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
      }}
    >
      <div className="theme">
        {theme === Theme.LIGHT ? (
          <i className="bi bi-moon"></i>
        ) : (
          <i className="bi bi-brightness-low"></i>
        )}
      </div>
    </div>
  );
}
export default Nav;
