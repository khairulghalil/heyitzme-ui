function imageToBase64(url) {
  return fetch(`${url}&vcf=1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load profile image");
      }

      return response.blob();
    })
    .then(convertBlobToJpegBase64);
}

function convertBlobToJpegBase64(blob) {
  return new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
      const maxSize = 512;
      let { width, height } = image;

      if (width > height && width > maxSize) {
        height = Math.round((height * maxSize) / width);
        width = maxSize;
      } else if (height >= width && height > maxSize) {
        width = Math.round((width * maxSize) / height);
        height = maxSize;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(imageUrl);
        reject(new Error("Could not create canvas context"));
        return;
      }

      ctx.drawImage(image, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      const base64 = dataUrl.split(",")[1];

      URL.revokeObjectURL(imageUrl);

      resolve({
        base64,
        type: "JPEG",
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Failed to decode profile image"));
    };

    image.src = imageUrl;
  });
}

function foldVCardLine(line, maxLength = 74) {
  if (line.length <= maxLength) {
    return line;
  }

  let folded = "";
  let cursor = 0;

  while (cursor < line.length) {
    const chunk = line.slice(cursor, cursor + maxLength);

    if (cursor === 0) {
      folded += chunk;
    } else {
      folded += `\r\n ${chunk}`;
    }

    cursor += maxLength;
  }

  return folded;
}

function generateVCard(toSave, photoData) {
  const formattedName = toSave.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const nameParts = formattedName.trim().split(" ");

  const firstName = nameParts.shift() || "";
  const lastName = nameParts.join(" ");

  const photoLine = photoData?.base64
    ? foldVCardLine(
        `PHOTO;ENCODING=BASE64;TYPE=${photoData.type}:${photoData.base64}`,
      )
    : toSave.photo
      ? `PHOTO;VALUE=URI:${toSave.photo}`
      : null;

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${formattedName}`,
    `N:${lastName};${firstName};;;`,
    `TITLE:${toSave.position || ""}`,
    `TEL;TYPE=CELL:${toSave.phone || ""}`,
    `EMAIL;TYPE=INTERNET:${toSave.email || ""}`,
    `URL:${toSave.website || ""}`,
    photoLine,
    "END:VCARD",
    "",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export async function saveContact(profile) {
  const toSave = {
    name: profile.username,
    position: profile.bio,
    phone: profile.contact?.phone,
    email: profile.contact?.email,
    website: `https://heyitzme.com/${profile.username}`,
    photo: profile.profileImage
      ? `https://images.heyitzme.com/profiles/${profile.profileImage}?v=${profile.profileImageVer}`
      : null,
  };

  let photoData = null;

  if (toSave.photo) {
    try {
      photoData = await imageToBase64(toSave.photo);
    } catch (error) {
      console.warn(
        "Could not embed photo in vCard, using URI fallback.",
        error,
      );
    }
  }

  const vcard = generateVCard(toSave, photoData);

  const blob = new Blob([vcard], {
    type: "text/vcard;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${toSave.name}.vcf`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
