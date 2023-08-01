import { useState, useEffect, useRef } from 'react';

export type QueryType = {
  query: string;
};

export const useMediaQuery = ({ query }: QueryType, isSSR = false) => {
  const [matches, setMatches] = useState(isSSR ? false : undefined);
  // Создаем ref с помощью хука useRef для хранения ссылки на объект MediaQueryList.
  const queryList = useRef<MediaQueryList>();
  useEffect(() => {
     // Проверяем, поддерживается ли объект "matchMedia" в текущей среде (например, в браузере).
    if ('matchMedia' in window) {
      queryList.current = window.matchMedia(query);
      const handleMediaQuery = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      queryList.current.addEventListener('change', handleMediaQuery);
      setMatches(queryList.current.matches);
      return () => {
        queryList.current?.removeEventListener('change', handleMediaQuery);
      };
    }

    return undefined;
  }, [query]);

  return matches;
};