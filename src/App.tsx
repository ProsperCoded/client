import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import backgroundImage from "./assets/background.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
// import Nav from "./components/Nav";
// import Nav from "@/src/components/Nav.tsx";
import { ConfigProvider } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <ConfigProvider
        theme={{
          token: {
            colorText: "var(--color-neutral-light)",
            colorPrimary: "var(--color-primary)",
            colorPrimaryHover: "var(--color-primary-light)",
            colorSplit: "white",
            colorFillSecondary: "var(--color-secondary)",
            colorFillTertiary: "var(--color-secondary)",
            borderRadius: 6,
            // colorText: "var(--color-light)",
            colorBgContainer: "var(--color-secondary-transparent)",
            colorFill: "var(--color-secondary)",

            // Alias Token
          },

          components: {
            Collapse: {
              contentBg: "var(--color-primary)",
              headerBg: "var(--color-primary-dark)",

              colorText: "var(--color-neutral-light)",
            },
            Button: {
              colorBgContainer: "var(--color-primary)",
              colorFill: "var(--color-secondary)",
              // colorBgElevated: "var(--color-secondary)",
            },
            Segmented: {
              trackBg: "var(--color-secondary)",
              itemSelectedBg: "var(--color-primary)",

              itemColor: "rgb(255, 255, 244)",
              itemSelectedColor: "rgb(255, 255, 244)",
              itemHoverColor: "rgb(255, 255, 244)",
            },
            Input: {
              colorTextPlaceholder: "rgba(255, 255, 244, 0.3)",
              addonBg: "var(--color-primary)",
              colorText: "rgb(255, 255, 244)",
            },
            Checkbox: {
              // check
              // colorBgContainer: "var(--color-primary)",
              // colorBgElevated: "var(--color-primary)",
              // colorFill: "var(--color-primary)",
              // colorPrimaryActive: "var(--color-primary)",
              colorPrimary: "var(--color-primary)",
              colorText: "whitesmoke",
            },
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </div>
  );
}

export default App;
