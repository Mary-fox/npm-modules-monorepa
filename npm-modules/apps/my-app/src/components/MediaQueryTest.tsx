import React from 'react';
// import { MediaQuery } from '@mary-fox/react-media-query';
import  { MediaQuery }  from 'react-media-query-web';

const MediaQueryTest = () => {
    return (
        <div>
          <h1>Device Test!</h1>
          <MediaQuery minWidth={1224}>
            <p>You are a desktop or laptop</p>
          </MediaQuery>
          <MediaQuery minWidth={1824}>
            <p>You also have a huge screen</p>
          </MediaQuery>
          <MediaQuery minResolution="2dppx">
            {(matches) =>
              matches ? <p>You are retina</p> : <p>You are not retina</p>
            }
          </MediaQuery>
        </div>
      );
    };

export default MediaQueryTest;