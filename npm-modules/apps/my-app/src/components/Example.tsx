import { useMediaQuery } from "react-media-query-web2";

const Example = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" }); // Добавляем "px" и знак сравнения
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" }); // Добавляем "px" и знак сравнения
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" }); // Запрос для устройств в портретной ориентации
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" }); // Запрос для устройств с высокой плотностью пикселей (retina)

  return (
    <div>
      <h1>Device Test1!</h1>
      {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isBigScreen && <p>You have a huge screen</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p>
      {isRetina && <p>You are retina</p>}
    </div>
  );
};

export default Example;
