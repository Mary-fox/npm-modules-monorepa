import React, { useEffect } from 'react';
import { useDocumentVisibility } from '@mary-fox/react-document-visibility';

const Visibility = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible: boolean) => {
      console.log('Visibility changed:', isVisible);
    });

    const unsubscribeSecondHandler = onVisibilityChange((isVisible: boolean) => {
      console.log('Second handler:', isVisible);
    });

    setTimeout(() => unsubscribeSecondHandler(), 5000); // Unsubscribe from 'second handler' after 5 seconds
  }, [onVisibilityChange]);

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз
        Вкладка активна? {visible ? 'да' : 'нет'}
      </span>
    </div>
  );
};

export default Visibility;