const cropImage = (url: string, displayWidth: number, displayHeight: number): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const scale = 2; // ✅ 2배 해상도
      canvas.width = displayWidth * scale;
      canvas.height = displayHeight * scale;

      const aspectRatioImg = img.width / img.height;
      const aspectRatioCanvas = displayWidth / displayHeight;

      let sx = 0,
        sy = 0,
        sWidth = img.width,
        sHeight = img.height;

      if (aspectRatioImg > aspectRatioCanvas) {
        sWidth = img.height * aspectRatioCanvas;
        sx = (img.width - sWidth) / 2;
      } else {
        sHeight = img.width / aspectRatioCanvas;
        sy = (img.height - sHeight) / 2;
      }

      ctx?.drawImage(
        img,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        canvas.width,
        canvas.height, // ✅ 2배 크기로 그리기
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' });
            resolve(file);
          }
        },
        'image/jpeg',
        0.95,
      );
    };
  });
};

export default cropImage;
