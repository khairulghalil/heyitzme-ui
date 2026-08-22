import { Footer } from "../../../components";
import * as logo from "../../../assets/img/logo";

function ProfileNotFound() {
  return (
    <>
      <div className="profile-not-found min-vh-100 d-flex flex-column justify-content-center align-items-center text-center p-4">
        <div className="d-flex flex-column align-items-center">
          <img src={logo.logo} className="img-fluid mb-2" alt="HeyItzMe" />
          <img
            src={logo.pingu}
            className="img-fluid my-5"
            alt="HeyItzMe Penguin"
          />
        </div>
        <p>
          Woops! The user you're looking for doesn't exist, or the profile may
          have been removed.
        </p>
        <span>
          Back to <a href="https://HeyItzMe.com">HeyItzMe.com</a>
        </span>
      </div>
      <Footer />
    </>
  );
}

export default ProfileNotFound;
