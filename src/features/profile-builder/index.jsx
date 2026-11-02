import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import {
  selectProfile,
  selectUpdProfileLoading,
} from "../../store/profile/selectors";
import { updateProfile } from "../../store/profile/actions";
import { applyTheme, isAuthenticated, getCroppedImageFile } from "../../utils";
import {
  Footer,
  ConfirmModal,
  Loader,
  useToast,
  BackButton,
} from "../../components";
import {
  ContactCard,
  SocialMediaCard,
  AdditionalSectionCard,
  ThemeCard,
  PhotoCropModal,
} from "./components";
import Profiles from "../profiles";
import { bannerThumbnail } from "../../constants";
import "./profile-builder.scss";

function ProfileBuilder({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const username = useParams().username;
  const editScrollPosition = useRef(0);
  const photoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const bannerPreviewRef = useRef(null);

  const profile = useSelector(selectProfile);
  const updLoading = useSelector(selectUpdProfileLoading);

  const [builderProfile, setBuilderProfile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [bannerBgUrl, setBannerBgUrl] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerCropAspect, setBannerCropAspect] = useState(16 / 5);
  const [cropTarget, setCropTarget] = useState("photo");
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [action, setAction] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [showSocMedList, setShowSocMedList] = useState(false);
  const [showAdditionalSectionList, setShowAdditionalSectionList] =
    useState(false);
  const [showThemeList, setShowThemeList] = useState(false);
  const isDefaultBanner =
    !builderProfile?.bannerBg ||
    builderProfile.bannerBg.startsWith("banners/default/");
  const isCustomBanner =
    !!bannerFile || (!!builderProfile?.bannerBg && !isDefaultBanner);
  const bannerPreset =
    bannerThumbnail.find(
      (banner) => banner.path === builderProfile?.bannerBg,
    ) || bannerThumbnail.find((banner) => banner.name === "Circuit");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;
    const keys = name.split(".");

    setBuilderProfile((prev) => {
      const updated = { ...prev };
      let current = updated;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = newValue;
        } else {
          const nextKey = keys[index + 1];
          const currentValue = current[key];
          current[key] = Array.isArray(currentValue)
            ? [...currentValue]
            : {
                ...(currentValue ||
                  (Number.isInteger(Number(nextKey)) ? [] : {})),
              };

          current = current[key];
        }
      });

      return updated;
    });
  };

  const handlePhotoChange = (e, target = "photo") => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setCropTarget(target);
    setCropImageSrc(URL.createObjectURL(file));
    setShowCropModal(true);
    e.target.value = "";
  };

  const handleBannerSelect = ({ path, src }) => {
    setBannerFile(null);
    setBannerBgUrl(src);
    setBuilderProfile((prev) => ({
      ...prev,
      bannerBg: path,
      bannerBgCustom: false,
      bannerBlobUrl: null,
    }));
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setCropImageSrc(null);
  };

  const handleCropSave = async (croppedAreaPixels) => {
    if (cropTarget === "banner") {
      const bannerVer = builderProfile?.bannerBgVer + 1 || 1;
      const filename = `${username}-banner-${bannerVer}.png`;
      const file = await getCroppedImageFile(
        cropImageSrc,
        croppedAreaPixels,
        filename,
        1200,
      );
      const blobUrl = URL.createObjectURL(file);

      setBannerFile(file);
      setBannerBgUrl(blobUrl);
      setShowCropModal(false);
      setBuilderProfile({
        ...builderProfile,
        bannerBg: filename,
        bannerBgVer: bannerVer,
        bannerBgCustom: true,
        bannerBlobUrl: blobUrl,
      });
      setCropImageSrc(null);
      return;
    }

    if (cropTarget === "logo") {
      const logoVer = builderProfile?.logoImageVer + 1 || 1;
      const filename = `${username}-logo-${logoVer}.png`;
      const file = await getCroppedImageFile(
        cropImageSrc,
        croppedAreaPixels,
        filename,
        600,
      );
      const blobUrl = URL.createObjectURL(file);

      setLogoFile(file);
      setShowCropModal(false);
      setBuilderProfile({
        ...builderProfile,
        logoImage: filename,
        logoImageVer: logoVer,
        logoBlobUrl: blobUrl,
        theme: {
          ...builderProfile.theme,
          logoEnable: true,
        },
      });
      setCropImageSrc(null);
      return;
    }

    const imgVer = builderProfile?.profileImageVer + 1 || 1;
    const filename = `${username}-${imgVer}.png`;
    const file = await getCroppedImageFile(
      cropImageSrc,
      croppedAreaPixels,
      filename,
    );

    setProfilePictureFile(file);
    setProfilePictureUrl(URL.createObjectURL(file));
    setShowCropModal(false);
    setBuilderProfile({
      ...builderProfile,
      blobUrl: URL.createObjectURL(file),
      profileImage: filename,
      profileImageVer: imgVer,
    });
    setCropImageSrc(null);
  };

  const handleConfirmCancel = () => {
    setModalText(
      "Are you sure you want to cancel the changes? Any unsaved changes will be discarded.",
    );
    setAction(() => handleCancel);
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = () => {
    setModalText("Are you sure you want to update your profile?");
    setAction(() => handleUpdate);
    setShowConfirmModal(true);
  };

  const handleUpdate = () => {
    setShowConfirmModal(false);

    dispatch(
      updateProfile({
        username,
        data: builderProfile,
        imageFile: profilePictureFile,
        bannerFile,
        logoFile,
      }),
    )
      .unwrap()
      .then(() => {
        showToast("Profile updated", "success");
        navigate(`/${username}`);
      })
      .catch(() => {
        showToast("Failed to update profile", "error");
      });
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    navigate(`/${username}`);
  };

  useEffect(() => {
    if (type === "edit") {
      const builder = true;

      if (!isAuthenticated(username) || !profile) {
        navigate(`/${username}`);
      }

      if (profile) {
        console.log(profile);
        setBuilderProfile({
          ...profile,
          blobUrl: null,
          bannerBlobUrl: null,
          logoBlobUrl: null,
        });
        setProfilePictureUrl(
          `https://images.heyitzme.com/${profile.profileImage}`,
        );
        applyTheme(profile.theme, builder);
        setBannerBgUrl(`https://images.heyitzme.com/${profile.bannerBg}`);
      }
    }
  }, []);

  useEffect(() => {
    const banner = bannerPreviewRef.current;
    if (!banner || typeof ResizeObserver === "undefined") return;

    const updateAspect = () => {
      const { width, height } = banner.getBoundingClientRect();
      if (width > 0 && height > 0) setBannerCropAspect(width / height);
    };

    updateAspect();
    const observer = new ResizeObserver(updateAspect);
    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showCard) {
      window.scrollTo(0, 0);
    } else {
      requestAnimationFrame(() => {
        window.scrollTo(0, editScrollPosition.current);
      });
    }
  }, [showCard]);

  return (
    <>
      <Loader show={updLoading} showLogo />
      {!showCard && (
        <>
          <span className={`builder-header text-start`}>
            <BackButton action={() => navigate(`/${username}`)} />
          </span>
          <div className="builder-wrapper">
            <div className="builder-card">
              <div
                className={`header-banner ${builderProfile?.bannerBgCustom ? "custom-banner" : "preset-banner"}`}
                ref={bannerPreviewRef}
              >
                {isCustomBanner ? (
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
                  <button
                    type="button"
                    className="upload-photo-btn"
                    onClick={() => photoInputRef.current?.click()}
                  >
                    <i className="bi bi-camera-fill"></i>
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={photoInputRef}
                    className="d-none"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>

              <div className="form-wrapper">
                <Form.Group className="mb-3 mt-1" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={builderProfile?.name || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    type="text"
                    name="bio"
                    value={builderProfile?.bio || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Form.Label className="mb-0">Description</Form.Label>
                    <Form.Check
                      type="switch"
                      id="description-toggle"
                      name="description.enable"
                      checked={builderProfile?.description?.enable ?? false}
                      onChange={handleChange}
                      aria-label="Enable description"
                      className="text-end"
                    />
                  </div>
                  <Form.Control
                    as="textarea"
                    name="description.item"
                    value={builderProfile?.description?.item || ""}
                    onChange={handleChange}
                    rows={2}
                    className={
                      builderProfile?.description?.enable ? "" : "d-none"
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="about">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="about"
                    value={builderProfile?.about || ""}
                    onChange={handleChange}
                    rows={3}
                  />
                </Form.Group>

                <AdditionalSectionCard
                  builderProfile={builderProfile}
                  handleChange={handleChange}
                  showAdditionalSectionList={showAdditionalSectionList}
                  setShowAdditionalSectionList={setShowAdditionalSectionList}
                />
                <ContactCard
                  builderProfile={builderProfile}
                  handleChange={handleChange}
                  showContactList={showContactList}
                  setShowContactList={setShowContactList}
                />
                <SocialMediaCard
                  builderProfile={builderProfile}
                  handleChange={handleChange}
                  showSocMedList={showSocMedList}
                  setShowSocMedList={setShowSocMedList}
                />
                <ThemeCard
                  builderProfile={builderProfile}
                  handleChange={handleChange}
                  bannerThumbnail={bannerThumbnail}
                  handleBannerSelect={handleBannerSelect}
                  bannerInputRef={bannerInputRef}
                  handleBannerFileChange={(e) => handlePhotoChange(e, "banner")}
                  logoInputRef={logoInputRef}
                  handleLogoFileChange={(e) => handlePhotoChange(e, "logo")}
                  showThemeList={showThemeList}
                  setShowThemeList={setShowThemeList}
                />

                <button
                  className="btn btn-primary accent-theme my-4 py-2 w-100"
                  onClick={() => {
                    editScrollPosition.current = window.scrollY;
                    setShowCard(true);
                  }}
                >
                  Preview Card <span className="ms-2">▸</span>
                </button>

                <div className="confirm-section text-center">
                  <button
                    className="btn btn-secondary mt-4 me-2 w-100"
                    onClick={handleConfirmCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary mt-4 w-100"
                    onClick={handleConfirmUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}

      {showCard && (
        <Profiles
          previewData={builderProfile}
          backAction={() => setShowCard(false)}
        />
      )}

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
        className="confirmModal"
      >
        <ConfirmModal text={modalText} action={action} />
      </Modal>

      <Modal
        show={showCropModal}
        onHide={handleCropCancel}
        centered
        className="photoCropModal"
      >
        <PhotoCropModal
          imageSrc={cropImageSrc}
          onCancel={handleCropCancel}
          onSave={handleCropSave}
          aspect={
            cropTarget === "banner"
              ? bannerCropAspect
              : cropTarget === "logo"
                ? 3
                : 1
          }
          cropShape={cropTarget === "photo" ? "round" : "rect"}
        />
      </Modal>
    </>
  );
}

export default ProfileBuilder;
