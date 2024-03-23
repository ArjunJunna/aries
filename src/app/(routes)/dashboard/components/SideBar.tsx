"use client"

import SideBarTopSection from "./SideBarTopSection";
import SideBarBottomSection from "./SideBarBottomSection";
import { useState } from "react";

type UserTeam= {
    id: number;
    name: string;
    userId: number;
}

const SideBar = () => {
   const [activeTeam, setActiveTeam] = useState<UserTeam | undefined>();
  
  return (
    <div className="flex h-screen  w-[17.2rem] flex-col border-r p-6 max-sm:hidden">
      <SideBarTopSection setActiveTeam={setActiveTeam} activeTeam={activeTeam}/>
      <SideBarBottomSection activeTeam={activeTeam} />
    </div>
  );
};

export default SideBar;
