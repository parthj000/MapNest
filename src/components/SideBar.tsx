"use client";

import { DashboardContext } from "@/hooks/dashboardContext";
import { ArrowLeftToLine } from "lucide-react";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";


export const SideBar = () => {
  const router = useRouter();
  const { mapData, setMapData ,allMaps,setGlobalLoading,globalLoading} = useContext(DashboardContext);
  const [otherButton,setOtherButton] = useState(true);


  return (
    <>
    
      <div className="flex flex-col bg-[var(--new-bg)] rounded-md inset-shadow-sm relative h-full px-4 py-7">
        
        <h1 className="text-lg font-bold p-2 mb-4 border border-dashed rounded-sm text-center hover:cursor-pointer hover:bg-[var(--button-bg)] hover:shadow-sm border-2 border-black-900 hover:text-white" onClick={()=>{
          setOtherButton(true);
          router.push("/dashboard")}}> New +</h1>
        
        <ul className="flex-col flex gap-2.5 flex-1 overflow-y-auto max-h-full my-2 ">


          { allMaps.map(
            ({ mapJson, prompt,_id }: { mapJson: object; prompt: string,_id:string; }) => {
              
                
                return(
                  <li key={_id} onClick={()=>{
                    if(_id===mapData._id && !otherButton) return
                    setGlobalLoading(true);
                    setOtherButton(false);
                    
                  
                    setMapData({mapJson:mapJson,prompt:prompt,_id:_id});
                    
                    router.push(`/dashboard/m/${_id}`);
                    
                    
                    
                  }} className={
                    (mapData._id && mapData._id===_id && !otherButton)?
                    "flex w-full text-sm  hover:cursor-pointer rounded-sm p-2 font-semibold text-gray-900 bg-[var(--nav-bg)] border-1":
                    "flex w-full text-sm hover:bg-[var(--nav-bg)] hover:cursor-pointer rounded-sm p-2 font-semibold text-gray-900 bg-[white] border-1"

                  }>
                    {prompt}
                  </li>
                )
              
            }
          )}
        </ul>
      </div>
    </>
  );
};


