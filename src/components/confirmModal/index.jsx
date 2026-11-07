import Modal from "react-bootstrap/Modal";
import "./confirmModal.scss";

function ConfirmModal({ title, text, action, onClose }) {
  return (
    <Modal.Body className="confirm-body text-start p-4">
      <div className="d-flex header-wrapper justify-content-start mb-4 pb-3">
        <div className="icon me-2">
          <i className="bi bi-info"></i>
        </div>
        <h2 className="modal-app-header align-self-center fw-bold">{title}</h2>
      </div>
      <p>{text}</p>
      <span>
        <i className="bi bi-exclamation-triangle-fill me-2"></i>This action
        cannot be undone.
      </span>
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-primary my-2 mt-3" onClick={action}>
          Yes
        </button>
        <button className="btn btn-secondary my-2 mt-3" onClick={onClose}>
          No
        </button>
      </div>
    </Modal.Body>
  );
}

export default ConfirmModal;
