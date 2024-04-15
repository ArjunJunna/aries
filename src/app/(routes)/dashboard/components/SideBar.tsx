"use client"

import SideBarTopSection from "./SideBarTopSection";
import SideBarBottomSection from "./SideBarBottomSection";
import { useDataStore } from "@/lib/store";

const SideBar = () => {
  const {activeTeam,setActiveTeam}=useDataStore((state)=>({
    activeTeam:state.activeTeam,
    setActiveTeam:state.setActiveTeam,
  }))
  
  return (
    <div className="flex min-h-screen  w-[17.2rem] flex-col border-r p-6 max-sm:hidden">
      <SideBarTopSection setActiveTeam={setActiveTeam} activeTeam={activeTeam}/>
      <SideBarBottomSection activeTeam={activeTeam} />
    </div>
  );
};

export default SideBar;
