export const currentMarker = (map: any, position: any) => {
  const imageUrl = '/icons/zip/current.svg'; // 절대 경로
  const imageSize = new window.kakao.maps.Size(45, 45);
  const imageOffset = new window.kakao.maps.Point(22, 35);

  try {
    const markerImage = new window.kakao.maps.MarkerImage(imageUrl, imageSize, imageOffset);
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map); // 지도에 마커 추가
    return marker;
  } catch (error) {
    console.error('Marker 생성 중 오류 발생:', error);
    throw error;
  }
};
