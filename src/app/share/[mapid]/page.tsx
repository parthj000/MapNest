'use server';


import { fetchOneMap } from '@/app/actions/fetchOneMap';
import Flow from '@/app/dashboard/mydiagram';


export default async function Page({ params }: { params:any }) {
    console.log(params);
  const data:any = await fetchOneMap(params.mapid);
  
  console.log(data);

  return (
    <>
    <div className='relative'>
    <h1 className='font-bold text-red-400 text-xl absolute top-0 left-0 z-4'>{data.error}</h1>
    <div className='flex flex-1 h-screen w-screen p-4'><Flow data={data.mapJson} />
          
    
    </div>
    </div>

    </>
  );
}



