import Modal from "react-bootstrap/Modal";
import "./confirmModal.scss";

function ConfirmModal({ text, action }) {
  return (
    <Modal.Body className="confirm-body text-center">
      <p>{text}</p>
      <button className="btn btn-primary my-2 mt-3" onClick={action}>
        Yes
      </button>
    </Modal.Body>
  );
}

export default ConfirmModal;
