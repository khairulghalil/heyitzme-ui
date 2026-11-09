import Modal from "react-bootstrap/Modal";
import "./NFCModal.scss";

function NFCModal({ onClose, handleCopyLink }) {
  return (
    <Modal.Body className="nfc-body text-start p-4">
      <div className="d-flex header-wrapper justify-content-start mb-4 pb-3">
        <div className="icon me-3">
          <i className="bi bi-info"></i>
        </div>
        <h2 className="modal-app-header align-self-center fw-bold">
          Setting Up NFC Card
        </h2>
      </div>
      <p>Follow the instructions to create your NFC card.</p>
      <ol>
        <li>Save the NFC template.</li>
        <li>
          Purchase custom card sticker
          <a href="https://my.shp.ee/F2VS4Doh" target="_blank" className="ms-1">
            here
          </a>
          .
        </li>
        <li>
          Purchase a blank NFC card
          <a href="https://my.shp.ee/ejDDgvpx" target="_blank" className="ms-1">
            here
          </a>
          .
        </li>
        <li>
          Download NFC writer app {"("}
          <a
            href="https://apps.apple.com/app/nfc/id1252962749"
            target="_blank"
            className="mx-1"
          >
            IOS
          </a>
          {","}
          <a
            href="https://play.google.com/store/apps/details?id=com.wakdev.wdnfc"
            target="_blank"
            className="mx-1"
          >
            Android
          </a>
          {")"}.
        </li>
        <li>
          Copy your HeyItzMe URL.{" "}
          <i className="bi bi-copy ms-3" onClick={handleCopyLink}></i>
        </li>
        <li>
          Write data (add website record) to the NFC card using the NFC writer
          app.
        </li>
        <li>
          Test by tapping the NFC card to your phone to ensure it works
          correctly.
        </li>
      </ol>
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-secondary my-2 mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal.Body>
  );
}

export default NFCModal;
