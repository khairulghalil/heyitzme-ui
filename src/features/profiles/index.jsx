import { useParams } from "react-router-dom";
import { useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { Footer, useLogin } from "../../components";
import { applyTheme } from "../../utils/theme";
import SocialLink from "./components/SocialLink";
import SocialMedia from "./components/SocialMedia";
import AboutModal from "./components/AboutModal";
import ShareModal from "./components/ShareModal";
import "./profiles.scss";

function Profiles() {
  const profileData = {
    id: 1,
    username: "khairul-ghalil",
    name: "Muhammad Khairullah",
    bio: "Founder of HeyItzMe",
    profileImage: "khairul-ghalil.png",
    profileImageVer: 1,
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation caecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contact: {
      email: "khairulmuhdghalil@gmail.com",
      phone: "+60105757340",
      website: "",
      linkedin: "",
      whatsapp: "+60105757340",
      whatsappText: "HeyItzMe!",
    },
    socialMedia: {
      x: "https://x.com/khairul_ghalil",
      tiktok: "https://www.tiktok.com/@khairul.ghalil",
      discord: "",
      threads: "",
      youtube: "",
      facebook: "https://www.facebook.com/khairul.ghalil",
      instagram: "https://www.instagram.com/khairul.ghalil/",
    },
    theme: {
      primaryColor: "#FFA01A",
      secondaryColor: "#FDD7A3",
      backgroundColor: "#ffffff",
      fontColor: "#9e9e9e",
    },
    status: {
      active: true,
      expiryDate: "2027-08-14 05:15:45.484465+00",
    },
    createdAt: "2026-08-14T05:15:45.484465+00:00",
    passwordHash:
      "$2b$12$nfJblNrKU9qfGLLMu7ieW.W5gCmJtb6pXBYSAt.0iWqXPWmYdQ1Hq",
  };

  const { showLogin } = useLogin();

  const [showShareModal, setShowShareModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const profilePictureUrl = `https://images.heyitzme.com/profiles/${profileData.profileImage}?v=${profileData.profileImageVer}`;
  const profileUrl = `https://heyitzme.com/${profileData.username}`;
  const editProfile = () => {
    showLogin(profileData.username);
  };
  applyTheme(profileData.theme);

  return (
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

          <Dropdown.Item as="button" onClick={() => setShowAboutModal(true)}>
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
            src={profilePictureUrl}
          />

          <div className="profile-content text-center mt-3">
            <h2 id="name">{profileData.name}</h2>
            <p id="bio">{profileData.bio}</p>
            <SocialLink contact={profileData.contact} />

            <button
              className="btn btn-primary mt-2 mx-1"
              onClick={() => saveContact()}
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
              {profileData.about}
            </p>

            <SocialMedia links={profileData.socialMedia} />
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
      </div>

      <Modal
        show={showShareModal}
        onHide={() => setShowShareModal(false)}
        centered
        className="shareModal"
      >
        <ShareModal profileUrl={profileUrl} />
      </Modal>

      <Modal
        show={showAboutModal}
        onHide={() => setShowAboutModal(false)}
        centered
        className="aboutModal"
      >
        <AboutModal profileData={profileData} />
      </Modal>
    </>
  );
}

export default Profiles;
