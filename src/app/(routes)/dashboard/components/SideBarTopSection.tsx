"use client";

import {
  ChevronDown,
  LayoutGrid,
  LogOut,
  Settings,
  Users,
  FolderPlus,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { fetchUserTeams } from "../action";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserTeam } from "@/lib/types";
import Loader from "@/components/Loader";

type TopsSectionProps = {
  activeTeam:UserTeam | undefined
  setActiveTeam: Dispatch<SetStateAction<UserTeam | undefined>>;
};

const SideBarTopSection = ({setActiveTeam,activeTeam}:TopsSectionProps) => {
  const { user } = useKindeBrowserClient();
  const [userTeams,setUserTeams]=useState<UserTeam[]>();
  const router=useRouter()

  const fetchUserData = async (email:string) => {
    const data = await fetchUserTeams(email);
    setUserTeams(data);
    data && setActiveTeam(data[0]);
  };

  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  useEffect(()=>{
   user && fetchUserData(user?.email as string);
  },[user])

  return (
    <div className="flex flex-1 flex-col gap-y-6">
      <Popover>
        <PopoverTrigger>
          <div className="flex w-fit cursor-pointer items-center gap-x-4 rounded-lg p-3 font-bold hover:bg-slate-200">
            <Image src='/aries-logo-v1.png' alt='logo'
                        width={60}
                        height={40} />
            {activeTeam?<span>{activeTeam?.name}</span> :<Loader/>}<ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className=" mt-2 w-60 p-2">
          {userTeams?.map((team, index) => (
            <h2
              key={index}
              className={`flex cursor-pointer items-center my-1
                         rounded-lg p-2 text-sm hover:bg-gray-100
                         ${activeTeam?.id == team.id && "bg-blue-500  hover:text-foreground"}
                        `}
                        onClick={()=>setActiveTeam(team)}
            >
              {team.name}
            </h2>
          ))}
          <Separator className="my-2 bg-slate-100" />
          {menu.map((item, index) => (
            <h2
              key={index}
              className="flex cursor-pointer items-center
                        gap-2 rounded-lg p-2 text-sm hover:bg-gray-100"
                        onClick={()=>router.push(`${item.path}`)}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </h2>
          ))}
          <LogoutLink>
            <h2
              className="flex cursor-pointer items-center
                        gap-2 rounded-lg p-2 text-sm hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </h2>
          </LogoutLink>

          <Separator className="my-2 bg-slate-100" />
          {user && (
            <div className="mt-2 flex items-center gap-2">
              <Image
                src={user?.picture as string}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <h2 className="text-[14px] font-bold">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
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
