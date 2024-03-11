import {
  Directory,
  File,
  FlatFilesAndLocationIndexesType,
} from "../../../types";
import React, { useContext } from "react";
import { BrowseFilesAndLocationPaths } from "../Explorer";
import { MessageAPIContext } from "../../../App";
export default function SearchDisplay({
  flatFilesAndLocationIndexes,
  exitDisplay,
  query,
}: {
  flatFilesAndLocationIndexes: FlatFilesAndLocationIndexesType;
  exitDisplay: Function;
  query: string;
}) {
  let [searchResults, setSearchResults] = React.useState(
    searchQuery(query, flatFilesAndLocationIndexes)
  );

  React.useEffect(() => {
    setSearchResults(searchQuery(query, flatFilesAndLocationIndexes));
  }, [query]);
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

      <h1 className="block-container__heading highlight w-full">
        Search Result
      </h1>
      <BrowseFilesAndLocationPaths
        exitDisplay={exitDisplay}
        data={searchResults}
      />
    </div>
  );
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
