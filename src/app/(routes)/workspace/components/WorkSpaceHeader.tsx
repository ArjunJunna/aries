"use client"

import { Button } from "@/components/ui/button";
import { Link, Save,Loader2 } from "lucide-react";
import Image from "next/image";
import { fetchFileDetails } from "../action";
import { Dispatch, SetStateAction, useEffect,useState } from "react";
import { File } from "@/lib/types";

type HeaderProps = {
  fileId: string;
  onSave: any;
};

const WorkSpaceHeader = ({fileId,onSave}:HeaderProps) => {
  const [fileDetails,setFileDetails]=useState<File | null>(null)

   const fetchFile = async (fileId: string) => {
     const result = await fetchFileDetails(fileId);
     setFileDetails(result as File);
   };

  useEffect(()=>{
    fileId && fetchFile(fileId)
  },[fileId])
 
  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-2">
        <Image src={"/aries-logo-v1.png"} alt="logo" height={40} width={40} />
        <h2>{fileDetails?.name}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-8 gap-2
        bg-yellow-500 text-[12px] hover:bg-yellow-600"
          onClick={() => onSave()}
        >
          <Save className="h-4 w-4" /> Save
        </Button>
        <Button
          className="h-8 gap-2
        bg-blue-600 text-[12px] hover:bg-blue-700"
        >
          Share <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
