'use client';
import { DashboardContext } from '@/hooks/dashboardContext';
import { useParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import Flow from '../../mydiagram';
import Loading from '../../loading';

export default function Page() {
  
  const { allMaps, mapData,setMapData,setGlobalLoading,globalLoading } = useContext(DashboardContext);
  
  useEffect(()=>{
    globalLoading?
    setGlobalLoading(false):null;
  },[])

  

  

  return (
    <>
    {globalLoading?<Loading />:<Flow data={mapData.mapJson} />}
    
      
    </>
  );
}
