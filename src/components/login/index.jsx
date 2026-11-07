import { createContext, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setUsername(uname || "");
  }, [uname]);

  useEffect(() => {
    if (!show) return undefined;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const previousStyles = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.width = previousStyles.bodyWidth;
      body.style.overflow = previousStyles.bodyOverflow;
      html.style.overflow = previousStyles.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [show]);

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

      showToast("Signed In successfully", "success");

      handleClose();
    } catch (error) {
      setPassword("");
      showToast("Invalid Credentials", "error");
    }
  };
  return (
    <>
      <Loader show={loading} showLogo />

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="login-offcanvas w-100"
      >
        <Offcanvas.Header closeButton closeVariant="white" />
        <Offcanvas.Body className="login-body text-center">
          <div className="login-title d-flex flex-column align-items-center mb-4">
            <span>Member Access</span>
            <img className="login-logo" src={logo.logo} alt="HeyItzMe" />
            <p>
              Sign in to manage your profile and keep your connections up to
              date.
            </p>
          </div>
          <div className="login-form text-start m-3">
            <label htmlFor="login-username" className="form-label fw-bold">
              Username
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={uname !== ""}
              />
            </div>

            <label htmlFor="login-username" className="form-label fw-bold mt-3">
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock" aria-hidden="true"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control border-end-0"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="input-group-text password-visibility-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
            <p className="text-end mt-2">Forgot Password?</p>
            <div className="submit-form d-grid mt-3">
              <button
                type="button"
                className="btn btn-primary py-3 d-flex align-items-center justify-content-between text-start"
                onClick={() => handleLogin()}
              >
                Sign In
                <i className="bi bi-arrow-right-short" aria-hidden="true"></i>
              </button>
              <div className="no-profile d-flex align-items-center gap-3 my-3">
                <hr className="flex-grow-1 my-0" />
                <span className="text-muted small">
                  Dont have a profile yet?
                </span>
                <hr className="flex-grow-1 my-0" />
              </div>
              <button type="button" className="btn btn-secondary py-2 mb-1">
                Create Profile
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
