/*"use client";
import axios from "axios";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    fetchData();
  }, [user?.email]);

   const fetchData = async () => {
    try {
       if (user?.email ?? true) {
       const response = await axios.get(
         `http://localhost:3000/api/user?email=${user?.email}`,
       );

       if (response.data?.status === 404) {
        await axios.post(`http://localhost:3000/api/user`, {
          name: user?.given_name,
          email: user?.email,
          image: user?.picture,
        });
       }
     }
    } catch (error) {
      console.log(error)
    }
   };

  return (
    <>
      <div>Dashboard Content</div>
      {isLoading ? <div>Loading</div> : <div>{user?.email}</div>}
      <LogoutLink>Logout</LogoutLink>
    </>
  );
}
*/
/*

"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import prisma from "@/lib/prisma";
import { useEffect } from "react";
import { checkForUserTeam } from "./action";

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
  useEffect(()=>{
    async function check(){
       await checkForUserTeam(user?.email as string)
    }
    check()
  },[user?.email])

  return (
    <>
      <div>Dashboard Content</div>
      {isLoading || isUserDataLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div>{user?.email}</div>
          {userData && <div>User Data: {userData.email}</div>}
        </>
      )}
      <LogoutLink>Logout</LogoutLink>
    </>
  );
}

*/


"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { checkForUserTeam } from "./action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


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
      console.log("res from fetchData:", response);

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
    <>
      <div>Dashboard Content</div>
      {isLoading || isUserDataLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div>{user?.email}</div>
      
        </>
      )}
      <LogoutLink>Logout</LogoutLink>
    </>
  );
}
