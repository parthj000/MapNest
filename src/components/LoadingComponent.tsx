'use client';

import { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';

export default function LoadingComponent() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/lottie/loading.json') // ensure the file is in public/lottie
      .then(res => res.json())
      .then(setAnimationData);
  }, []);

  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
  });

  return (
    <div className="flex items-center justify-center w-75 h-75">
      {animationData ? View : <span>Loading...</span>}
    </div>
  );
}
