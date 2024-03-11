import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { FileSvg, FileSvgIcon, getExtension } from "../../utils";
import _ from "lodash";
import {
  File,
  Directory,
  MapStore,
  filesTableViewDataType,
  FlatFilesAndLocationIndexesType,
} from "../../types";
import { SpaceContext } from "antd/es/space";
import ExplorerSideBar from "./components/ExplorerSideBar";
import ExplorerMain from "./components/ExplorerMain";
import ExplorerNav from "./components/ExplorerNav";
import CollectionDisplay, {
  AllCollections,
} from "./components/CollectionDisplay";
import SearchDisplay from "./components/SearchDisplay";
export const FilesContext = createContext<[(File | Directory)[], Function]>([
  [],
  () => {},
]);
export const UserLocationPathContext = createContext<[number[], Function]>([
  [],
  () => {},
]);
enum Displays {
  SearchDisplay,
  ExplorerMain,
  CollectionDisplay,
}
function Explorer() {
  const [files, setFiles] = useState(filesData);
  const [filteredFiles, setFilteredFiles] = useState(files);
  const [searchValue, setSearchValue] = useState("");
  const [flatFilesAndLocationIndexes, setFlatFilesAndLocationIndexes] =
    useState(flattenFilesAndLocationIndexes(files));
  const [collectionType, setCollectionType] = useState<AllCollections>(
    AllCollections.others
  );

  // useEffect(() => {
  //   console.log("Collection Type from explorer component", collectionType);
  // }, [collectionType]);
  let [userLocationPath, setUserLocationPath] = useState<number[]>([]);
  const onSearch = (value: string) => {
    console.log("value ", value);
    setSearchValue(value);
    setDisplay(Displays.SearchDisplay);
  };
  useEffect(() => {
    if (!searchValue) setDisplay(Displays.ExplorerMain);
  }, [searchValue]);
  const [display, setDisplay] = useState<Displays>(Displays.ExplorerMain);
  const DisplayComponents = {
    SearchDisplay: (
      <SearchDisplay
        flatFilesAndLocationIndexes={flatFilesAndLocationIndexes}
        query={searchValue}
        exitDisplay={() => {
          setDisplay(Displays.ExplorerMain);
        }}
      />
    ),
    ExplorerMain: (
      <ExplorerMain
        openCollection={(value) => {
          setDisplay(Displays.CollectionDisplay);
          setCollectionType(value);
        }}
      />
    ),
    CollectionDisplay: (
      <CollectionDisplay
        collectionType={collectionType}
        flatFilesAndLocationIndexes={flatFilesAndLocationIndexes}
        exitDisplay={() => {
          setDisplay(Displays.ExplorerMain);
        }}
      />
    ),
  };
  const getDisplay = useCallback(() => {
    // const displayComponent;
    switch (display) {
      case Displays.SearchDisplay:
        return DisplayComponents.SearchDisplay;
      case Displays.ExplorerMain:
        return DisplayComponents.ExplorerMain;
      case Displays.CollectionDisplay:
        return DisplayComponents.CollectionDisplay;
      default:
        return DisplayComponents.ExplorerMain;
    }
  }, [display, collectionType, flatFilesAndLocationIndexes]);
  useEffect(() => {
    console.log("files changed", files);
    // console.log()
    // console.log
    // console.log
  }, [files]);
  // useEffect()
  return (
    <UserLocationPathContext.Provider
      value={[userLocationPath, setUserLocationPath]}
    >
      <FilesContext.Provider value={[filteredFiles, setFiles]}>
        <div className="explorer">
          <ExplorerNav
            onSearch={onSearch}
            exitSearch={() => {
              // setSearchValue("");
              setDisplay(Displays.ExplorerMain);
            }}
          />
          <div className="lg:grid grid-cols-[20%_80%] h-full relative">
            <ExplorerSideBar
              overViewStorage={() => setDisplay(Displays.ExplorerMain)}
              openCollection={(value) => {
                setDisplay(Displays.CollectionDisplay);
                setCollectionType(value);
              }}
            />

            {getDisplay()}
          </div>
        </div>
      </FilesContext.Provider>
    </UserLocationPathContext.Provider>
  );
}

export default Explorer;

export function BrowseFilesAndLocationPaths({
  data,
  exitDisplay,
}: {
  data: FlatFilesAndLocationIndexesType;
  exitDisplay: Function;
}) {
  const [userLocationPath, setUserLocationPath] = useContext(
    UserLocationPathContext
  );
  return (
    <div>
      <ul className="flex flex-col gap-y-4 text-sm lg:text-base">
        {data.map((fileAndLocationPath, index) => {
          let file = fileAndLocationPath.data;
          let locationPath = fileAndLocationPath.locationPath;
          const extension = getExtension(file.name);
          return (
            <li
              className="transition-transform hover:scale-[1.02] hover:bg-secondary border-b border-transparent hover:border-slate-600 py-2 px-4 cursor-pointer "
              onDoubleClick={() => {
                if (file.type === "directory") {
                  setUserLocationPath(locationPath);
                  exitDisplay();
                }
              }}
              key={index}
            >
              <div className="file grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-x-1 lg:gap-x-2 ">
                <span className="file__data flex items-center gap-x-2">
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
                <span className="file__data">{file.fileSizeKilobyte} kb</span>
                <span className="file__data">{file.sharedTo}</span>
                <span className="file__data">{file.lastModified}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const filesData: (File | Directory)[] = [
  {
    id: "1",
    type: "file",
    name: "my cv.dox",
    fileSizeKilobyte: 100,
    sharedTo: 100,
    lastModified: "2021-01-01",
  },
  {
    id: "2",
    type: "file",
    name: "barbie.mp3",
    fileSizeKilobyte: 100,
    sharedTo: 100,
    lastModified: "2021-01-01",
  },
  {
    id: "3",
    type: "file",
    name: "image_frame.fal",
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
    name: "recent items",
    fileSizeKilobyte: 33,
    sharedTo: 100,
    lastModified: "2021-01-01",
    content: [
      {
        id: "7",
        type: "directory",
        name: "My PDFS",
        fileSizeKilobyte: 4444,
        sharedTo: 100,
        content: [
          {
            id: "7",
            type: "file",
            name: "going to.pdf",
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
        name: "today image.png",
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
function flattenFilesAndLocationIndexes(
  files: (File | Directory)[],
  depth: number[] = [],
  store: { data: File | Directory; locationPath: number[] }[] = []
) {
  files.forEach((f, index) => {
    if (f.type === "directory") {
      store = flattenFilesAndLocationIndexes(
        f.content,
        depth.concat(index),
        store
      );
    }
    store.push({ data: f, locationPath: depth.concat(index) });
  });
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
