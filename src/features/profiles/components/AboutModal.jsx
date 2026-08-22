import Modal from "react-bootstrap/Modal";
import moment from "moment";

function AboutModal({ profileData }) {
  return (
    <Modal.Body className="about-body text-start pt-4">
      <div>
        <p>
          <i className="bi bi-person me-2"></i>
          Username
        </p>
        <span>{profileData.username}</span>
      </div>

      <div>
        <p>
          <i className="bi bi-envelope me-2"></i>
          Registered email
        </p>
        <span>{profileData.contact.email}</span>
      </div>

      <div>
        <p>
          <i className="bi bi-link-45deg me-2"></i>Profile URL
        </p>
        <span>{`https://heyitzme.com/${profileData.username}`}</span>
      </div>

      <div>
        <p>
          <i className="bi bi-info-circle me-2"></i>
          Status
        </p>
        <span>{profileData.status.active ? "Active" : "Inactive"}</span>
      </div>

      <div>
        <p>
          <i className="bi bi-calendar-check me-2"></i>
          Valid until
        </p>
        <span>
          {moment(profileData.status.expiryDate).format("DD MMM YYYY")}
        </span>
      </div>
      <div className="about-footer text-center pt-1 m-0">
        <button type="button" className="btn btn-primary my-3">
          Renew Subscription
        </button>
      </div>
    </Modal.Body>
  );
}

export default AboutModal;
