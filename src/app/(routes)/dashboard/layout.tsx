"use client";

import SideBar from "./components/SideBar";
import { useEffect} from "react";
import { useDataStore } from "@/lib/store";
import HydrationZustand from "./components/Hydration";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   useEffect(() => {
     useDataStore.persist.rehydrate();
   }, []);

  return (
    <HydrationZustand>
      <div className="flex h-screen ">
        <SideBar />
        <div className=" flex grow flex-col text-white">{children}</div>
      </div>
    </HydrationZustand>
  );
}
