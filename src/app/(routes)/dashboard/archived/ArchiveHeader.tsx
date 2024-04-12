import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

const ArchiveHeader = ({ onSearch }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="flex h-20 w-full items-end justify-between gap-2 px-8 py-2">
  
        <p className="text-lg font-semibold">Archive</p>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200/70 px-2 py-[3px] hover:border-gray-300">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="max-w-36 outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
  
    </div>
  );
};

export default ArchiveHeader;
