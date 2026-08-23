import Modal from "react-bootstrap/Modal";

function ConfirmModal({ text, action }) {
  return (
    <Modal.Body className="share-body text-center">
      <p>{text}</p>
      <button className="btn btn-primary my-2 mt-3" onClick={action}>
        Yes
      </button>
    </Modal.Body>
  );
}

export default ConfirmModal;
