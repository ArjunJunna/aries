"use client"

import { fetchFileDetails } from "../action";
import Canvas from "../components/Canvas";
import DocumentEditor from "../components/DocumentEditor";
import WorkSpaceHeader from "../components/WorkSpaceHeader";
import {useEffect, useState} from "react";

 type File = {
   id: string;
   name: string;
   author: string;
   teamId: string;
   archive: boolean;
   document: string;
   whiteboard: string;
   createdAt: Date;
 };


const Workspace = ({ params }: { params: { fileId: string } }) => {
const [triggerSave,setTriggerSave]=useState(false)
 const [fileData, setFileData] = useState<File | null>(null);
const fileId=params.fileId;
 const fetchFile = async (fileId: string) => {
   const result = await fetchFileDetails(fileId);
   setFileData(result as File);
 };
console.log('file details here',fileData);
 useEffect(() => {
   fileId && fetchFile(fileId);
 }, [fileId]);
  return (
    <>
      <WorkSpaceHeader
        fileId={fileId}
        onSave={() => setTriggerSave(!triggerSave)}
      />

      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="min-h-screen p-4 max-sm:border-b">
          <DocumentEditor onTriggerSave={triggerSave} fileData={fileData as File} />
        </div>

        <div className="min-h-screen border-l bg-slate-200">
          <Canvas onTriggerSave={triggerSave} fileData={fileData as File} />
        </div>
      </div>
    </>
  );
};

export default Workspace;
