'use client';

import rawAnimationData from '@/components/loading.json';
import { useLottie } from 'lottie-react';

export default function LoadingComponent() {
 
  const animationData = JSON.parse(JSON.stringify(rawAnimationData));

  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <>
    <div className=" flex flex-row items-center justify-center w-75 h-75">
      {View}
       
    </div>
   
    </>
  );
}

