import {useState, useEffect, useRef } from "react";

export type QueryType = {
  query: string;
};

export const useMediaQuery = ({ query }: QueryType, initialState = false) => {
  const [matches, setMatches] = useState(initialState);
  // хранения текущего состояния "matches"
  const queryList = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    // Проверяем, поддерживается ли объект "matchMedia" в текущей среде (например, в браузере).
    if ("matchMedia" in window) {
      queryList.current = window.matchMedia(query);
      const handleMediaQuery = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      queryList.current.addEventListener("change", handleMediaQuery);
      setMatches(queryList.current.matches);
      return () => {
        queryList.current?.removeEventListener("change", handleMediaQuery);
      };
    }
  }, [query]);

  return matches;
};
