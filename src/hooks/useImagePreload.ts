import { useState, useEffect } from "react";

export default function useImagePreload(src: string) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageLoadPromise = new Promise<void>((res) => {
      const img = new Image();
      img.src = src; // replace with actual poster URL field
      img.onload = () => {
        console.log('이미지로드');
        res();
      };
      img.onerror = () => res(); // 에러가 발생해도 처리F
    });

    setLoading(true);

    imageLoadPromise.then(() => {
      setLoading(false);
    });
  }, [src]);

  return loading;
}
