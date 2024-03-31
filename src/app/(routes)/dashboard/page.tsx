"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { checkForUserTeam } from "./action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from './components/Header';
import FileList from "./components/FileList";


const checkUser = async (email: string) => {
  const response = await axios.get(`/api/user?email=${email}`);
  return response.data;
};

const createUser = async ({ given_name, email, picture }: KindeUser) => {
  try {
    await axios.post(`/api/user`, {
      name: given_name,
      email: email,
      image: picture,
    });
  } catch (error) {
    console.log(error);
  }
};

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useKindeBrowserClient();

  const queryKey = ["userData", user?.email];

  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => checkUser(user?.email as string),
    enabled: !!user,
  });
  if (!isLoading && !isUserDataLoading && userData?.status === 404) {
    createUser(user as KindeUser);
  }
  async function fetchData(userEmail:string) {
    try {
      const response = await checkForUserTeam(userEmail);

      if (response?.length === 0) {
        router.push("/teams/create"); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(()=>{
   fetchData(user?.email as string);
  },[user?.email]);
 
  return (
    <div className="text-black">
      <Header/>
      <FileList/>
    </div>
  );
}
