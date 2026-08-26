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
) {
  const image = await loadImage(imageSrc);

  const outputSize = Math.min(
    MAX_OUTPUT_SIZE,
    Math.round(croppedAreaPixels.width),
  );

  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    outputSize,
    outputSize,
  );

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );

  return new File([blob], fileName, { type: "image/png" });
}
