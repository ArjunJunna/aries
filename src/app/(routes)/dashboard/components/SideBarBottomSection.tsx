"use client";

import { Archive, Flag, Github, Lock, Book } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchAllFilesOfTeam } from "../action";
import Constant from "@/utils/Constant";
import { UserTeam } from "@/lib/types";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/lib/store";
import { File } from "@/lib/types";

const CreateNewFile = dynamic(() => import("./CreateNewFile"));

type BottomSectionProps = {
  activeTeam: UserTeam | undefined;
};

const SideBarBottomSection = ({ activeTeam }: BottomSectionProps) => {
  const router=useRouter()
  const [totalTeamFiles, setTotalTeamFiles] = useState<number>(0);
  const { fileList, setFileList } = useDataStore((state) => ({
    fileList: state.fileList,
    setFileList: state.setFileList,
  }));
    const unarchiveFiles=fileList?.filter(file=>!file.archive).length;

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
      path: "/dashboard/archived",
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
     
      const unarchiveFiles=res?.filter(file=>!file.archive);
      setTotalTeamFiles(unarchiveFiles?.length as number);
      setFileList(res as File[]);
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
          onClick={() => router.push(`${menu.path}`)}
        >
          <menu.icon className="h-4 w-4" />
          {menu.name}
        </h2>
      ))}

      <CreateNewFile
        activeTeam={activeTeam}
        totalTeamFiles={totalTeamFiles}
        getTeamFiles={getTeamFiles}
      />

      <div className="mt-5 h-4 w-full rounded-full bg-gray-200">
        <div
          className={`h-4 rounded-full ${unarchiveFiles === 5 ? "bg-red-600" : "bg-blue-600"}`}
          style={{ width: `${(unarchiveFiles as number / 5) * 100}%` }}
        ></div>
      </div>

      <h2 className="mt-3 text-[12px]">
        <strong>{unarchiveFiles}</strong> out of
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
