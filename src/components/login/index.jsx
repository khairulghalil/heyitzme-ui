import Modal from "react-bootstrap/Modal";
import * as logo from "../../assets/img/logo";
import "./login.scss";

function LoginModal({ showLoginModal, setShowLoginModal }) {
  const handleLogin = () => {
    // Implement login logic here
    console.log("Login button clicked");
  };

  return (
    <Modal
      show={showLoginModal}
      onHide={() => setShowLoginModal(false)}
      centered
      className="loginModal"
    >
      <Modal.Body className="login-body text-center">
        <img src={logo.logo} className="logo img-fluid my-5" alt="Logo" />

        <div className="text-start my-3 mx-3">
          <label htmlFor="login-username" className="form-label fw-bold">
            <i className="bi bi-person me-2"></i>
            Username
          </label>

          <input type="text" className="form-control" id="login-username" />
        </div>

        <div className="text-start my-4 mx-3">
          <label htmlFor="login-password" className="form-label fw-bold">
            <i className="bi bi-lock me-2"></i>
            Password
          </label>

          <input type="password" className="form-control" id="login-password" />

          <p className="text-end mt-2">Forgot Password?</p>
        </div>

        <button
          type="button"
          className="btn btn-primary my-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
