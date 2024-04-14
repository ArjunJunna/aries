import { create } from "zustand";
import { File, UserTeam } from "@/lib/types";
import { persist } from "zustand/middleware";

export type State = {
  fileList: File[] | undefined;
  activeTeam: UserTeam | undefined;
};

export type Actions = {
  setFileList: (fileList: File[]) => void;
  setActiveTeam: (activeTeam: UserTeam) => void;
};

export const useDataStore = create<State & Actions>()(
  persist(
    (set) => ({
      fileList: [],
      activeTeam: {
        id: "",
        name: "",
        userId: "",
      },
      setFileList: (fileList: File[]) => set(() => ({ fileList: fileList })),
      setActiveTeam: (activeTeam: UserTeam) =>
        set(() => ({ activeTeam: activeTeam })),
    }),
    { name: "data-store", skipHydration: true },
  ),
);
