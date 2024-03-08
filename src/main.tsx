import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import React, { Suspense } from "react";
// import { Footer } from "antd/es/layout/layout";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav.tsx";
// import Why from "./pages/Why.tsx";
// import About from "./pages/About.tsx";
const About = React.lazy(() => import("./pages/About.tsx"));
const Why = React.lazy(() => import("./pages/Why.tsx"));
const ContactUs = React.lazy(() => import("./pages/ContactUs.tsx"));
const Explorer = React.lazy(() => import("./components/Explorer/Explorer.tsx"));
export const URL_BASE = "http://localhost:3000/";
export function WrapNavAndFooter({ children }: { children?: JSX.Element }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/"
        element={
          <WrapNavAndFooter>
            <Home />
          </WrapNavAndFooter>
        }
      />
      <Route
        path="/about"
        element={
          <WrapNavAndFooter>
            <Suspense fallback={"loading..."}>
              <About />
            </Suspense>
          </WrapNavAndFooter>
        }
      />
      <Route
        path="/why"
        element={
          <WrapNavAndFooter>
            <Suspense fallback={"loading..."}>
              <Why />
            </Suspense>
          </WrapNavAndFooter>
        }
      />
      <Route
        path="/contact-us"
        element={
          <WrapNavAndFooter>
            <Suspense fallback={"loading..."}>
              <ContactUs />
            </Suspense>
          </WrapNavAndFooter>
        }
      />
      <Route
        path="/explorer"
        element={
          <Suspense fallback={"loading..."}>
            <Explorer />
          </Suspense>
        }
      />
    </Route>
  )
);
function Main() {
  return <RouterProvider router={router} />;
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
