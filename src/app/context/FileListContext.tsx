import { Dispatch, SetStateAction, createContext } from "react";

type File = {
  archive: boolean;
  author: string;
  createdAt: Date;
  document: string;
  id: number;
  name: string;
  teamId: number;
  whiteboard: string;
};

export type FileContextType = {
  fileList: File[] | undefined;
  setFileList: Dispatch<SetStateAction<File[] | undefined>>;
};


export const FileListContext = createContext<FileContextType | undefined>(undefined);
