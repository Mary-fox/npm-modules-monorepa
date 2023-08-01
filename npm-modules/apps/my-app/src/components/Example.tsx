import React from 'react';
import { useMediaQuery} from '@mary-fox/react-media-query';


const Example = () => {
  const isDesktopOrLaptop = useMediaQuery({
    minWidth: 1224,
  });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' }); // Запрос для устройств в портретной ориентации
  const isRetina = useMediaQuery({ minResolution: '2dppx' }); // Запрос для устройств с высокой плотностью пикселей (retina)

  return (
    <div>
      <h1>Device Test!</h1>
      {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isBigScreen && <p>You have a huge screen</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
      {isRetina && <p>You are retina</p>}
    </div>
  );
};

export default Example;