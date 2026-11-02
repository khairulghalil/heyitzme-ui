const MAX_OUTPUT_SIZE = 500;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.crossOrigin = "anonymous";
    image.src = src;
  });
}

export async function getCroppedImageFile(
  imageSrc,
  croppedAreaPixels,
  fileName,
  maxWidth = MAX_OUTPUT_SIZE,
) {
  const image = await loadImage(imageSrc);

  const outputWidth = Math.min(maxWidth, Math.round(croppedAreaPixels.width));
  const outputHeight = Math.round(
    (outputWidth * croppedAreaPixels.height) / croppedAreaPixels.width,
  );

  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    outputWidth,
    outputHeight,
  );

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );

  return new File([blob], fileName, { type: "image/png" });
}
