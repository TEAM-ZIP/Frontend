import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const defaultLatitude = 33.450701; // 기본 위도
const defaultLongitude = 126.570667; // 기본 경도

export const useMap = (latitude?: number, longitude?: number) => {
  useEffect(() => {
    const initializeMap = (lat: number, lng: number) => {
      const container = document.getElementById('map');
      if (container) {
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      }
    };

    if (latitude && longitude) {
      initializeMap(latitude, longitude);
    } else {
      initializeMap(defaultLatitude, defaultLongitude);
    }
  }, [latitude, longitude]);
};
