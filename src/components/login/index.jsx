import { createContext, useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useToast } from "../../components";
import * as logo from "../../assets/img/logo";
import "./login.scss";

const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [viewLogin, setViewLogin] = useState(false);
  const [uname, setUname] = useState("");

  const showLogin = (uname) => {
    if (uname) {
      setUname(uname);
    }
    setViewLogin(true);
  };

  const closeLogin = () => {
    setViewLogin(false);
  };

  return (
    <LoginContext.Provider value={{ showLogin, closeLogin }}>
      {children}

      <LoginModal show={viewLogin} onHide={closeLogin} uname={uname} />
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}

function LoginModal({ show, onHide, uname }) {
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(uname || "");
  }, [uname]);

  function handleLogin() {
    onHide();
    showToast("Login successful!");
  }
  return (
    <Modal show={show} onHide={onHide} centered className="loginModal">
      <Modal.Body className="login-body text-center">
        <img src={logo.logo} className="logo img-fluid my-5" alt="HeyItzMe" />

        <div className="text-start my-3 mx-3">
          <label htmlFor="login-username" className="form-label fw-bold">
            <i className="bi bi-person me-2"></i>
            Username
          </label>

          <input
            type="text"
            className="form-control"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            readOnly={uname !== ""}
          />
        </div>

        <div className="text-start my-4 mx-3">
          <label htmlFor="login-password" className="form-label fw-bold">
            <i className="bi bi-lock me-2"></i>
            Password
          </label>

          <input
            type="password"
            className="form-control"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-end mt-2">Forgot Password?</p>
        </div>

        <button
          type="button"
          className="btn btn-primary my-4"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </Modal.Body>
    </Modal>
  );
}
