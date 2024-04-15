'use client'

import {  useEffect, useState } from "react";
import FileList from "../components/FileList";
import ArchiveHeader from "./ArchiveHeader";
import { usePathname } from "next/navigation";
import { useDataStore } from "@/lib/store";

const ArchivePage = () => {
      const pathname = usePathname();
     const fileList = useDataStore((state) => state.fileList);
     const [filteredFiles, setFilteredFiles] = useState(
       fileList?.filter((file) => file.archive),
     );

     const handleSearch = (searchTerm: any) => {
       if (!searchTerm) {
         setFilteredFiles(fileList?.filter((file) => file.archive));
       } else {
         const filtered = filteredFiles?.filter((file) =>
           file.name.toLowerCase().includes(searchTerm.toLowerCase()),
         );
         setFilteredFiles(filtered);
       }
     };

     useEffect(() => {
       setFilteredFiles(fileList?.filter((file) => file?.archive));
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