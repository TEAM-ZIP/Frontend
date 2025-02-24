type GeocoderAddress = {
  address_name: string;
  x: string;
  y: string;
};

export const getLatLngFromAddress = (address: string): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      reject(new Error('카카오맵 API가 로드되지 않았습니다.'));
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: GeocoderAddress[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        const lat = Number(result[0].y);
        const lng = Number(result[0].x);
        resolve({ lat, lng });
      } else {
        reject(new Error(`주소 변환 실패: ${address}`));
      }
    });
  });
};
