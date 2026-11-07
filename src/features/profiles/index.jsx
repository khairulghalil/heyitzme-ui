import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import * as brandLogo from "../../assets/img/logo";
import { Footer, useLogin, Loader, Dropdown } from "../../components";
import { applyTheme, saveContact, isAuthenticated } from "../../utils";
import { getProfile } from "../../store/profile/actions";
import { bannerThumbnail } from "../../constants";
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
  const [bannerBgUrl, setBannerBgUrl] = useState("");
  const [logoImageUrl, setLogoImageUrl] = useState("");
  const [profileData, setProfileData] = useState(null);
  const isDefaultBanner =
    !profileData?.bannerBg ||
    profileData.bannerBg.startsWith("banners/default/");
  const bannerPreset =
    bannerThumbnail.find((banner) => banner.path === profileData?.bannerBg) ||
    bannerThumbnail.find((banner) => banner.name === "Circuit");

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
    if (!showShareModal) return undefined;

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
  }, [showShareModal]);

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

      setBannerBgUrl(
        profileData.bannerBlobUrl ||
          `https://images.heyitzme.com/${profileData.bannerBg}`,
      );

      setLogoImageUrl(
        profileData.logoBlobUrl ||
          `https://images.heyitzme.com/${profileData.logoImage}`,
      );

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

          <div className="profile-wrapper">
            <div className="profile-card">
              <div className="header-banner">
                {!isDefaultBanner ? (
                  <img
                    className="banner-background-image"
                    src={bannerBgUrl || undefined}
                    alt=""
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    className="banner-pattern"
                    style={{
                      "--banner-mask": `url(${bannerPreset?.src || ""})`,
                    }}
                    aria-hidden="true"
                  />
                )}
                <div className="profile-picture-wrapper">
                  <img
                    id="profile-picture"
                    className="profile-picture rounded-circle img-fluid"
                    alt="Profile"
                    src={profilePictureUrl || null}
                  />
                  <span
                    className={`verified-badge ${profileData.theme.verifiedEnable ? "" : "d-none"}`}
                    role="img"
                    aria-label="Verified profile"
                    title="Verified profile"
                  >
                    <i
                      className="bi bi-patch-check-fill badge-shape"
                      aria-hidden="true"
                    />
                    <i
                      className="bi bi-circle-fill badge-hide"
                      aria-hidden="true"
                    />
                    <i
                      className="bi bi-check-lg badge-check"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>

              <div
                className={`profile-content text-center mt-3 ${previewData ? "pe-none" : ""}`}
              >
                <div className="options-wrapper">
                  <div
                    className={`logo-wrapper ${profileData.theme.logoEnable ? "" : "d-none"}`}
                  >
                    <img
                      src={logoImageUrl || null}
                      className="logo img-fluid"
                      alt="HeyItzMe"
                    />
                  </div>
                  <Dropdown item={menuOptions} vertical />
                </div>
                <h2 id="name" className="profile-name">
                  <span>{profileData.name}</span>
                  {profileData.username === "khairul-ghalil" && (
                    <img
                      className="username-mark"
                      src={brandLogo.icon}
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                </h2>
                <p id="bio" className="bio mb-0">
                  {profileData.bio}
                </p>
                {profileData.description?.enable &&
                  profileData.description.item && (
                    <p className="description mt-1">
                      {profileData.description.item}
                    </p>
                  )}
                <SocialLink contact={profileData.contact} />

                <div className="d-flex justify-content-start btn-wrapper">
                  <button
                    className="btn btn-primary save profile-theme mt-2 ms-0 me-1"
                    onClick={() => saveContact(profileData)}
                  >
                    <i className="bi bi-bookmark-fill me-1"></i>
                    Save Contact
                  </button>
                  <button
                    className="btn btn-secondary share profile-theme mt-2 ms-1 me-0 "
                    onClick={() => setShowShareModal(true)}
                  >
                    <i className="bi bi-share me-1"></i>
                    Share
                  </button>
                </div>

                <p id="about" className="section">
                  <span className="section-title">ABOUT</span>
                  {profileData.about}
                </p>

                {(Array.isArray(profileData.additionalSection?.item)
                  ? profileData.additionalSection.item
                  : profileData.additionalSection?.item &&
                      typeof profileData.additionalSection.item === "object"
                    ? [profileData.additionalSection.item]
                    : []
                )
                  .filter((item) => item.enable)
                  .map((item, index) => (
                    <p
                      key={index}
                      className="section additional-section-content"
                    >
                      <span className="section-title">{item.title}</span>
                      {(item.content || "")
                        .split(/\r?\n/)
                        .map((line, lineIndex) => {
                          const bulletLine = line.match(/^\s*-\s+(.*)$/);

                          return (
                            <span
                              className="additional-section-line"
                              key={lineIndex}
                            >
                              {bulletLine ? (
                                <>
                                  <i
                                    className="bi bi-circle-fill additional-section-bullet"
                                    aria-hidden="true"
                                  />
                                  {bulletLine[1]}
                                </>
                              ) : (
                                line
                              )}
                            </span>
                          );
                        })}
                    </p>
                  ))}

                <SocialMedia links={profileData.socialMedia} />
              </div>
            </div>
          </div>

          {!previewData && (
            <div className="profile-banner">
              <p>
                Like this Business Card? Get yours now at
                <a href="#" className="ps-1">
                  HeyItzMe.com
                </a>
              </p>
            </div>
          )}
          <Footer />

          <Offcanvas
            show={showShareModal}
            onHide={() => setShowShareModal(false)}
            placement="end"
            className="share-offcanvas w-100"
          >
            <Offcanvas.Header closeButton closeVariant="white" />
            <ShareModal
              profileUrl={profileUrl || null}
              profilePictureUrl={profilePictureUrl}
              proxyProfileImageUrl={profileData.proxyProfileImageUrl}
              profileName={profileData.name}
            />
          </Offcanvas>
        </>
      ) : (
        <ProfileNotFound />
      )}
    </>
  );
}

export default Profiles;
