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

import { FileSvg, FileSvgIcon, getExtension } from "../../utils";
import _ from "lodash";
import { File, Directory, MapStore, filesTableViewDataType } from "../../types";
import { SpaceContext } from "antd/es/space";
import ExplorerSideBar from "./components/ExplorerSideBar";
import ExplorerMain from "./components/ExplorerMain";
import ExplorerNav from "./components/ExplorerNav";
export const FilesContext = createContext<[(File | Directory)[], Function]>([
  [],
  () => {},
]);
export const UserLocationPathContext = createContext<[number[], Function]>([
  [],
  () => {},
]);
function Explorer() {
  const [files, setFiles] = useState(filesData);
  const [filteredFiles, setFilteredFiles] = useState(files);
  const [searchValue, setSearchValue] = useState("");
  const [flatFilesAndLocationIndexes, setFlatFilesAndLocationIndexes] =
    useState(flattenFilesAndLocationIndexes(files));
  const [searchResults, setSearchResults] = useState(
    flatFilesAndLocationIndexes
  );
  let [userLocationPath, setUserLocationPath] = useState<number[]>([]);
  const onSearch = (value: string) => {
    // let value = e.target.value as string;
    console.log("value ", value);
    // setSearchValue(value);
    setSearchValue(value);
    setSearchResults(searchQuery(value, flatFilesAndLocationIndexes));
  };
  useEffect(() => {
    console.log("files changed", files);
  }, [files]);
  return (
    <UserLocationPathContext.Provider
      value={[userLocationPath, setUserLocationPath]}
    >
      <FilesContext.Provider value={[filteredFiles, setFiles]}>
        <div className="explorer">
          <ExplorerNav
            onSearch={onSearch}
            exitSearch={() => {
              setSearchValue("");
            }}
          />
          <div className="grid grid-cols-[20%_80%] min-h-full">
            <ExplorerSideBar />
            {!searchValue && <ExplorerMain />}
            {searchValue && (
              <div className="search-results block-container">
                <h1 className="block-container__heading highlight w-full">
                  Search Result
                </h1>
                <ul className="search-result__content flex flex-col gap-y-4">
                  {searchResults.map((fileAndLocationPath) => {
                    let file = fileAndLocationPath.data;
                    let locationPath = fileAndLocationPath.locationPath;
                    const extension = getExtension(file.name);
                    return (
                      <li
                        className="transition-transform hover:scale-[1.02] hover:bg-secondary border-b border-transparent hover:border-slate-600 py-2 px-4 cursor-pointer"
                        onDoubleClick={() => {
                          if (file.type === "directory") {
                            setUserLocationPath(locationPath);
                            setSearchValue("");
                          }
                        }}
                      >
                        <div className="file grid grid-cols-[2fr_1fr_1fr_1fr] ">
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
                          <span className="file__data">
                            {file.fileSizeKilobyte}
                          </span>
                          <span className="file__data">{file.sharedTo}</span>
                          <span className="file__data">
                            {file.lastModified}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </FilesContext.Provider>
    </UserLocationPathContext.Provider>
  );
}

export default Explorer;

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
function searchQuery(
  query: string,
  allFiles: { data: File | Directory; locationPath: number[] }[]
) {
  const searchResults = allFiles.filter((fileAndLocationPath) => {
    let name = fileAndLocationPath.data.name;
    // let locationIndex = file.locationPath;
    return name.toLowerCase().includes(query.toLowerCase());
  });
  return searchResults;
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
