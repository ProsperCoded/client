import {
  Directory,
  File,
  FlatFilesAndLocationIndexesType,
  filesTableViewDataType,
} from "../../../types";
import React from "react";
import { BrowseFilesAndLocationPaths } from "../Explorer";
import { getExtension } from "../../../utils";
export enum AllCollections {
  documents = "document",
  others = "others",
  videos = "videos",
  images = "images",
}
const CommonExtensions = {
  document: [
    ".doc",
    ".docx",
    ".pdf",
    ".txt",
    ".xls",
    ".xlsx",
    ".xlsm",
    ".ppt",
    ".pptx",
    ".odt",
    ".rtf",
    ".wpd",
    ".odp",
    ".ods",
    ".csv",
    ".eml",
    ".msg",
    ".pages",
    ".key",
    ".numbers",
  ],
  // others: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif"],
  images: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".tiff",
    ".psd",
    ".eps",
    ".ai",
    ".indd",
    ".raw",
    ".bmp",
    ".heic",
    ".svg",
    ".webp",
    ".ico",
  ],
  videos: [
    ".avi",
    ".mp4",
    ".mov",
    ".wmv",
    ".flv",
    ".mkv",
    ".mpeg",
    ".mpg",
    ".webm",
    ".vob",
    ".m4v",
    ".3gp",
    ".3g2",
    ".f4v",
    ".m2ts",
    ".mts",
    ".ts",
    ".mp3",
  ],
  others: [],
};
export default function CollectionDisplay({
  flatFilesAndLocationIndexes,
  // exitSearch,
  exitDisplay,
  collectionType,
}: {
  flatFilesAndLocationIndexes: FlatFilesAndLocationIndexesType;
  exitDisplay: Function;
  // heading: string;
  collectionType: AllCollections;
}) {
  let [heading, setHeading] = React.useState<string>();
  let [filteredData, setFilteredData] =
    React.useState<FlatFilesAndLocationIndexesType>(
      flatFilesAndLocationIndexes
    );
  const filter = React.useCallback(
    (type: AllCollections) => {
      setFilteredData(
        flatFilesAndLocationIndexes.filter((fileAndLocationPath) => {
          let file = fileAndLocationPath.data;
          if (file.type === "file") {
            let extension = getExtension(file.name);
            if (type === AllCollections.others) {
              return !(
                CommonExtensions.document.includes(`.${extension}`) ||
                CommonExtensions.images.includes(`.${extension}`) ||
                CommonExtensions.videos.includes(`.${extension}`)
              );
            }
            return (CommonExtensions[type] as string[]).includes(
              `.${extension}`
            );
          }
        })
      );
    },
    [flatFilesAndLocationIndexes, collectionType]
  );
  React.useEffect(() => {
    console.log("running", collectionType);
    switch (collectionType) {
      case AllCollections.documents:
        setHeading("Documents");
        filter(AllCollections.documents);
        break;
      case AllCollections.images:
        setHeading("Images");
        filter(AllCollections.images);
        break;
      case AllCollections.videos:
        setHeading("Videos");
        filter(AllCollections.videos);
        break;
      case AllCollections.others:
        setHeading("Others");
        filter(AllCollections.others);
        break;
      default:
        break;
    }
  }, [flatFilesAndLocationIndexes, collectionType]);
  return (
    <div className="search-results m-3 md:m-7">
      <button
        className="btn btn--primary"
        onClick={() => {
          exitDisplay();
        }}
      >
        <i className="bi bi-arrow-bar-right"></i>
        Back
      </button>
      <h1 className="block-container__heading highlight w-full">{heading}</h1>
      <BrowseFilesAndLocationPaths
        exitDisplay={exitDisplay}
        data={filteredData}
      />
    </div>
  );
}
