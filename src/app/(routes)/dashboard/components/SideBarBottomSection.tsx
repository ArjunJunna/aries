"use client";

import { Button } from "@/components/ui/button";
import { Archive, Flag, Github, Lock, Book } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createNewFile, fetchAllFilesOfTeam } from "../action";
import FormSubmitButton from "@/components/FormSubmitButton";
import { toast } from "sonner";

type UserTeam = {
  id: number;
  name: string;
  userId: number;
};

type BottomSectionProps = {
  activeTeam: UserTeam | undefined;
};

const SideBarBottomSection = ({ activeTeam }: BottomSectionProps) => {
  const [totalTeamFiles,setTotalTeamFiles]=useState<number>(0);
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

  const getTeamFiles=async(teamId:number)=>{
    try {
      const res = await fetchAllFilesOfTeam(teamId);
      
      setTotalTeamFiles(res?.length as number);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    activeTeam && getTeamFiles(activeTeam.id);
  },[activeTeam])

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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-6 w-full
          justify-start bg-blue-500 font-bold text-white hover:bg-blue-600 hover:text-white "
          >
            New File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form action={async(formData)=>{
            const res=await createNewFile(formData)
            if(res?.status===200){
              getTeamFiles(activeTeam?.id as number);
              toast(res.message)
            }
          }}>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                <Input type="hidden" name="teamId" value={activeTeam?.id} />
                <Input type="hidden" name="userId" value={activeTeam?.userId} />
                <Input type="text" name="fileName" />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <FormSubmitButton className="mt-4 ">Submit</FormSubmitButton>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-5 h-4 w-full rounded-full bg-gray-200">
        <div
          className={`h-4  rounded-full bg-blue-600`}
          style={{ width: `${(totalTeamFiles/5)*100}%` }}
        ></div>
      </div>

      <h2 className="mt-3 text-[12px]">
        <strong>{totalTeamFiles}</strong> out of
        <strong> 5</strong> files used
      </h2>
      <h2 className="mt-1 text-[12px]">
        <span className="underline hover:cursor-pointer">Upgrade</span> your plan for unlimited
        access.
      </h2>
    </div>
  );
};

export default SideBarBottomSection;
