import { useState, useEffect, useCallback } from "react";

export interface DocumentVisibilityHook {
  visible: boolean;
  count: number;
  onVisibilityChange: (handler: (isVisible: boolean) => void) => () => void;
}

export const useDocumentVisibility = (): DocumentVisibilityHook => {
  const [visible, setVisible] = useState<boolean>(
    document.visibilityState === "visible",
  );
  const [count, setCount] = useState<number>(0);

  const handleVisibilityChange = useCallback(() => {
    const isVisible = document.visibilityState === "visible";
    setVisible(isVisible);
    if (!isVisible) {
      setCount((prevCount) => prevCount + 1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  const onVisibilityChange = useCallback(
    (handler: (isVisible: boolean) => void) => {
      const wrappedHandler = () =>
        handler(document.visibilityState === "visible");
      document.addEventListener("visibilitychange", wrappedHandler);

      return () => {
        document.removeEventListener("visibilitychange", wrappedHandler);
      };
    },
    [],
  );

  return { visible, count, onVisibilityChange };
};
