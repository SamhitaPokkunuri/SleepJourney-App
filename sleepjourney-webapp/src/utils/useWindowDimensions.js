import { useEffect, useState } from 'react';

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow) {
    function getWindowDimensions() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return { width, height };
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
  }
  return { width: 0, height: 0 };
}
