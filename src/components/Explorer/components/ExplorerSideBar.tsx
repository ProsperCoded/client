import { ReactSVG } from "react-svg";
import { Progress } from "../../../_globalComponents";
import cloudStoreImage from "../../../assets/anonymous/cloud_storage.svg";
function ExplorerSideBar() {
  return (
    <div className="explorer__side-bar border-r ">
      <div className="overview">
        <h1 className="opacity-70 text-sm select-none">Overview</h1>
        <button className="btn btn--primary text-sm lg:text-base w-full text-center md:text-nowrap">
          <i className="bi bi-bounding-box"></i> Overview Storage
        </button>
      </div>
      <div className="file-manager">
        <h1 className="opacity-70 text-sm select-none pb-2">File Manager</h1>
        <ul className="ml-2 font-secondary space-y-4">
          <li className="cursor-pointer flex justify-between hover:text-primary hover:fill-primary">
            <span className="flex gap-2">
              <ReactSVG src={cloudStoreImage} className="icon" />
              My Storage
            </span>
            <span className="badge">1</span>
          </li>
          <li className="cursor-pointer flex justify-between hover:text-primary">
            <span>
              <i className="bi bi-star"></i>Favorite
            </span>
          </li>
          <li className="cursor-pointer flex justify-between hover:text-primary">
            <span>
              <i className="bi bi-share"></i>Shared Files
            </span>{" "}
            <span className="badge">1</span>
          </li>
        </ul>
      </div>
      <div className="services">
        <h1 className="opacity-70 text-sm select-none pb-2">Services</h1>
        <ul className="ml-2 font-secondary space-y-4">
          <li className="cursor-pointer flex justify-between hover:text-primary">
            <span>
              <i className="bi bi-people"></i>Friends
            </span>{" "}
            <span className="badge">1</span>
          </li>
          <li className="cursor-pointer flex justify-between hover:text-primary">
            <span>
              <i className="bi bi-collection"></i>Groups
            </span>
          </li>
          <li className="cursor-pointer flex justify-between hover:text-primary">
            <span>
              <i className="bi bi-link-45deg"></i>Hashed Links
            </span>{" "}
          </li>
        </ul>
      </div>
      <div>
        <h1 className="opacity-70 text-sm select-none pb-2">More</h1>
        <ul className="ml-2">
          <li className="cursor-pointer flex justify-between hover:text-primary">
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
  );
}
export default ExplorerSideBar;
