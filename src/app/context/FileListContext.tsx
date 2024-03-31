import { Dispatch, SetStateAction, createContext } from "react";
import { File } from "@/lib/types";

export type FileContextType = {
  fileList: File[] | undefined;
  setFileList: Dispatch<SetStateAction<File[] | undefined>>;
};


export const FileListContext = createContext<FileContextType | undefined>(undefined);
