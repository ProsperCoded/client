import { useContext, useId, useMemo, useReducer } from "react";
import {
  Directory,
  fileTableViewDataType,
  filesTableViewDataType,
} from "../../../types";
import { FileSvgIcon, getExtension } from "../../../utils";
import { FilesContext, UserLocationPathContext } from "../Explorer";
import { Checkbox } from "antd";
import _ from "lodash";
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
function includeChecked(
  files: (File | Directory)[] | filesTableViewDataType,
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
  const [userLocationPath, setUserLocationPath] = useContext(
    UserLocationPathContext
  );
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
    // const [allPathIndex, setAllPathIndex] = useState(
    //   getAllPathIndex(sortedFilesData.files)
    // );
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
                  setUserLocationPath((prev: any) => prev.concat(index));
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

export default FilesTableView;
