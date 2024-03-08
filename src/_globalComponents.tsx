import { useId, useState } from "react";
export function UploadInput({
  name,
  accept = ".jpg, .jpeg, .png, .webp",
}: {
  name: string;
  accept?: string;
}) {
  const [image, setImage] = useState<undefined | string>("");
  const id = useId();
  return (
    <div>
      <div className="upload-image-container">
        <input
          name={name}
          type="file"
          title="upload-skill"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
          id={"actual-btn" + id}
          accept={accept}
          hidden
        ></input>
        <label htmlFor={"actual-btn" + id}>
          <span> {image ? image.match(/[^\\]+$/)![0] : "Choose File"}</span>
          <i className="bi bi-upload"></i>
        </label>
      </div>
      <p style={{ textAlign: "center" }}>Upload {name}</p>
    </div>
  );
}

import React, { useMemo } from "react";
import { notification } from "antd";

// const Context = React.createContext({ name: "Default" });

const useNotificationWindow = (threshold = 3) => {
  const [api, notificationHolder] = notification.useNotification({
    stack: {
      threshold,
    },
  });

  const openNotification = (title: string, desc: string, duration = 7) => {
    api.open({
      message: title,
      description: desc,
      duration,
    });
  };

  return { notificationHolder, openNotification };
};

export default useNotificationWindow;

export const Progress = ({
  value,
  foregroundColor = "whitesmoke",
  backgroundColor = "gray",
  variant = "medium",
}: {
  value: number;
  foregroundColor?: string;
  backgroundColor?: string;
  variant?: "small" | "medium" | "large";
}) => {
  let heights = { small: "0.4rem", medium: "0.7rem", large: "1rem" };
  return (
    <div className="flex items-center justify-center my-2 ">
      <div
        className="w-full rounded-full"
        style={{ backgroundColor, height: heights[variant] }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: foregroundColor }}
        ></div>
      </div>
    </div>
  );
};
