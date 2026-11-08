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
  const handleCopyLink = async () => {
    const copied = await copyToClipboard(profileUrl);

    if (copied) {
      showToast("Link copied", "success");
    }
  };

  return (
    <Offcanvas.Body
      id="export-pdf"
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
