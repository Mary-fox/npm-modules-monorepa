import { ReactNode } from 'react';
import { useMediaQuery } from '../hook/UseMediaQuery';

type ResolutionType = `${number}dppx` | number;

export type QueryProps = {
  orientation?: string;
  minResolution?: ResolutionType;
  maxResolution?: ResolutionType;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children?: ReactNode | ((matches: boolean) => ReactNode);
};

// Создает строку медиа-запроса для заданного ключа и значения.
const getQueryString = (key: string, value: ResolutionType | number | string) => {
  const formattedKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  if (formattedKey === 'orientation') return `(${formattedKey}: ${value})`;
  if (formattedKey.includes('resolution')) return `(${formattedKey}: ${typeof value === 'number' ? `${value}dppx` : value})`;
  return `(${formattedKey}: ${value}px)`;
};

export const buildMediaQuery = (props: Omit<QueryProps, 'children'>): string => {
  if (Object.keys(props).length === 0) throw new Error('No props provided. Returning a default media query.');
  return Object.keys(props)
    .map(([key, value]) => getQueryString(key, value))
    .join(' and ');
};


// Получаем булево значение, указывающее, соответствует ли текущий медиа-запрос свойствам props.
const MediaQuery = ({ children, ...props }: QueryProps) => {
  const mediaQueryMatch = useMediaQuery({
    query: buildMediaQuery(props),
  });

  return (
    <>
      {typeof children === 'function'
        ? mediaQueryMatch && children(mediaQueryMatch)
        : mediaQueryMatch && <>{children}</>}
    </>
  );
};

export default MediaQuery;