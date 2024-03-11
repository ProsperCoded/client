import { ReactSVG } from "react-svg";
import { Progress } from "../../../_globalComponents";
import cloudStoreImage from "../../../assets/anonymous/cloud_storage.svg";
import { AllCollections } from "./CollectionDisplay";
import React from "react";
function ExplorerSideBar({
  overViewStorage,
  openCollection,
}: {
  overViewStorage: Function;
  openCollection: (value: AllCollections) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={`explorer__sidebar border-r  absolute lg:relative lg:translate-x-0 h-full ${
        !open && "left-0 translate-x-[-101%]"
      }`}
      // style={open ? {} : { left: "0", transform: "translateX(-101%)" }}
      tabIndex={1}
      onBlur={() => {
        setOpen(false);
      }}
    >
      <div className="relative h-full">
        <button
          className="btn bg-primary-dark text-stone-50 rounded-full sidebar--controller lg:hidden flex absolute"
          onClick={() => {
            setOpen((p) => !p);
          }}
        >
          <i
            className={`bi bi-arrow-left-circle p-0 m-auto hover:scale-110 ${
              !open && "icon-left"
            }`}
          ></i>
        </button>

        <div className="sidebar__content h-full">
          <div className="overview">
            <h1 className="opacity-70 text-sm select-none pb-2">Overview</h1>
            <ul className="tab">
              <li>
                <button
                  className="btn btn--primary text-sm lg:text-base w-full text-center md:text-nowrap"
                  onClick={() => {
                    overViewStorage();
                  }}
                >
                  <i className="bi bi-bounding-box "></i> Overview Storage
                </button>
              </li>
              <li
                className="tab__item"
                onClick={() => openCollection(AllCollections.images)}
              >
                <span>
                  <i className="bi bi-images"></i>Images
                </span>
              </li>
              <li
                className="tab__item"
                onClick={() => openCollection(AllCollections.videos)}
              >
                <span>
                  <i className="bi bi-play-circle"></i>Videos
                </span>
              </li>
              <li
                className="tab__item"
                onClick={() => openCollection(AllCollections.documents)}
              >
                <span>
                  <i className="bi bi-file-earmark-richtext"></i>Documents
                </span>
              </li>
              <li
                className="tab__item"
                onClick={() => openCollection(AllCollections.others)}
              >
                <span>
                  <i className="bi bi-file-binary"></i>Others
                </span>
              </li>
            </ul>
          </div>
          <div className="file-manager">
            <h1 className="opacity-70 text-sm select-none pb-2">
              File Manager
            </h1>
            <ul className="tab">
              <li className="tab__item hover:fill-primary">
                <span className="flex gap-2">
                  <ReactSVG src={cloudStoreImage} className="icon" />
                  My Storage
                </span>
                <span className="badge">1</span>
              </li>
              <li className="tab__item">
                <span>
                  <i className="bi bi-star"></i>Favorite
                </span>
              </li>
              <li className="tab__item">
                <span>
                  <i className="bi bi-share"></i>Shared Files
                </span>{" "}
                <span className="badge">1</span>
              </li>
            </ul>
          </div>
          <div className="services">
            <h1 className="opacity-70 text-sm select-none pb-2">Services</h1>
            <ul className="tab">
              <li className="tab__item">
                <span>
                  <i className="bi bi-people"></i>Friends
                </span>{" "}
                <span className="badge">1</span>
              </li>
              <li className="tab__item">
                <span>
                  <i className="bi bi-collection"></i>Groups
                </span>
              </li>
              <li className="tab__item">
                <span>
                  <i className="bi bi-link-45deg"></i>Hashed Links
                </span>{" "}
              </li>
            </ul>
          </div>
          <div>
            <h1 className="opacity-70 text-sm select-none pb-2">More</h1>
            <ul className="tab">
              <li className="tab__item">
                <span className="flex gap-2">
                  <ReactSVG src={cloudStoreImage} className="icon" />
                  My Storage
                </span>{" "}
                <span> 50%</span>
              </li>
              <li>
                <Progress
                  value={80}
                  foregroundColor="var(--color-primary-light)"
                  backgroundColor="var(--color-primary)"
                  variant="small"
                />
              </li>
              <li>
                <button className="btn btn--primary text-sm lg:text-base w-full ">
                  Upgrade Plan
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExplorerSideBar;
