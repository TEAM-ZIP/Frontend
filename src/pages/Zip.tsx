import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Zip = () => {
  useEffect(() => {
    let container = document.getElementById(`map`);
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
  }, []);

  return <div id="map" className="w-full h-full" />;
};

export default Zip;
