import { createContext, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useToast, Loader } from "../../components";
import { login } from "../../store/auth/actions";
import { selectAuthLoading } from "../../store/auth/selectors";
import * as logo from "../../assets/img/logo";
import "./login.scss";

const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [viewLogin, setViewLogin] = useState(false);
  const [uname, setUname] = useState("");
  const [loginSuccessCallback, setLoginSuccessCallback] = useState(null);

  const showLogin = (uname, onSuccess) => {
    if (uname) {
      setUname(uname);
    }
    setLoginSuccessCallback(() => onSuccess);
    setViewLogin(true);
  };

  const closeLogin = () => {
    setViewLogin(false);
  };

  return (
    <LoginContext.Provider value={{ showLogin, closeLogin }}>
      {children}

      <LoginModal
        show={viewLogin}
        onHide={closeLogin}
        uname={uname}
        loginSuccessCallback={loginSuccessCallback}
        setLoginSuccessCallback={setLoginSuccessCallback}
      />
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}

function LoginModal({
  show,
  onHide,
  uname,
  loginSuccessCallback,
  setLoginSuccessCallback,
}) {
  const { showToast } = useToast();

  const loading = useSelector(selectAuthLoading);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(uname || "");
  }, [uname]);

  const dispatch = useDispatch();

  const handleClose = () => {
    setPassword("");
    onHide();
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showToast("Please enter username and password", "error");
      return;
    }

    try {
      const data = {
        username,
        password,
      };
      await dispatch(login(data)).unwrap();

      if (loginSuccessCallback) {
        loginSuccessCallback();
        setLoginSuccessCallback(null);
      }

      showToast("Login successful!", "success");

      handleClose();
    } catch (error) {
      setPassword("");
      showToast("Invalid Credentials", "error");
    }
  };
  return (
    <>
      <Loader show={loading} showLogo />
      <Modal show={show} onHide={handleClose} centered className="loginModal">
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
            className="btn btn-primary profile-theme my-4"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
