import { currentMarker } from '../utils/currentMarker';

interface ILocation {
  latitude: number;
  longitude: number;
}

export const useCurrentLocation = (location?: ILocation, error?: string) => {
  return () => {
    if (!location) return;

    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const options = {
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, options);
    const position = new window.kakao.maps.LatLng(location.latitude, location.longitude);

    const marker = currentMarker(map, position);
    marker.setMap(map);
  };
};
