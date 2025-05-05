

import React from "react";
import ClientLayout from "./ClientLayout";
import { fetchAllMaps } from "../actions/fetchAllMaps";
import { redirect } from "next/navigation";
import { fetchProfile } from "../actions/fetchProfile";




 


export default async function DashBoardLayout({ children }: { children: React.ReactNode }){
  const session = await fetchProfile();
  if (!session) {
    redirect("/signup");
  }

  const sideBarData = await fetchAllMaps();
  
  return (
    <>
    <ClientLayout session={session} sideBarData={sideBarData}>

      {children}
    </ClientLayout>
    
    
    </>
    
  );
};
