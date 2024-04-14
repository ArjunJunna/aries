import { Dispatch, SetStateAction, createContext } from "react";
import { File, UserTeam } from "@/lib/types";

export type FileContextType = {
  fileList: File[] | undefined;
  setFileList: Dispatch<SetStateAction<File[] | undefined>>;
  activeTeam: UserTeam | undefined;
  setActiveTeam: Dispatch<SetStateAction<UserTeam | undefined>>;
};


export const FileListContext = createContext<FileContextType | undefined>(undefined);
