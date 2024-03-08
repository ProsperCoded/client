import { Select } from "antd";
import React, { ReactElement, ReactNode } from "react";
type PageProps = {
  className?: String;
  pageTitle: String | JSX.Element;
  displayContent1: String | JSX.Element;
  displayContent2?: String | JSX.Element;
  displayRightColumn: JSX.Element;
  displayLeftColumn?: JSX.Element;
  children?: JSX.Element;
};
function Page({
  className = "",
  pageTitle,
  displayContent1,
  displayContent2,
  displayRightColumn,
  displayLeftColumn,
  children,
}: PageProps) {
  return (
    <div className={`page ${className}`}>
      <div className="display lg:grid flex flex-col">
        <div className="display__header p-5 flex space-y-5 justify-between flex-col">
          <h1 className="display__title self-center md:self-start">
            {pageTitle}
          </h1>
          <div className="display__content-1">{displayContent1}</div>
        </div>
        <div className="display__right-col">{displayRightColumn}</div>
        {displayLeftColumn && (
          <div className="display__left-col ">{displayLeftColumn}</div>
        )}
        {displayContent2 && (
          <div className="display__content-2 p-2 pr-6">{displayContent2}</div>
        )}
      </div>
      {children && <div className="more-content">{children}</div>}
    </div>
  );
}

export default Page;
