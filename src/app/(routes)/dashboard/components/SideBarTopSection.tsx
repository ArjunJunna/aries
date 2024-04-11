"use client";

import {
  LayoutGrid,
  FolderPlus,
} from "lucide-react";

import {
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { fetchUserTeams } from "../action";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserTeam } from "@/lib/types";
import dynamic from "next/dynamic";

type TopsSectionProps = {
  activeTeam:UserTeam | undefined
  setActiveTeam: Dispatch<SetStateAction<UserTeam | undefined>>;
};

const TopBarMenu = dynamic(() => import("./TopBarMenu"));

const SideBarTopSection = ({setActiveTeam,activeTeam}:TopsSectionProps) => {
  const { user } = useKindeBrowserClient();
  const [userTeams,setUserTeams]=useState<UserTeam[]>();

  const fetchUserData = async (email:string) => {
    const data = await fetchUserTeams(email);
    setUserTeams(data);
    data && setActiveTeam(data[0]);
  };

  useEffect(()=>{
   user && fetchUserData(user?.email as string);
  },[user])

  return (
    <div className="flex flex-1 flex-col gap-y-6">
     <TopBarMenu activeTeam={activeTeam} userTeams={userTeams} setActiveTeam={setActiveTeam}/>
      <Button
        variant="outline"
        className=" w-full
          justify-start gap-2 font-bold"
      >
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
      <div>
        <div
          className="flex  items-center justify-between
                       rounded-lg p-2 font-mono text-xs font-semibold tracking-widest"
        >
          TEAM FOLDERS
          <FolderPlus className="h-4 w-4 cursor-pointer text-gray-700 hover:text-gray-500" />
        </div>
        <div className="flex flex-col gap-y-1">
          <h2
            className="flex cursor-pointer items-center gap-2 rounded-md 
        border p-1 px-5 text-[13px] font-bold hover:bg-gray-100"
          >
            Folder 1
          </h2>
          <h2
            className="flex cursor-pointer items-center gap-2 rounded-md 
        p-1 px-5 text-[13px] font-bold hover:bg-gray-100"
          >
            Folder 2
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideBarTopSection;
