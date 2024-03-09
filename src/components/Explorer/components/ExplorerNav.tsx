import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logoSvg from "./../../../assets/logo.svg";
import { Avatar, Checkbox } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useRef, useState } from "react";
// import { Progress } from "../../_globalComponents";

function ExplorerNav({
  onSearch,
  exitSearch,
}: {
  onSearch: (value: string) => void;
  exitSearch: Function;
}) {
  // const [files, setFiles]
  const [searchValue, setSearchValue] = useState<string>("");
  const searchElement = useRef<null | HTMLElement>(null);
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === "k" && searchElement.current) {
        console.log("Ctrl+K was pressed!");
        event.preventDefault();
        // Perform your action here
        searchElement.current.focus();
      }
    });
  }, []);
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
          ref={searchElement}
          prefix={
            searchValue && (
              <span
                className="hidden lg:inline cursor-pointer text-lg bg-red-500 hover:bg-red-700  rounded-md  border border-slate-500"
                onClick={() => {
                  setSearchValue("");
                  exitSearch();
                }}
              >
                <i className="bi bi-x m-1"></i>
              </span>
            )
          }
          placeholder="Search File"
          onSearch={onSearch}
          onInput={(e: any) => {
            let value = e.target.value as string;
            setSearchValue(value);
            if (value === "") {
              exitSearch();
            }
          }}
          enterButton
          value={searchValue}
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

export default ExplorerNav;
