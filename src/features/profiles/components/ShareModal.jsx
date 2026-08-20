import Modal from "react-bootstrap/Modal";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "../../../components";
import * as logo from "../../../assets/img/logo";

function ShareModal({ profileUrl }) {
  const { showToast } = useToast();
  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      showToast("Link copied!");
    } catch (error) {
      console.error("Failed to copy profile link:", error);
    }
  };

  return (
    <Modal.Body className="share-body text-center">
      <QRCodeSVG
        id="qrcode"
        value={profileUrl}
        size={270}
        imageSettings={{
          src: logo.icon,
          height: 50,
          width: 50,
          excavate: true,
        }}
      />
      <p id="profile-url">{profileUrl}</p>
      <button
        className="btn btn-primary my-2 mt-3"
        onClick={() => copyProfileLink()}
      >
        Copy Link
      </button>
    </Modal.Body>
  );
}

export default ShareModal;
