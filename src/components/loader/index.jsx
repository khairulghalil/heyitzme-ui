import { Spinner } from "react-bootstrap";
import * as logo from "../../assets/img/logo";
import "./loader.scss";

function Loader({ showLogo = false, show = true, opacity = 0.8 }) {
  return (
    <div
      className={`loader ${!show ? "hide" : ""}`}
      style={{ backgroundColor: `rgba(25, 25, 25, ${opacity})` }}
    >
      <div className="loader-content">
        {showLogo && (
          <img
            src={logo.logo}
            alt="HeyItzMe Logo"
            className="loader-logo mb-2"
          />
        )}

        <div className="loader-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default Loader;
