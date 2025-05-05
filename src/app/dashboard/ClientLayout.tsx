"use client";
import { SideBar } from "@/components/SideBar";
import { DashBoardTopBar } from "@/components/TopBar";
import { DashboardContext } from "@/hooks/dashboardContext";
import React, { useState } from "react";
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({
  children,
  session,
  sideBarData,
}: {
  children: React.ReactNode;
  session: any;
  sideBarData: any;
}) {
  const [mapData, setMapData] = useState<object>({});
  const [allMaps, setAllMaps] = useState<any[]>(sideBarData);
  const [toggle, setToggle] = useState<boolean>(false);
  const [globalLoading,setGlobalLoading] = useState<boolean>(false);

  return (
    <>
      <DashboardContext.Provider
        value={{ mapData, setMapData, allMaps, setAllMaps, toggle, setToggle,setGlobalLoading,globalLoading }}
      >
        <div className="h-screen w-screen flex flex-col">
          <Toaster />
          <DashBoardTopBar session={session} />
          <div className="h-[calc(100vh-50px)] grid grid-cols-12  gap-1 bg-[var(--nav-bg)] relative">
          <div
  className={`absolute top-0 left-0 z-20  max-w-50 md:max-w-[100vh] h-[calc(100vh-50px)]  pb-7 pt-4 shadow-2xl
    transition-all duration-700 ease-in-out transform
    md:static md:shadow-none md:col-span-2
    ${toggle
      ? "translate-x-0 opacity-100 pointer-events-auto"
      : "-translate-x-full opacity-0 pointer-events-none md:translate-x-0 md:opacity-100 md:pointer-events-auto"}
  `}
>
  <SideBar />
</div>


            <div className="col-span-12 md:col-span-10  h-[calc(100vh-50px)] bg-[var(--nav-bg)] w-full  p-2  pb-7 pt-4 ">
              <div className=" rounded-md  flex-1 h-full inset-shadow-sm bg-white flex justify-center items-center">
                {children}
              </div>
            </div>
          </div>
        </div>
      </DashboardContext.Provider>
    </>
  );
}

{
  /* 

            {/* children will reside here */
}
// <div className="md:col-span-10 col-span-12 rounded-xl bg-[var(--dash-bg)] flex justify-center items-center">
//   {children}
// </div>
