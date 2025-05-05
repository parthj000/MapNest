'use client';
import { DashboardContext } from '@/hooks/dashboardContext';
import { useContext, useEffect } from 'react';
import Flow from '../../mydiagram';
import LoadingComponent from '@/components/LoadingComponent';

export default function Page() {
  
  const {  mapData,setGlobalLoading,globalLoading } = useContext(DashboardContext);
  
  useEffect(()=>{
    if(globalLoading){
      setGlobalLoading(false)

    }
    
  },[])

  

  

  return (
    <>
    {globalLoading?<LoadingComponent />:<Flow data={mapData.mapJson} />}
    
      
    </>
  );
}
