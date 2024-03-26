"use client"

import { useContext, useEffect,useState } from "react";
import { FileContextType, FileListContext } from "@/app/context/FileListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import moment from "moment";
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, MoreHorizontal, Move, Pen, Share2 ,Copy} from "lucide-react";

type File={
  archive:boolean,
author:string,
createdAt:Date,
document:string,
id:number,
name:string,
teamId:number,
whiteboard:string
}

const menuList = [
  {
    id: 1,
    name: "Archive",
    icon: Archive,
   
  },
  {
    id: 2,
    name: "Rename",
    icon: Pen,
    
  },
  {
    id: 3,
    name: "Share",
    icon: Share2,
    
  },
  {
    id: 4,
    name: "Move",
    icon: Move,
    
  },
  {
    id: 5,
    name: "Duplicate",
    icon: Copy,
    
  },
];


const FileList = () => {
      const { fileList} = useContext(FileListContext) as FileContextType;
      const [teamFiles,setTeamFiles]=useState<File[]>();
      const { user } = useKindeBrowserClient();

      useEffect(()=>{
        fileList && setTeamFiles(fileList);
      },[fileList]);
 
     return user === null ? (
       <div className="text-center">Your file list is empty</div>
     ) : (
       <div className="overflow-x-auto p-4">
         <table className="min-w-full divide-y divide-gray-200 bg-white text-[12px]">
           <thead className="ltr:text-left rtl:text-right ">
             <tr>
               <td className="whitespace-nowrap p-3 text-[10px] font-bold text-gray-500">
                 NAME
               </td>
               <td className="whitespace-nowrap p-3 text-[10px] font-bold text-gray-500">
                 CREATED AT
               </td>
               <td className="whitespace-nowrap p-3 text-[10px] font-bold text-gray-500">
                 EDITED AT
               </td>
               <td className="whitespace-nowrap p-3 text-[10px] font-bold text-gray-500">
                 AUTHOR
               </td>
             </tr>
           </thead>

           <tbody className="divide-y divide-gray-200">
             {teamFiles &&
               teamFiles?.map((file: File, index: number) => (
                 <tr key={index}>
                   <td className="whitespace-nowrap p-3 text-sm font-medium text-gray-900">
                     {file.name}
                   </td>
                   <td className="whitespace-nowrap p-3 text-gray-700">
                     {moment(file.createdAt).format("DD MMM YYYY")}
                   </td>
                   <td className="whitespace-nowrap p-3 text-gray-700">
                     {moment(file.createdAt).format("DD MMM YYYY")}
                   </td>
                   <td className="whitespace-nowrap p-3 text-gray-700">
                     {user && (
                       <Image
                         src={user?.picture as string}
                         alt="user"
                         width={30}
                         height={30}
                         className="rounded-full"
                       />
                     )}
                   </td>
                   <td className="whitespace-nowrap p-3 text-gray-700">
                     <DropdownMenu>
                       <DropdownMenuTrigger>
                         <MoreHorizontal />
                       </DropdownMenuTrigger>
                       <DropdownMenuContent>
                         {menuList.map((menu, index) => (
                           <DropdownMenuItem className="gap-3 cursor-pointer" key={index}>
                             <menu.icon className="h-4 w-4 " /> {menu.name}
                           </DropdownMenuItem>
                         ))}
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </td>
                 </tr>
               ))}
           </tbody>
         </table>
       </div>
     );
};

export default FileList;