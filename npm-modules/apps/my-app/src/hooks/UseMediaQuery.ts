import { useState, useEffect } from 'react';

export interface MediaQueryOptions {
  orientation?: 'portrait' | 'landscape';
  minResolution?: string | number;
  maxResolution?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
}
// принимает объект опций MediaQueryOptions и возвращает строку медиа-запроса.
// Преобразуем объект опций в массив пар ключ-значение с помощью Object.entries
// Преобразуем массив пар ключ-значение в строку медиа-запроса
const buildMediaQuery = (options: MediaQueryOptions): string => {
    const mediaQueryOptions = Object.entries(options).filter(([_, value]) => value !== undefined && value !== null);
  
    const mediaQueryString = mediaQueryOptions.map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      
      if (key === 'minResolution' && typeof value === 'number') {
        value = `${value}dppx`;
      }
  
      const queryValue = typeof value === 'number' ? `${value}px` : value;
      return `(${formattedKey}: ${queryValue})`;
    }).join(' and ');
  
    return mediaQueryString;
  };

const useMediaQuery = (options: MediaQueryOptions): boolean => {
  const mediaQueryString = buildMediaQuery(options);
  const [matches, setMatches] = useState<boolean>(() =>
    window.matchMedia(mediaQueryString).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [mediaQueryString]);

  return matches;
};

export default useMediaQuery;