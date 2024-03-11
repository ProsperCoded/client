import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import backgroundImage from "./assets/background.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
// import Nav from "./components/Nav";
// import Nav from "@/src/components/Nav.tsx";
import { ConfigProvider, message, notification } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { NotificationInstance } from "antd/es/notification/interface";
type NotificationType = "success" | "info" | "warning" | "error";

export const MessageAPIContext = createContext<MessageInstance | undefined>(
  undefined
);
export const NotificationAPIContext = createContext<
  NotificationInstance | undefined
>(undefined);
function App() {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [notificationApi, contextHolder] = notification.useNotification();

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
              colorPrimary: "var(--color-primary)",
              colorText: "whitesmoke",
            },
            Popover: {
              colorBgContainer: "var(--color-secondary)",
              colorBgElevated: "var(--color-secondary)",
            },
            Message: {
              colorBgContainer: "var(--color-secondary)",
              colorBgElevated: "var(--color-secondary)",
              colorText: "whitesmoke",
            },
          },
        }}
      >
        <NotificationAPIContext.Provider value={notificationApi}>
          <MessageAPIContext.Provider value={messageApi}>
            {messageContextHolder}
            <Outlet />
          </MessageAPIContext.Provider>
        </NotificationAPIContext.Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
