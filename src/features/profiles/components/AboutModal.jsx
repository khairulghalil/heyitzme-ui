import Modal from "react-bootstrap/Modal";

function AboutModal({ profileData }) {
  return (
    <Modal.Body className="about-body text-start pt-4">
      <p>
        <i className="bi bi-person me-2"></i>
        Username
      </p>
      <span>{profileData.username}</span>

      <p>
        <i className="bi bi-envelope me-2"></i>
        Registered email
      </p>
      <span>{profileData.contact.email}</span>

      <p>
        <i className="bi bi-link-45deg me-2"></i>Profile URL
      </p>
      <span>{`https://heyitzme.com/${profileData.username}`}</span>

      <p>
        <i className="bi bi-info-circle me-2"></i>
        Status
      </p>
      <span>{profileData.status.active ? "Active" : "Inactive"}</span>

      <p>
        <i className="bi bi-calendar-check me-2"></i>
        Valid until
      </p>
      <span>{profileData.status.expiryDate}</span>

      <div className="text-center">
        <button type="button" className="btn btn-primary my-3">
          Renew Subscription
        </button>
      </div>
    </Modal.Body>
  );
}

export default AboutModal;
