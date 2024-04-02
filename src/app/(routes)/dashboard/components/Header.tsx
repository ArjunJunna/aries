import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send,Loader2 } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const { user }: any = useKindeBrowserClient();
  return (
    <div className="flex h-20 w-full items-end justify-end gap-2 px-8 py-2">
      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200/70 px-2 py-[3px] hover:border-gray-300">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="max-w-36 outline-none"
          />
        </div>
        {user? <Image
          src={user?.picture}
          alt="user"
          width={25}
          height={25}
          className="cursor-pointer rounded-full"
        />:<Loader2 size={16} className="animate-spin"/>}
       

        <Button
          className="flex h-8 gap-1
        bg-blue-600 px-3 text-sm hover:bg-blue-700
        "
        >
          <Send className="h-3 w-3" /> Invite
        </Button>
      </div>
    </div>
  );
};

export default Header;
