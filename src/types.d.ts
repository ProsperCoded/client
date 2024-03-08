type File = {
  id: string;
  type: "file";
  name: string;
  fileSizeKilobyte: number;
  sharedTo: number;
  lastModified: string;
};
type Directory = {
  id: string;
  type: "directory";
  name: string;
  fileSizeKilobyte: number;
  sharedTo: number;
  lastModified: string;
  content: (File | Directory)[];
};
export type MapStore = {
  [key: string]: (File | Directory)[] | (File | Directory) | MapStore;
};
type test = Omit<Directory, "content"> & { content: filesTableViewDataType } & {
  checked: Boolean;
};
let hello: fileTableViewDataType;
// hello = {type:"directory", content:[{}]}
type fileTableViewDataType =
  | (File & {
      checked: Boolean;
    })
  | ((Omit<Directory, "content"> & { content: filesTableViewDataType }) & {
      checked: Boolean;
    });

type filesTableViewDataType = fileTableViewDataType[];
