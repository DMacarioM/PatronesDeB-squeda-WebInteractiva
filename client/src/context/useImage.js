import { useState, useEffect } from 'react';

const useImage = (url) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setImage(img);
    };
  }, [url]);

  return image;
};

export default useImage;
