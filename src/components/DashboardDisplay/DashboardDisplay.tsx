import React from "react";
import ExplorerPreview from "./../../assets/file-explorer-preview.png";
import { Progress } from "../../_globalComponents";
import { FileSvg } from "../../utils";
function DashboardDisplay() {
  return (
    <div className="block-container">
      <h2 className="block-container__heading highlight"> Explore Dashboard</h2>
      <div className="dashboard-display flex flex-col text-sm gap-4 md:gap-[2%] md:grid grid-cols-3 lg:grid-cols-[1fr_1.5fr_1fr] items-center md:items-start container">
        <div className="bg-primary p-3 rounded-md text-white shadow-lg  col-start-2 ">
          <p className="text-sm text-center md:text-base lg:text-lg my-2">
            Your Files are always safe & accessible
          </p>
          <img src={ExplorerPreview} alt="" className="w-full" />
        </div>
        <FirstTab />
        <SupportedFiles />
      </div>
    </div>
  );
}
function FirstTab() {
  return (
    <div className="p-6 bg-neutral flex flex-col justify-evenly rounded-md shadow-lg col-start-1 row-start-1">
      <div>
        <p>Document</p>
        <Progress
          value={60}
          foregroundColor="var(--color-primary)"
          backgroundColor="var(--color-primary-light)"
        />
      </div>
      <div>
        <p>Video</p>
        <Progress
          value={40}
          foregroundColor="var(--color-primary)"
          backgroundColor="var(--color-primary-light)"
        />
      </div>
      <div>
        <p>Image</p>
        <Progress
          value={90}
          foregroundColor="var(--color-primary)"
          backgroundColor="var(--color-primary-light)"
        />
      </div>
      <div>
        <p>Others</p>
        <Progress
          value={55}
          foregroundColor="var(--color-primary)"
          backgroundColor="var(--color-primary-light)"
        />
      </div>
      <p className="text-sm py-2 text-center md:text-left md:text-base lg:text-lg">
        Your Files are always safe & accessible
      </p>
    </div>
  );
}
function SupportedFiles() {
  const FileBox = ({
    fileType,
    className = "",
  }: {
    fileType: string;
    className?: string;
  }) => {
    return (
      <div
        className={`supported-file border-slate-400 border-2 bg-slate-600 p-2 my-2 gap-2 rounded-md grid grid-cols-[auto_1fr] justify-items-center items-center shadow-lg`}
      >
        <div className={`file-image w-8 row-span-2 `} data-filetype={fileType}>
          <FileSvg fill="whitesmoke" stroke="gray" />
        </div>
        <span className="bg-slate-500 w-[90%] h-3  block justify-self-start rounded-md"></span>
        <span className="bg-slate-500 w-[60%] h-3  block justify-self-start rounded-md"></span>
      </div>
    );
  };
  return (
    <div className="supported-files min-w-[20vw] w-full mx-auto max-w-[70vw] bg-neutral p-3 rounded-2sm shadow-lg">
      <p className="text-sm text-center md:text-base lg:text-lg my-2">
        We Support all File format and Lots of Features
      </p>
      <div className=" max-h-[30vh] xl:max-h-[40vh] overflow-y-auto min-w-fit overflow-x-hidden">
        <FileBox fileType="svg" />
        <FileBox fileType="pdf" />
        <FileBox fileType="mp3" />
        <FileBox fileType="mp4" />
        <FileBox fileType="png" />
        <FileBox fileType="jpg" />
        <FileBox fileType="webp" />
        <FileBox fileType="pdf" />
      </div>
    </div>
  );
}
export default DashboardDisplay;
