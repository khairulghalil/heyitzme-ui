import { QRCodeSVG } from "qrcode.react";
import html2pdf from "html2pdf.js";
import * as logo from "../../assets/img/logo";
import "./displayTemplate.scss";

const profilePictureUrl =
  "https://images.heyitzme.com/profiles/khairul-ghalil/khairul-ghalil-8.png";
const profileName = "Khairul Ghalil";
const profileUrl = "https://heyitzme.com/khairul-ghalil";

const primaryColor =
  getComputedStyle(document.documentElement)
    .getPropertyValue("--primary-color")
    .trim() || "#1c7188";
const gradientEndColor = darkenHex(primaryColor);

export const printDisplayTemplate = () => {
  const element = document.querySelector(".display-print-area");

  if (element) {
    html2pdf()
      .set({
        margin: 0,
        filename: "heyitzme-display-template.pdf",
        image: {
          type: "png",
        },
        html2canvas: {
          scale: 2,
          useCORS: true,

          onclone: async (clonedDocument) => {
            clonedDocument.querySelectorAll(".share-body").forEach((body) => {
              body.style.setProperty(
                "background",
                `linear-gradient(to bottom, ${primaryColor}, ${gradientEndColor})`,
                "important",
              );
            });
          },
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  }
};

function darkenHex(hex, factor = 0.4) {
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
}

function displayTemplate() {
  return (
    <>
      <div className="card-template display-print-area text-center d-flex flex-column justify-content-center">
        <div id="export-pdf" className="export-pdf share-body text-center">
          <div className="share-title d-flex flex-column align-items-center mb-4">
            <span>Stay Connected</span>
            <img className="share-logo" src={logo.logo} alt="HeyItzMe" />
            <p>
              It's just one scan away! Scan the QR code to instantly connect
              with me.
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
              </div>
            </div>
          </div>
          <p className="powered-by">
            Powered by: <span className="desc">HeyItzMe.com</span>
          </p>
        </div>
      </div>

      <button onClick={printDisplayTemplate}>Print PDF</button>
    </>
  );
}

export default displayTemplate;
