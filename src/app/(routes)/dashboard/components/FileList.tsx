"use client";

import { useContext, useEffect, useState } from "react";
import {
  FileContextType,
  FileListContext,
} from "@/app/context/FileListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import moment from "moment";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  MoreHorizontal,
  Move,
  Pen,
  Share2,
  Copy,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { File } from "@/lib/types";

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

const FileList = ({ files }: any) => {
  const { fileList } = useContext(FileListContext) as FileContextType;
  const [teamFiles, setTeamFiles] = useState<File[]>();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList && setTeamFiles(fileList);
  }, [fileList]);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-[12px]">
        {!files && (
          <div className="flex gap-x-2">
            <p>Loading</p>
            <Loader2 size={20} className="animate-spin" />
          </div>
        )}
        {files?.length != 0 ? (
          <>
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
              <>
                {files?.map((file: File, index: number) => (
                  <tr
                    key={index}
                    onClick={() => router.push(`/workspace/${file.id}`)}
                    className="hover:cursor-pointer hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap p-3 text-sm font-medium text-gray-900">
                      {file.name}
                    </td>
                    <td className="whitespace-nowrap p-3 text-gray-700">
                      {moment(file.createdAt).format("DD MMM YYYY")}
                    </td>
                    <td className="whitespace-nowrap p-3 text-gray-700">
                      {moment(file.updatedAt).format("DD MMM YYYY")}
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
                          <MoreHorizontal className=" rounded-md p-[2px] hover:bg-slate-200" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {menuList.map((menu, index) => (
                            <DropdownMenuItem
                              className="cursor-pointer gap-3"
                              key={index}
                            >
                              <menu.icon className="h-4 w-4" /> {menu.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </>
        ) : (
          <div className="mt-4 pl-4 text-lg font-semibold">
            No Files To Show
          </div>
        )}
      </table>
    </div>
  );
};

export default FileList;
