export function compressImage(file: File, MAX_WIDTH: number, MAX_HEIGHT: number): Promise<Blob> {
  const MIME_TYPE = "image/jpeg";
  const QUALITY = 0.6;

  return new Promise((resolve, reject) => {
    const blobURL = URL.createObjectURL(file);
    const img: HTMLImageElement = new Image();
    img.src = blobURL;
    img.onerror = function () {
      URL.revokeObjectURL(this.src);
      reject(new Error("Cannot load image"));
    };
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Cannot get canvas context"));
        return;
      }
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Cannot create blob"));
          }
        },
        MIME_TYPE,
        QUALITY
      );
    };
  });
}

function calculateSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
): [number, number] {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}
