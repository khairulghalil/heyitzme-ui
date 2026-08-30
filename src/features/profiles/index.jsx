import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Footer, useLogin, Loader, Dropdown } from "../../components";
import { applyTheme, saveContact, isAuthenticated } from "../../utils";
import { getProfile } from "../../store/profile/actions";
import {
  selectProfile,
  selectProfileLoading,
} from "../../store/profile/selectors";
import {
  SocialLink,
  SocialMedia,
  ShareModal,
  ProfileNotFound,
} from "./components";

import "./profiles.scss";
function Profiles({ previewData = null, backAction = null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useParams().username;
  const { showLogin } = useLogin();

  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);

  const [showShareModal, setShowShareModal] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (previewData) {
      setProfileData(previewData);
    } else if (profile) {
      setProfileData(profile);
    } else if (username) {
      if (!profile || profile.username !== username) {
        dispatch(getProfile(username));
      }
    }
  }, [username, previewData, profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (profileData) {
      if (profileData.blobUrl) {
        setProfilePictureUrl(profileData.blobUrl);
      } else {
        setProfilePictureUrl(
          `https://images.heyitzme.com/${profileData.profileImage}`,
        );
      }

      setProfileUrl(`https://heyitzme.com/${profileData.username}`);
      applyTheme(profileData.theme);
    }
  }, [profileData]);

  const menuOptions = [
    {
      label: "Edit Card",
      action: () => editProfile(),
    },
    {
      label: "Settings",
      action: () => showSetting(),
    },
  ];

  const editProfile = () => {
    if (!isAuthenticated(profileData.username)) {
      showLogin(profileData.username, () => {
        navigate(`/edit/${profileData.username}`);
      });
      return;
    }

    navigate(`/edit/${profileData.username}`);
  };

  const showSetting = () => {
    if (!isAuthenticated(profileData.username)) {
      showLogin(profileData.username, () => {
        navigate(`/settings/${profileData.username}`);
      });
      return;
    }

    navigate(`/settings/${profileData.username}`);
  };

  return (
    <>
      <Loader show={loading} showLogo opacity={1} />
      {profileData ? (
        <>
          {previewData && (
            <div className="builder-banner text-start pe-0">
              <button
                className="btn btn-primary accent-theme text-decoration-none"
                onClick={backAction}
              >
                <span className="me-2">◂</span>Back to Edit
              </button>
              <span className="text-md-start text-center ms-0 ms-md-4 preview-text">
                This is only a preview of your card
              </span>
            </div>
          )}

          <span
            className={`profile-header text-left ${previewData ? "d-none" : ""}`}
          >
            <Dropdown item={menuOptions} />
          </span>

          <div className="profile-wrapper">
            <div className="profile-card">
              <img
                id="profile-picture"
                className="profile-picture rounded-circle img-fluid"
                alt="Profile"
                src={profilePictureUrl || null}
              />

              <div
                className={`profile-content text-center mt-3 ${previewData ? "pe-none" : ""}`}
              >
                <h2 id="name">{profileData.name}</h2>
                <p id="bio">{profileData.bio}</p>
                <SocialLink contact={profileData.contact} />

                <button
                  className="btn btn-primary profile-theme mt-2 mx-1"
                  onClick={() => saveContact(profileData)}
                >
                  <i className="bi bi-bookmark-fill me-1"></i>
                  Save
                </button>
                <button
                  className="btn btn-secondary profile-theme mt-2 mx-1"
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

            {!previewData && (
              <div className="profile-banner">
                <p>
                  Like this Business Card? Get yours now at
                  <a href="https://heyitzme.com" className="ps-1">
                    HeyItzMe.com
                  </a>
                </p>
              </div>
            )}
            <Footer />

            <Modal
              show={showShareModal}
              onHide={() => setShowShareModal(false)}
              centered
              className="shareModal"
            >
              <ShareModal profileUrl={profileUrl || null} />
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
