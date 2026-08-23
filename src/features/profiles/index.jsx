import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { Footer, useLogin, Loader } from "../../components";
import { applyTheme, saveContact, isAuthenticated } from "../../utils";
import { getProfile } from "../../store/profile/actions";
import {
  selectProfile,
  selectProfileLoading,
} from "../../store/profile/selectors";
import {
  SocialLink,
  SocialMedia,
  AboutModal,
  ShareModal,
  ProfileNotFound,
} from "./components";

import "./profiles.scss";
function Profiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useParams().username;
  const { showLogin } = useLogin();

  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);

  const [showShareModal, setShowShareModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    if (username) {
      dispatch(getProfile(username));
    }
  }, [username]);

  useEffect(() => {
    if (profile) {
      setProfilePictureUrl(
        `https://images.heyitzme.com/profiles/${profile.profileImage}?v=${profile.profileImageVer}`,
      );
      setProfileUrl(`https://heyitzme.com/${profile.username}`);
      applyTheme(profile.theme);
    }
  }, [profile]);

  const editProfile = () => {
    if (!isAuthenticated(profile.username)) {
      showLogin(profile.username, () => {
        navigate(`/edit/${profile.username}`);
      });
      return;
    }

    navigate(`/edit/${profile.username}`);
  };

  const showAbout = () => {
    if (!isAuthenticated(profile.username)) {
      showLogin(profile.username, () => {
        setShowAboutModal(true);
      });
      return;
    }

    setShowAboutModal(true);
  };

  return (
    <>
      <Loader show={loading} showLogo opacity={1} />
      {profile ? (
        <>
          <Dropdown className="profile-header text-left">
            <Dropdown.Toggle
              variant="link"
              id="profile-dropdown"
              className="p-0 border-0 text-end"
              bsPrefix="dropdown-toggle-no-caret"
            >
              <i className="bi bi-three-dots"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item as="button" onClick={() => editProfile()}>
                Edit Profile
              </Dropdown.Item>

              <Dropdown.Item as="button" onClick={() => showAbout()}>
                About
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="profile-wrapper">
            <div className="profile-card">
              <img
                id="profile-picture"
                className="profile-picture rounded-circle img-fluid"
                alt="Profile"
                src={profilePictureUrl || null}
              />

              <div className="profile-content text-center mt-3">
                <h2 id="name">{profile.name}</h2>
                <p id="bio">{profile.bio}</p>
                <SocialLink contact={profile.contact} />

                <button
                  className="btn btn-primary mt-2 mx-1"
                  onClick={() => saveContact(profile)}
                >
                  <i className="bi bi-bookmark-fill me-1"></i>
                  Save
                </button>
                <button
                  className="btn btn-secondary mt-2 mx-1"
                  onClick={() => setShowShareModal(true)}
                >
                  <i className="bi bi-share me-1"></i>
                  Share
                </button>

                <p id="about" className="about">
                  {profile.about}
                </p>

                <SocialMedia links={profile.socialMedia} />
              </div>
            </div>
            <div className="profile-banner">
              <p>
                Like this Business Card? Get yours now at
                <a href="https://heyitzme.com" className="ps-1">
                  HeyItzMe.com
                </a>
              </p>
            </div>
            <Footer />

            <Modal
              show={showShareModal}
              onHide={() => setShowShareModal(false)}
              centered
              className="shareModal"
            >
              <ShareModal profileUrl={profileUrl || null} />
            </Modal>

            <Modal
              show={showAboutModal}
              onHide={() => setShowAboutModal(false)}
              centered
              className="aboutModal"
            >
              <AboutModal profileData={profile} />
            </Modal>
          </div>
        </>
      ) : (
        <ProfileNotFound />
      )}
    </>
  );
}

export default Profiles;
