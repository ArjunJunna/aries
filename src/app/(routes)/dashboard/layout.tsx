"use client";

import SideBar from "./components/SideBar";
import { FileListContext } from "@/app/context/FileListContext";
import { useState } from "react";
import { File } from "@/lib/types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fileList, setFileList] = useState<File[] | undefined>(undefined);
  return (
    <div>
      <FileListContext.Provider value={{ fileList, setFileList}}>
        <div className="flex h-screen ">
          <SideBar />
          <div className=" flex grow flex-col text-white">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}
