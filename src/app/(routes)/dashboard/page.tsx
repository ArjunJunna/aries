"use client";
import { useQuery } from "@tanstack/react-query";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { checkForUserTeam, createNewUser } from "./action";
import { useEffect,useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from './components/Header';
import FileList from "./components/FileList";
import { checkIfUserExist } from "./action";
import { useDataStore } from "@/lib/store";

export default function Dashboard() {
  const router = useRouter();
  const { user} = useKindeBrowserClient();
  const queryKey = ["userData", user?.email];
   const pathname = usePathname();

  const { data: userData, isSuccess } = useQuery({
    queryKey: queryKey,
    queryFn: () => checkIfUserExist(user?.email as string),
    enabled: !!user,
    //staleTime: 60*1000,
  });


 useEffect(() => {
   if (isSuccess && !userData) {
     createNewUser({
       email: user?.email as string,
       name: user?.given_name as string,
       image: user?.picture as string,
       password:'',
     });
   }
 }, [isSuccess, userData,user]);

  async function fetchData(userEmail: string) {
    try {
      const response = await checkForUserTeam(userEmail);

      if (response?.length === 0) {
        router.push("/teams/create"); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData(user?.email as string);
  }, [user?.email]);


 const  fileList  = useDataStore(state=>state.fileList)
 const [filteredFiles, setFilteredFiles] = useState(fileList?.filter((file) => !file.archive));


   const handleSearch = (searchTerm:any) => {
     if (!searchTerm) {
       setFilteredFiles(fileList?.filter((file) => !file.archive));
     } else {
       const filtered = filteredFiles?.filter((file) =>
         file.name.toLowerCase().includes(searchTerm.toLowerCase()),
       );
       setFilteredFiles(filtered);
     }
   };

   useEffect(() => {
     setFilteredFiles(fileList?.filter((file) => !file?.archive));
   }, [fileList]);


  return (
    <div className="text-black">
      <Header onSearch={handleSearch} />
      <FileList files={filteredFiles} path={pathname} />
    </div>
  );
}
