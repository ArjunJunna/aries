"use client";

import { Archive, Flag, Github, Lock, Book } from "lucide-react";
import React, { useEffect, useState } from "react";

import { fetchAllFilesOfTeam } from "../action";
import { useContext } from "react";
import { FileContextType } from "@/app/context/FileListContext";
import { FileListContext } from "@/app/context/FileListContext";
import Constant from "@/utils/Constant";
import { UserTeam } from "@/lib/types";
import dynamic from "next/dynamic";

const CreateNewFile = dynamic(() => import("./CreateNewFile"));

type BottomSectionProps = {
  activeTeam: UserTeam | undefined;
};

const SideBarBottomSection = ({ activeTeam }: BottomSectionProps) => {

  const [totalTeamFiles, setTotalTeamFiles] = useState<number>(0);
  const { setFileList } = useContext(FileListContext) as FileContextType;
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: "",
    },
    {
      id: 4,
      name: "Private Files",
      icon: Lock,
      path: "",
    },
    {
      id: 5,
      name: "About",
      icon: Book,
      path: "",
    },
  ];

  const getTeamFiles = async (teamId: string) => {
    try {
      const res = await fetchAllFilesOfTeam(teamId);

      setTotalTeamFiles(res?.length as number);
      setFileList(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    activeTeam && getTeamFiles(activeTeam.id);
  }, [activeTeam]);



  return (
    <div className="flex flex-col">
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex cursor-pointer items-center gap-2 rounded-md 
        p-1 px-4 text-[14px] font-bold hover:bg-gray-100"
        >
          <menu.icon className="h-4 w-4" />
          {menu.name}
        </h2>
      ))}

      <CreateNewFile activeTeam={activeTeam} totalTeamFiles={totalTeamFiles} getTeamFiles={getTeamFiles}/>

      <div className="mt-5 h-4 w-full rounded-full bg-gray-200">
        <div
          className={`h-4 rounded-full ${totalTeamFiles === 5 ? "bg-red-600" : "bg-blue-600"}`}
          style={{ width: `${(totalTeamFiles / 5) * 100}%` }}
        ></div>
      </div>

      <h2 className="mt-3 text-[12px]">
        <strong>{totalTeamFiles}</strong> out of
        <strong> {Constant.MAX_FREE_FILE}</strong> files used
      </h2>
      <h2 className="mt-1 text-[12px]">
        <span className="underline hover:cursor-pointer">Upgrade</span> your
        plan for unlimited access.
      </h2>
    </div>
  );
};

export default SideBarBottomSection;
