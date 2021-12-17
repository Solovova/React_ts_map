import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; 
import MapBox_Type from "./mapbox_type";
// импортируем стили mapbox-gl чтобы карта отображалась коррекно

function MapboxMap({x,y,zoom}:MapBox_Type) {
    // здесь будет хранится инстанс карты после инициализации
  const [map, setMap] = React.useState<mapboxgl.Map>();

  // React ref для хранения ссылки на DOM ноду который будет 
  // использоваться как обязательный параметр `container` 
  // при инициализации карты `mapbox-gl`
  // по-умолчанию будет содержать `null`
    const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;
        // если объект window не найден,
        // то есть компонент рендерится на сервере
        // или dom node не инициализирована, то ничего не делаем
    if (typeof window === "undefined" || node === null) return;

    // иначе создаем инстанс карты передавая ему ссылку на DOM ноду
    // а также accessToken для mapbox
    const mapboxMap = new mapboxgl.Map({
      container: node,
            accessToken: "pk.eyJ1Ijoic29sb3ZvdmEiLCJhIjoiY2t4N25pMTd5MGF3MTJ2bjNocWJ4OTJzaCJ9.19RW0bmjdom7pIWRvDWBgQ",
            style: "mapbox://styles/mapbox/streets-v11",
      center: [x, y],
      zoom: zoom,
    });

    // и сохраняем созданный объект карты в React.useState
    setMap(mapboxMap);
    
    // чтобы избежать утечки памяти удаляем инстанс карты
		// когда компонент будет демонтирован
    return () => {
      mapboxMap.remove();
    };
  }, []);

    return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap