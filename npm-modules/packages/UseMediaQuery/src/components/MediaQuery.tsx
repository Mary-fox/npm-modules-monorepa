import React, { ReactNode } from 'react';
import useMediaQuery, { MediaQueryOptions } from '../hook/UseMediaQuery';

export interface MediaQueryProps extends MediaQueryOptions {
  children: ReactNode | ((matches: boolean) => ReactNode);
}

const MediaQuery: React.FC<MediaQueryProps> = ({ children, ...mediaQueryOptions }) => {
  const matches = useMediaQuery(mediaQueryOptions);

  return (
    <>
      {typeof children === 'function' ? (children as (matches: boolean) => ReactNode)(matches) : matches && children}
    </>
  );
};

export default MediaQuery;