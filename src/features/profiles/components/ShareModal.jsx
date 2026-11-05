import Offcanvas from "react-bootstrap/Offcanvas";
import { QRCodeSVG } from "qrcode.react";
import html2pdf from "html2pdf.js";
import { useToast } from "../../../components";
import { copyToClipboard } from "../../../utils";
import * as logo from "../../../assets/img/logo";

function ShareModal({
  profileUrl,
  profilePictureUrl,
  proxyProfileImageUrl,
  profileName,
}) {
  const { showToast } = useToast();
  const darkenHex = (hex, factor = 0.4) => {
    const normalized = hex.replace("#", "");
    if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(normalized)) return "#000000";
    const expanded =
      normalized.length === 3
        ? normalized
            .split("")
            .map((char) => char + char)
            .join("")
        : normalized;
    const channels = expanded.match(/.{2}/g).map((channel) =>
      Math.round(parseInt(channel, 16) * factor)
        .toString(16)
        .padStart(2, "0"),
    );
    return `#${channels.join("")}`;
  };

  const handleSavePdf = async () => {
    const element = document.getElementById("test-export");
    if (!element) return;

    const primaryColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-color")
        .trim() || "#1c7188";
    const gradientEndColor = darkenHex(primaryColor);
    const fileName = `HeyItzMe-${(profileName || "profile").replace(/[\\/:"*?<>|]/g, "_")}.pdf`;
    let profilePictureDataUrl = null;

    if (profilePictureUrl) {
      try {
        const response = await fetch(proxyProfileImageUrl, {
          mode: "cors",
          cache: "reload",
        });
        if (!response.ok) throw new Error("Profile image request failed");

        const imageBlob = await response.blob();
        profilePictureDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageBlob);
        });
      } catch (error) {
        console.error("Could not load profile photo for PDF:", error);
        showToast(
          "Could not load the profile photo. Check the image CORS settings.",
          "error",
        );
        return;
      }
    }

    html2pdf()
      .set({
        filename: fileName,
        margin: 0,
        pagebreak: {
          mode: [],
        },
        html2canvas: {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
          windowWidth: 417,
          windowHeight: 445,
          scrollX: 0,
          scrollY: 0,

          onclone: async (clonedDocument) => {
            clonedDocument.querySelectorAll(".share-body").forEach((body) => {
              body.style.setProperty(
                "background",
                `linear-gradient(to bottom, ${primaryColor}, ${gradientEndColor})`,
                "important",
              );
            });

            if (profilePictureDataUrl) {
              const profileImage = clonedDocument.querySelector(
                ".qr-profile-picture",
              );
              if (profileImage) {
                profileImage.removeAttribute("crossorigin");
                profileImage.src = profilePictureDataUrl;
                await profileImage.decode?.().catch(() => {});
              }
            }

            clonedDocument.querySelectorAll(".no-pdf").forEach((element) => {
              element.style.setProperty("display", "none", "important");
            });

            clonedDocument
              .querySelectorAll(".powered-by")
              .forEach((element) => {
                element.style.setProperty("display", "block", "important");
              });

            clonedDocument
              .querySelectorAll(".share-body")
              .forEach((element) => {
                element.style.setProperty(
                  "padding",
                  "60px 70px 100px",
                  "important",
                );
              });

            clonedDocument
              .querySelectorAll(".qr-code-container")
              .forEach((element) => {
                element.style.setProperty(
                  "background-color",
                  "transparent",
                  "important",
                );
                element.style.setProperty(
                  "box-shadow",
                  "0 8px 28px rgba(0, 0, 0, 0.42)",
                  "important",
                );
              });

            clonedDocument
              .querySelectorAll(".qr-code-wrapper")
              .forEach((element) => {
                element.style.setProperty(
                  "box-shadow",
                  "0 6px 22px rgba(0, 0, 0, 0.38)",
                  "important",
                );
                element.style.setProperty(
                  "border",
                  "1px solid rgba(0, 0, 0, 0.14)",
                  "important",
                );
              });
          },
        },
        jsPDF: {
          unit: "mm",
          format: [160.33, 185.74],
          orientation: "portrait",
        },
      })
      .from(element)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        if (pdf.internal.getNumberOfPages() > 1) {
          for (
            let page = pdf.internal.getNumberOfPages();
            page > 1;
            page -= 1
          ) {
            pdf.deletePage(page);
          }
        }

        pdf.save(fileName);
      })
      .catch((error) => {
        console.error("Could not create profile PDF:", error);
        showToast("Could not save the PDF. Please try again.", "error");
      });
  };

  const handleCopyLink = async () => {
    const copied = await copyToClipboard(profileUrl);

    if (copied) {
      showToast("Link copied", "success");
    }
  };

  return (
    <Offcanvas.Body
      id="test-export"
      className="export-pdf share-body text-center"
    >
      <div className="share-title d-flex flex-column align-items-center mb-4">
        <span>Stay Connected</span>
        <img className="share-logo" src={logo.logo} alt="HeyItzMe" />
        <p>
          It's just one scan away! Scan the QR code to instantly connect with
          me.
        </p>
      </div>
      <div className="qr-code-container">
        <div className="qr-code-wrapper">
          <QRCodeSVG
            id="qrcode"
            value={profileUrl}
            size={220}
            imageSettings={{
              src: logo.icon,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
          <img
            className="qr-center-logo"
            src={logo.icon}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="qr-footer d-flex flex-column">
          <div className="qr-link-row d-flex align-items-center w-100">
            <img
              className="img-fluid qr-profile-picture"
              src={profilePictureUrl || undefined}
              alt=""
              aria-hidden="true"
            />
            <div className="qr-link-details p-0 d-flex flex-column align-items-start justify-content-start text-start">
              <p className="profile-link-label">{profileName}</p>
              <span id="profile-url">
                {profileUrl.replace(/^https?:\/\//, "")}
              </span>
            </div>
            <div className="qr-link-copy p-0 d-flex align-items-center ms-auto">
              <button
                className="btn btn-primary copy profile-theme"
                onClick={() => handleCopyLink()}
              >
                <i className="bi bi-copy no-pdf"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="powered-by d-none">
        Powered by: <span className="desc">HeyItzMe.com</span>
      </p>

      <div className="share-footer no-pdf d-flex flex-column align-items-center m-auto">
        <div className="row w-100 px-1">
          <div className="col-8 p-0 d-flex flex-column align-items-start justify-content-center">
            <p className="profile-link-label">Save and share</p>
            <span id="profile-url">Download this QR for easy sharing</span>
          </div>
          <div className="col-4 p-0 d-flex align-items-center justify-content-end">
            <button
              className="btn btn-primary share profile-theme"
              onClick={() => handleSavePdf()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Offcanvas.Body>
  );
}

export default ShareModal;
