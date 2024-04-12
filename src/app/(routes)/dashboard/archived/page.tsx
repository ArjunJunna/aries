'use client'

import { useContext, useEffect, useState } from "react";
import {
  FileContextType,
  FileListContext,
} from "@/app/context/FileListContext";
import FileList from "../components/FileList";
import ArchiveHeader from "./ArchiveHeader";
import { usePathname } from "next/navigation";

const ArchivePage = () => {
     const { fileList,setFileList } = useContext(FileListContext) as FileContextType;
     const [filteredFiles, setFilteredFiles] = useState(fileList);
     const pathname = usePathname();
     const handleSearch = (searchTerm: any) => {
       if (!searchTerm) {
         setFilteredFiles(fileList);
       } else {
         const filtered = fileList?.filter((file) =>
           file.name.toLowerCase().includes(searchTerm.toLowerCase()),
         );
         setFilteredFiles(filtered);
       }
     };
     useEffect(() => {
      setFilteredFiles(fileList?.filter((file) => file.archive));
     }, [fileList]);

  return (
    <>
      <div className="text-black">
        <ArchiveHeader onSearch={handleSearch} />
        <FileList files={filteredFiles} path={pathname} />
      </div>
    </>
  );
}

export default ArchivePage