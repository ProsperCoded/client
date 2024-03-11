import { Progress } from "../../../_globalComponents";
import FilesTableView, { SortingDataActions } from "./FilesTableView";
import imageFrame from "../../../assets/frames/image_frame.png";
import documentFrame from "../../../assets/frames/document_frame.png";
import videoFrame from "../../../assets/frames/video_frame.png";
import othersFrame from "../../../assets/frames/others_frame.png";
import { AllCollections } from "./CollectionDisplay";
import MenuItem from "antd/es/menu/MenuItem";
import { Popover } from "antd";
import React from "react";

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: any,
  type?: "group"
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function ExplorerMain({
  openCollection,
}: {
  openCollection: (value: AllCollections) => void;
}) {
  const dispatcher = React.useRef<null | React.Dispatch<{
    type: SortingDataActions;
    data?: any;
  }>>(null);
  return (
    <div className="explorer__main p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="heading-sm">
          <i className="bi bi-bounding-box"></i> Overview Storage
        </h2>
        <div className="space-x-4">
          <Popover
            title="Choose Sort Operation"
            content={
              <div className="sort-options">
                <ul>
                  <li
                    className="cursor-pointer py-1 px-3 text-stone-50 rounded-md hover:bg-primary"
                    onClick={() => {
                      dispatcher.current!({
                        type: SortingDataActions.SortByName,
                      });
                    }}
                  >
                    Name Ascending
                  </li>
                  <li
                    className="cursor-pointer py-1 px-3 text-stone-50 rounded-md hover:bg-primary"
                    onClick={() => {
                      dispatcher.current!({
                        type: SortingDataActions.SortByNameDescending,
                      });
                    }}
                  >
                    Name Descending
                  </li>
                  <li
                    className="cursor-pointer py-1 px-3 text-stone-50 rounded-md hover:bg-primary"
                    onClick={() => {
                      dispatcher.current!({
                        type: SortingDataActions.SortBySize,
                      });
                    }}
                  >
                    Size Ascending{" "}
                  </li>
                  <li
                    className="cursor-pointer py-1 px-3 text-stone-50 rounded-md hover:bg-primary"
                    onClick={() => {
                      dispatcher.current!({
                        type: SortingDataActions.SortBySizeDescending,
                      });
                    }}
                  >
                    Size Descending{" "}
                  </li>
                </ul>
              </div>
            }
          >
            {/* <Button>TL</Button> */}
            <button className="btn btn--primary bg-slate-400 dark:bg-slate-600 rounded-sm">
              <i className="bi bi-sort-down-alt"></i>
              {/* <i className="bi bi-sort-down"></i> */}
              Sort
            </button>
          </Popover>
          <button className="btn btn--primary bg-slate-400 dark:bg-slate-600 rounded-sm">
            <i className="bi bi-list-ul"></i>
            {/* <i className="bi bi-table"></i> */}
            View
          </button>
          <button className="btn btn--primary">
            <i className="bi bi-plus-circle-dotted"></i>Create
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Collection
            image={imageFrame}
            itemsCount={500}
            occupiesGB={30}
            name="Images"
            color="rgb(226, 57, 57)"
            onClick={() => {
              // console.log("clicked images");
              openCollection(AllCollections.images);
            }}
          />
          <Collection
            image={documentFrame}
            itemsCount={500}
            occupiesGB={30}
            name="Documents"
            color="rgb(60, 60, 252)"
            onClick={() => {
              openCollection(AllCollections.documents);
              // openCollection()
            }}
          />
          <Collection
            image={videoFrame}
            itemsCount={500}
            occupiesGB={40}
            name="Videos"
            color="rgba(0, 211, 0, 0.932)"
            onClick={() => {
              openCollection(AllCollections.videos);
            }}
          />
          <Collection
            image={othersFrame}
            itemsCount={200}
            occupiesGB={80}
            name="Others"
            color="yellowgreen"
            onClick={() => {
              openCollection(AllCollections.others);
            }}
          />
        </div>
        <FilesTableView
          setDispatcher={(value: any) => (dispatcher.current = value)}
        />
      </div>
    </div>
  );
}

function Collection({
  name,
  image,
  itemsCount,
  occupiesGB,
  color,
  onClick,
}: {
  name: string;
  image: string;
  itemsCount: number;
  occupiesGB: number;
  color?: string;
  onClick?: () => void;
}) {
  const capacityGB = 100;
  // const progressValue = useRef<number>(occupiesGB / capacityGB * 100 )
  return (
    <div
      className="collection grid grid-rows-[1fr_auto] font-secondary rounded-md bg-neutral p-3 w-fit h-fit shadow-md cursor-pointer hover:bg-slate-500 transition-colors md:text-sm lg:text-base"
      onClick={onClick}
    >
      <div className="grid grid-cols-[30%_70%] gap-4 items-center">
        <img
          src={image}
          alt=""
          className="collection__image"
          style={
            (color && {
              backgroundColor: color,
            }) ||
            {}
          }
        />
        <div>
          <h6 className="font-semibold capitalize">{name}</h6>
          <h6 className="font-semibold opacity-80">{itemsCount} items</h6>
        </div>
      </div>
      <div className="h-fit">
        <Progress
          value={(occupiesGB / capacityGB) * 100}
          {...(color
            ? {
                foregroundColor: color,
                backgroundColor: "var(--color-neutral-light)",
              }
            : {
                foregroundColor: "var(--color-primary)",
                backgroundColor: "var(--color-primary-light)",
              })}
        />
        <p>
          {occupiesGB}GB of {capacityGB}GB
        </p>
      </div>
    </div>
  );
}
export default ExplorerMain;
