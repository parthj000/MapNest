

// export default function Loading() {
//   return (
//     <div className="pos-center">
//       <div className="loader"></div>
//     </div>
//   );
// }

'use client';

import rawAnimationData from '@/components/loading.json';
import { useLottie } from 'lottie-react';

export default function Loading() {
  // Clone the animation data to make it mutable
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

