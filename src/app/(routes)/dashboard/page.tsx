"use client";
import { useQuery } from "@tanstack/react-query";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { checkForUserTeam, createNewUser } from "./action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from './components/Header';
import FileList from "./components/FileList";
import { checkIfUserExist } from "./action";

export default function Dashboard() {
  const router = useRouter();
  const { user} = useKindeBrowserClient();
  const queryKey = ["userData", user?.email];

  const { data: userData} = useQuery({
    queryKey: queryKey,
    queryFn: () => checkIfUserExist(user?.email as string),
    enabled: !!user,
  });

 if (!userData) {
   createNewUser({
     email: user?.email,
     name: user?.given_name,
     image: user?.picture,
     password: "",
   });
 }
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

  return (
    <div className="text-black">
      <Header />
      <FileList />
    </div>
  );
}
