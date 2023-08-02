import React, { useEffect } from "react";
import { useDocumentVisibility } from "react-document-visibility-web";

const Visibility = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible: boolean) => {
      console.log("Visibility changed:", isVisible);
    });

    const unsubscribeSecondHandler = onVisibilityChange(
      (isVisible: boolean) => {
        console.log("Second handler:", isVisible);
      },
    );

    setTimeout(() => unsubscribeSecondHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
  }, [onVisibilityChange]);

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз Вкладка активна?{" "}
        {visible ? "да" : "нет"}
      </span>
    </div>
  );
};

export default Visibility;
