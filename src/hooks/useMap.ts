import { useEffect, useState } from 'react';
import { getLatLngFromAddress } from '../utils/getLatLngFromAddress';
import { createCustomMarker } from '../utils/markerUtils';

declare global {
  interface Window {
    kakao: any;
  }
}

const defaultLatitude = 33.450701;
const defaultLongitude = 126.570667;

export const useMap = (latitude?: number, longitude?: number, locations: { address: string }[] = []) => {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const container = document.getElementById('map');
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(latitude ?? defaultLatitude, longitude ?? defaultLongitude),
      level: 3,
    };

    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
  }, [latitude, longitude]);

  useEffect(() => {
    if (!map) return;

    // 기존 마커 삭제
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const addMarkers = async () => {
      const bounds = new window.kakao.maps.LatLngBounds(); // 🔥 지도 범위 객체 생성

      const newMarkers = await Promise.all(
        locations.map(async ({ address }, index) => {
          await new Promise((res) => setTimeout(res, index * 100)); // 🔥 API 요청 간격 100ms 추가

          try {
            const { lat, lng } = await getLatLngFromAddress(address);
            const position = new window.kakao.maps.LatLng(lat, lng);
            bounds.extend(position); // 🔥 지도 범위 확장

            const marker = createCustomMarker(map, position);
            return marker;
          } catch (error) {
            console.error(`주소 변환 실패: ${address}`, error);
            return null;
          }
        }),
      );

      setMarkers(newMarkers.filter((marker) => marker !== null));

      if (newMarkers.length > 0) {
        map.setBounds(bounds); // 🔥 모든 마커가 보이도록 지도 확대/이동
      }
    };

    addMarkers();
  }, [map, locations]);
};
