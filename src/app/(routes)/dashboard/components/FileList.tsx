"use client";

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
  Delete,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { File } from "@/lib/types";
import Loader from "@/components/Loader";
import {
  archiveFileById,
  deleteFileById,
  fetchAllFilesOfTeam,
  unarchiveFileById,
} from "../action";
import { toast } from "sonner";
import { useDataStore } from "@/lib/store";

const handleMenuItemClick = (
  fileId: string,
  func: (fileId: string, path?: string) => Promise<void>,
  path: string,
) => {
  func(fileId, path);
};

const FileList = ({ files, path }: any) => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const { setFileList, activeTeam } = useDataStore((state) => ({
    setFileList: state.setFileList,
    activeTeam: state.activeTeam,
  }));
  const getTeamFiles = async (teamId: string) => {
    try {
      const res = await fetchAllFilesOfTeam(teamId);
      setFileList(res as File[]);
    } catch (error) {
      console.log(error);
    }
  };

  const menuList = [
    {
      id: 1,
      name: path == "/dashboard/archived" ? "Unarchive" : "Archive",
      icon: Archive,
      func: async (fileId: string, path?: string) => {
        if (path === "/dashboard/archived") {
          const res = await unarchiveFileById(fileId);
          getTeamFiles(activeTeam?.id as string);
          res && toast("File UnArchived");
        } else {
          const res = await archiveFileById(fileId);
          getTeamFiles(activeTeam?.id as string);
          res && toast("File Archived");
        }
      },
    },
    {
      id: 2,
      name: "Rename",
      icon: Pen,
    },
    {
      id: 3,
      name: "Move",
      icon: Move,
    },
    {
      id: 4,
      name: "Duplicate",
      icon: Copy,
    },
    {
      id: 5,
      name: "Delete",
      icon: Delete,
      func: async (fileId: string, path?: string) => {
          const deletedFile = await deleteFileById(fileId);
          const allTeamFiles = await fetchAllFilesOfTeam(activeTeam?.id as string);
          setFileList(allTeamFiles as File[]);
          deletedFile && toast(`File ${deletedFile?.name} deleted.`);
      },
    },
  ];

  return (
    <div className="overflow-x-auto p-4">
      {files?.length != 0 ? (
        <table className="min-w-full divide-y divide-gray-200 bg-white text-[12px]">
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
                      {user ? (
                        <Image
                          src={user?.picture as string}
                          alt="user"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      ) : (
                        <Loader />
                      )}
                    </td>
                    <td className="whitespace-nowrap p-3 ">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className=" rounded-md p-[2px] " />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {menuList.map((menu, index) => (
                            <DropdownMenuItem
                              className={`cursor-pointer gap-3 ${menu.name === "Delete" ? "text-red-500 hover:bg-red-200 " : ""}`}
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("clicked");
                                if (
                                  menu.func &&
                                  typeof menu.func === "function"
                                ) {
                                  handleMenuItemClick(
                                    file.id,
                                    menu.func,
                                    path as string,
                                  );
                                }
                              }}
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
        </table>
      ) : (
        <div className="mt-4 pl-4 text-lg font-semibold">No Files To Show</div>
      )}
    </div>
  );
};

export default FileList;
