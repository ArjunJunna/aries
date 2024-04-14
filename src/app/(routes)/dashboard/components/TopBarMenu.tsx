import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronDown,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
import { UserTeam } from "@/lib/types";
import { useRouter } from "next/navigation";

type TopBarMenuProps = {
  activeTeam: UserTeam | undefined;
  userTeams: UserTeam[] | undefined;
  setActiveTeam: (activeTeam: UserTeam) => void;
};

const TopBarMenu = ({activeTeam,userTeams,setActiveTeam}:TopBarMenuProps) => {
     const router = useRouter();
     const { user } = useKindeBrowserClient();
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
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="flex w-fit cursor-pointer items-center gap-x-4 rounded-lg p-3 font-bold hover:bg-slate-200">
            <Image src="/aries-logo-v1.png" alt="logo" width={60} height={40} />
            {activeTeam ? <span>{activeTeam?.name}</span> : <Loader />}
            <ChevronDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className=" mt-2 w-60 p-2">
          {userTeams?.map((team, index) => (
            <h2
              key={index}
              className={`my-1 flex cursor-pointer items-center
                         rounded-lg p-2 text-sm hover:bg-gray-100
                         ${activeTeam?.id == team.id && "bg-blue-500  hover:text-foreground"}
                        `}
              onClick={() => {setActiveTeam(team)
                setActiveTeam(team)
              }}
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
              onClick={() => router.push(`${item.path}`)}
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
    </>
  );
};

export default TopBarMenu;
