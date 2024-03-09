import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logoSvg from "./../../assets/logo.svg";
import { Avatar, Checkbox } from "antd";
import Search from "antd/es/input/Search";
import { Progress } from "../../_globalComponents";
import imageFrame from "../../assets/frames/image_frame.png";
import documentFrame from "../../assets/frames/document_frame.png";
import videoFrame from "../../assets/frames/video_frame.png";
import othersFrame from "../../assets/frames/others_frame.png";
import cloudStoreImage from "../../assets/anonymous/cloud_storage.svg";
import { FileSvg, FileSvgIcon, getExtension } from "../../utils";
import _ from "lodash";
import {
  File,
  Directory,
  MapStore,
  filesTableViewDataType,
  fileTableViewDataType,
} from "../../types";
const FilesContext = createContext<[(File | Directory)[], Function]>([
  [],
  () => {},
]);
function Explorer() {
  const [files, setFiles] = useState(filesData);
  const [filteredFiles, setFilteredFiles] = useState(files);
  useEffect(() => {
    console.log("files changed", files);
  }, [files]);
  return (
    <FilesContext.Provider value={[filteredFiles, setFiles]}>
      <div className="explorer ">
        <ExplorerNav />
        <div className="grid grid-cols-[20%_80%] min-h-full">
          <ExplorerSideBar />
          <ExplorerMain />
        </div>
      </div>
    </FilesContext.Provider>
  );
}

export default Explorer;
function ExplorerMain() {
  return (
    <div className="explorer__main p-4 space-y-4">
      <div className="flex justify-between ">
        <h2 className="heading-sm">
          <i className="bi bi-bounding-box"></i> Overview Storage
        </h2>

        <div className="space-x-4">
          <button className="btn btn--primary bg-slate-400 dark:bg-slate-600 rounded-sm">
            <i className="bi bi-sort-down-alt"></i>
            {/* <i className="bi bi-sort-down"></i> */}
            Sort
          </button>
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
        <div className="grid grid-cols-4 gap-4">
          <Collection
            image={imageFrame}
            itemsCount={500}
            occupiesGB={30}
            name="Image"
            color="rgb(226, 57, 57)"
          />
          <Collection
            image={documentFrame}
            itemsCount={500}
            occupiesGB={30}
            name="Document"
            color="rgb(60, 60, 252)"
          />
          <Collection
            image={videoFrame}
            itemsCount={500}
            occupiesGB={40}
            name="Video"
            color="rgba(0, 211, 0, 0.932)"
          />
          <Collection
            image={othersFrame}
            itemsCount={200}
            occupiesGB={80}
            name="Others"
            color="yellowgreen"
          />
        </div>
        <FilesTableView />
      </div>
    </div>
  );
}

enum SortingDataActions {
  SortByName,
  SortByNameDescending,
  SortBySize,
  SortBySizeDescending,
  DeleteSelected,
  SelectFile,
  AllSelection,
}
enum SortRule {
  Default,
  SortByName,
  SortByNameDescending,
  SortBySize,
  SortBySizeDescending,
}
// function File({name, fileSize, sharedTo}:{name:string}){
//   return ()
// }
const filesData: (File | Directory)[] = [
  {
    id: "1",
    type: "file",
    name: "image_frame.png",
    fileSizeKilobyte: 100,
    sharedTo: 100,
    lastModified: "2021-01-01",
  },
  {
    id: "2",
    type: "file",
    name: "document_frame.png",
    fileSizeKilobyte: 100,
    sharedTo: 100,
    lastModified: "2021-01-01",
  },
  {
    id: "3",
    type: "file",
    name: "video_frame.png",
    fileSizeKilobyte: 100,
    sharedTo: 100,
    lastModified: "2021-01-01",
  },
  {
    id: "4",
    type: "file",
    name: "others_frame.png",
    fileSizeKilobyte: 100,
    sharedTo: 66,
    lastModified: "2021-01-01",
  },
  {
    id: "5",
    type: "file",
    name: "image_frame.png",
    fileSizeKilobyte: 442,
    sharedTo: 12,
    lastModified: "2021-01-01",
  },
  {
    id: "6",
    type: "directory",
    name: "document_frame",
    fileSizeKilobyte: 33,
    sharedTo: 100,
    lastModified: "2021-01-01",
    content: [
      {
        id: "7",
        type: "directory",
        name: "image_frame",
        fileSizeKilobyte: 4444,
        sharedTo: 100,
        content: [
          {
            id: "7",
            type: "file",
            name: "image_frame",
            fileSizeKilobyte: 4444,
            sharedTo: 100,
            lastModified: "2021-01-01",
          },
        ],
        lastModified: "2021-01-01",
      },
      {
        id: "8",
        type: "file",
        name: "document_frame.png",
        fileSizeKilobyte: 4444,
        sharedTo: 100,
        lastModified: "2021-01-01",
      },
    ],
  },
  {
    id: "9",
    type: "directory",
    name: "video_frame.png",
    fileSizeKilobyte: 33,
    sharedTo: 100,
    lastModified: "2021-01-01",
    content: [
      {
        id: "10",
        type: "file",
        name: "image_frame.png",
        fileSizeKilobyte: 4444,
        sharedTo: 100,
        lastModified: "2021-01-01",
      },
      {
        id: "11",
        type: "file",
        name: "document_frame.png",
        fileSizeKilobyte: 4444,
        sharedTo: 100,
        lastModified: "2021-01-01",
      },
    ],
  },
];

function FileTreeBuilder(files: (File | Directory)[]) {
  // This will create a bunch of key value pairs for each file or folder.

  let store: MapStore = {};
  for (let f of files) {
    if (f.type === "file") {
      store[f.name] = f;
    } else if (f.type === "directory") {
      store[f.name] = FileTreeBuilder(f.content);
    }
  }
  return store;
}
function getAllPathIndex(files: filesTableViewDataType) {
  let indexMap: any[] = [];
  files.forEach((f, index) => {
    if (f.type === "file") {
      indexMap.push(index);
    }
    if (f.type === "directory") {
      indexMap = indexMap.concat(getAllPathIndex(f.content));
    }
  });
  return indexMap;
}
function includeChecked(
  files: (File | Directory)[],
  checked = false
): filesTableViewDataType {
  let filesWithChecked = files.map((e) => {
    if (e.type === "file") {
      return { ...e, checked };
    } else if (e.type === "directory") {
      return { ...e, checked, content: includeChecked(e.content, checked) };
    }
  });
  return filesWithChecked as filesTableViewDataType;
}
function mapIndexSelectItem(
  locationPath: number[],
  data: filesTableViewDataType,
  modifier: (
    file: fileTableViewDataType
  ) => fileTableViewDataType | filesTableViewDataType
): filesTableViewDataType {
  let modifiedFiles;

  if (locationPath.length > 1) {
    let file = data[locationPath[0]];
    if (file.type === "directory") {
      file.content = mapIndexSelectItem(
        _.drop(locationPath, 1),
        file.content,
        modifier
      );
      data[locationPath[0]] = file;
    }
  } else {
    let file = data[locationPath[0]];
    let result = modifier(data[locationPath[0]]);
    data[locationPath[0]] = result as any;
    // data = result;
  }
  modifiedFiles = data;

  return modifiedFiles as filesTableViewDataType;
}
function mapIndexSelectList(
  locationPath: number[],
  data: filesTableViewDataType,
  modifier: (files: filesTableViewDataType) => filesTableViewDataType
): filesTableViewDataType {
  let modifiedFiles;
  console.log("data:", data, locationPath);
  if (locationPath.length > 0) {
    let file = data[locationPath[0]];
    if (file.type === "directory") {
      file.content = mapIndexSelectList(
        _.drop(locationPath, 1),
        file.content,
        modifier
      );
      data[locationPath[0]] = file;
    }
  } else {
    data = modifier(data);
  }
  modifiedFiles = data;
  return modifiedFiles as filesTableViewDataType;
}
function FilesTableView() {
  const [files, setFiles] = useContext(FilesContext);

  let [userLocationPath, setUserLocationPath] = useState<number[]>([]);
  let SortByName = (data: filesTableViewDataType) => {
    let sortedNames = data.sort((file1, file2) => {
      return file1.name.localeCompare(file2.name);
    });
    let sortedNamesWithCorrectIndex = sortedNames.map((file) => {
      let originalIndex = data.findIndex((_file) => {
        return _.isEqual(_file, file);
      });
      return [file, originalIndex] as [fileTableViewDataType, number];
    });
    return sortedNamesWithCorrectIndex;
  };
  let SortByNameDescending = (data: filesTableViewDataType) => {
    let sortedNames = data.sort((file1, file2) => {
      return file2.name.localeCompare(file1.name);
    });
    let sortedNamesWithCorrectIndex = sortedNames.map((file) => {
      let originalIndex = data.findIndex((_file) => {
        return _.isEqual(_file, file);
      });
      return [file, originalIndex] as [fileTableViewDataType, number];
    });
    return sortedNamesWithCorrectIndex;
  };
  let SortBySize = (data: filesTableViewDataType) => {
    let sortedNames = data.sort((file1, file2) => {
      return file1.fileSizeKilobyte - file2.fileSizeKilobyte;
    });
    let sortedNamesWithCorrectIndex = sortedNames.map((file) => {
      let originalIndex = data.findIndex((_file) => {
        return _.isEqual(_file, file);
      });
      return [file, originalIndex] as [fileTableViewDataType, number];
    });
    return sortedNamesWithCorrectIndex;
  };
  let SortBySizeDescending = (data: filesTableViewDataType) => {
    let sortedNames = data.sort((file1, file2) => {
      return file2.fileSizeKilobyte - file1.fileSizeKilobyte;
    });
    let sortedNamesWithCorrectIndex = sortedNames.map((file) => {
      let originalIndex = data.findIndex((_file) => {
        return _.isEqual(_file, file);
      });
      return [file, originalIndex] as [fileTableViewDataType, number];
    });
    return sortedNamesWithCorrectIndex;
  };

  function SortingReducer(
    state: { files: filesTableViewDataType; sortRule: SortRule },
    action: { type: SortingDataActions; data?: any }
  ) {
    let newState = state;
    let locationPath: number[];
    let files: filesTableViewDataType;
    switch (action.type) {
      case SortingDataActions.SortByName:
        return { ...state, sortRule: SortRule.SortByName };
      case SortingDataActions.SortByNameDescending:
        return { ...state, sortRule: SortRule.SortByNameDescending };
      case SortingDataActions.SortBySize:
        return { ...state, sortRule: SortRule.SortBySize };
      case SortingDataActions.SortBySizeDescending:
        return { ...state, sortRule: SortRule.SortBySizeDescending };
      case SortingDataActions.DeleteSelected:
        locationPath = action.data.locationPath as number[];
        // Will index selected files with undefined, as this are for deletion
        console.log("location path :", locationPath);
        files = mapIndexSelectList(
          locationPath,
          [...state.files],
          (files: filesTableViewDataType) => {
            console.log("file before", files);
            if (_.isArray(files)) {
              let result = files.filter((f) => {
                return !f.checked;
              });
              return result;
            }
            console.log("files after", files);
            return files;
          }
        );
        // setFiles(newState)
        return { ...state, files };
      case SortingDataActions.SelectFile:
        locationPath = action.data.index as number[];
        const checked = action.data.checked as boolean;

        // const prevState = [...state];
        files = mapIndexSelectItem(locationPath, [...state.files], (file) => {
          console.log("selecting file", locationPath, file);
          return { ...file, checked };
        }) as filesTableViewDataType;

        return { ...state, files };
      case SortingDataActions.AllSelection:
        files = includeChecked([...state.files], action.data.checked);
        return { ...state, files };
      default:
        return state;
    }
  }

  const [sortedFilesData, dispatcher] = useReducer(SortingReducer, {
    files: includeChecked(files),
    sortRule: SortRule.Default,
  });
  // let [mapFiles, setMapFiles] = useState(FileTreeBuilder(sortedFilesData));
  const sort = useMemo(() => {
    return (
      files: filesTableViewDataType
    ): [fileTableViewDataType, number][] => {
      switch (sortedFilesData.sortRule) {
        case SortRule.SortByName:
          return SortByName(files);
        case SortRule.SortByNameDescending:
          return SortByNameDescending(files);
        case SortRule.SortBySize:
          return SortBySize(files);
        case SortRule.SortBySizeDescending:
          return SortBySizeDescending(files);
        default:
          return files.map((file, index) => [file, index]);
      }
    };
  }, [sortedFilesData, userLocationPath]);

  const currentLocation = useMemo(
    () => () => {
      let files = sortedFilesData.files;
      let locationPath = userLocationPath;
      if (locationPath.length === 0) {
        return files;
      }
      const directoryData = locationPath.reduce(
        (accumulator, currentValue, index): any => {
          let directory = accumulator[currentValue] as Directory;
          return directory.content;
        },
        files
      );
      // console.log("directory data", directoryData);
      return directoryData as filesTableViewDataType;
    },
    [sortedFilesData, userLocationPath]
  );
  const some = useMemo(() => {
    return () => currentLocation().some((e) => e.checked);
  }, [sortedFilesData, userLocationPath]);
  const every = useMemo(() => {
    return () => currentLocation().every((e) => e.checked);
  }, [sortedFilesData, userLocationPath]);
  function IsIntermediate() {
    const someChecked = some();
    const allChecked = every();
    return someChecked && !allChecked;
  }
  const PathIndexComponent = () => {
    const [allPathIndex, setAllPathIndex] = useState(
      getAllPathIndex(sortedFilesData.files)
    );
    let paths: JSX.Element[] = [];
    userLocationPath.reduce(
      (accumulator: number[], currentValue: number, indexDept) => {
        let location = accumulator.concat(currentValue);
        let name = "";
        mapIndexSelectItem(location, sortedFilesData.files, (file) => {
          name = file.name;
          return file;
        });
        let path = (
          <li onClick={() => setUserLocationPath(location)} key={useId()}>
            {name}
          </li>
        );
        paths.push(path);
        return location;
      },
      []
    );
    return (
      <ul className="path-nav flex gap-x-3 w-full p-2 mb-2">
        <li onClick={() => setUserLocationPath([])}>Root</li>
        {paths}
      </ul>
    );
  };
  return (
    <div className="files files--table-view gap-y-2">
      <PathIndexComponent />
      <div className="files__header">
        <button
          className="files__head"
          onClick={(e) => {
            let button = e.target as Element;
            let indicator = button.querySelector(".sort-icon") as HTMLElement;
            let order = indicator?.dataset.order as string;

            if (order === "1") {
              dispatcher({ type: SortingDataActions.SortByName });
              indicator.dataset.order = "-1";
            } else if (order === "-1") {
              dispatcher({ type: SortingDataActions.SortByNameDescending });
              indicator.dataset.order = "1";
            }
          }}
        >
          <Checkbox
            className="p-2"
            onChange={() => {
              console.log("checked");
            }}
            checked={every()}
            indeterminate={IsIntermediate()}
            onClick={(e: any) => {
              const checked = e.target.checked as boolean;

              dispatcher({
                type: SortingDataActions.AllSelection,
                data: { checked },
              });
              e.stopPropagation();
            }}
          />
          Name
          <i className="bi bi-sort-down-alt sort-icon" data-order="1"></i>
        </button>
        <button
          className="files__head"
          onClick={(e) => {
            let button = e.target as Element;
            let indicator = button.querySelector(".sort-icon") as HTMLElement;
            let order = indicator?.dataset.order as string;

            if (order === "1") {
              dispatcher({ type: SortingDataActions.SortBySize });
              indicator.dataset.order = "-1";
            } else if (order === "-1") {
              dispatcher({ type: SortingDataActions.SortBySizeDescending });
              indicator.dataset.order = "1";
            }
          }}
        >
          Size<i className="bi bi-sort-down-alt sort-icon" data-order="1"></i>
        </button>
        <button className="files__head">Shared</button>
        <button className="files__head">
          Last Modified<i className="bi bi-sort-down-alt"></i>
        </button>
      </div>
      <div className="h-auto overflow-y-auto max-h-[50vh] py-4">
        {sort(currentLocation()).map((fileAndIndex) => {
          const file = fileAndIndex[0];

          const index = fileAndIndex[1];
          const extension = getExtension(file.name);

          return (
            <div
              className="file"
              tabIndex={1}
              key={index}
              onDoubleClick={() => {
                if (file.type === "directory") {
                  setUserLocationPath((prev) => prev.concat(index));
                }
              }}
              onClick={() => {
                dispatcher({
                  type: SortingDataActions.SelectFile,
                  data: {
                    index: userLocationPath.concat(index),
                    checked: !file.checked,
                  },
                });
              }}
              data-checked={file.checked}
            >
              <span className="file__data flex items-center gap-x-2">
                <Checkbox
                  className="p-2 "
                  checked={file.checked as boolean}
                  // onChange={() => {
                  //   console.log("checked");
                  // }}
                />
                {file.type === "file" ? (
                  <FileSvgIcon
                    fill="var(--color-secondary-light)"
                    stroke="whitesmoke"
                    extension={extension.toUpperCase()}
                  />
                ) : (
                  <i
                    className="bi bi-folder"
                    style={{ fontSize: "1.5rem", margin: "0" }}
                  ></i>
                )}
                {file.name}
              </span>
              <span className="file__data">{file.fileSizeKilobyte}</span>
              <span className="file__data">{file.sharedTo}</span>
              <span className="file__data">{file.lastModified}</span>
            </div>
          );
        })}
      </div>
      <button
        className="btn btn--primary files--delete"
        onClick={() =>
          dispatcher({
            type: SortingDataActions.DeleteSelected,
            data: { locationPath: userLocationPath },
          })
        }
        style={
          some()
            ? { transform: "translateY(5px)" }
            : { transform: "translateY(80px)" }
        }
      >
        <i className="bi bi-trash"></i>Delete
      </button>
    </div>
  );
}
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

function Collection({
  name,
  image,
  itemsCount,
  occupiesGB,
  color,
}: {
  name: string;
  image: string;
  itemsCount: number;
  occupiesGB: number;
  color?: string;
}) {
  const capacityGB = 100;
  // const progressValue = useRef<number>(occupiesGB / capacityGB * 100 )
  return (
    <div className="collection grid grid-rows-[1fr_auto] font-secondary rounded-md bg-neutral p-3 w-fit h-fit shadow-md cursor-pointer hover:bg-slate-500 transition-colors">
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
function ExplorerNav() {
  return (
    <nav
      className="explorer-nav w-full flex justify-between gap-x-3 py-2 px-4 border-b 
   border-divider items-center explorer__nav"
    >
      <Link to="/" className="flex flex-nowrap items-center">
        <ReactSVG src={logoSvg} className="logo cursor-pointer select-none " />
        <span className="logo-label text-wrap">Parcel Share</span>
      </Link>
      <div className="md:flex hidden items-center flex-grow max-w-lg">
        <span className="xl:block font-bold font-primary text-lg mx-2">
          Explorer
        </span>
        <Search
          // prefix={<i className="bi bi-search"></i>}
          placeholder="Search File"
          enterButton
          suffix={
            <>
              <span className="p-2 bg-slate-100 dark:bg-slate-500 rounded-md bg-opacity-35 dark:bg-opacity-35 border border-slate-500">
                Ctrl
              </span>
              <span>+</span>
              <span className="p-2 bg-slate-100 dark:bg-slate-500 rounded-md bg-opacity-35 dark:bg-opacity-35 border border-slate-500">
                K
              </span>
            </>
          }
        />
      </div>
      <div className="space-x-4">
        <i className="bi bi-gear"></i>
        <Avatar size={"default"} style={{ backgroundColor: "orange" }} gap={2}>
          P
        </Avatar>
      </div>
    </nav>
  );
}
