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
import { Footer, ConfirmModal, Loader, useToast } from "../../components";
import {
  ContactCard,
  SocialMediaCard,
  ThemeCard,
  PhotoCropModal,
} from "./components";
import Profiles from "../profiles";
import "./profile-builder.scss";

function ProfileBuilder({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const username = useParams().username;
  const editScrollPosition = useRef(0);
  const photoInputRef = useRef(null);

  const profile = useSelector(selectProfile);
  const updLoading = useSelector(selectUpdProfileLoading);

  const [builderProfile, setBuilderProfile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [action, setAction] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [showSocMedList, setShowSocMedList] = useState(false);
  const [showThemeList, setShowThemeList] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setBuilderProfile({
        ...builderProfile,
        [parent]: {
          ...builderProfile?.[parent],
          [child]: value,
        },
      });

      return;
    }

    setBuilderProfile({
      ...builderProfile,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setCropImageSrc(URL.createObjectURL(file));
    setShowCropModal(true);
    e.target.value = "";
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setCropImageSrc(null);
  };

  const handleCropSave = async (croppedAreaPixels) => {
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
        setBuilderProfile({ ...profile, blobUrl: null });
        setProfilePictureUrl(
          `https://images.heyitzme.com/${profile.profileImage}`,
        );
        applyTheme(profile.theme, builder);
      }
    }
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
        <div className="builder-wrapper">
          <div className="builder-card p-4">
            <div className="text-center">
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

            <Form.Group className="mb-3 mt-5" controlId="name">
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
              showThemeList={showThemeList}
              setShowThemeList={setShowThemeList}
            />

            <button
              className="btn btn-primary accent-theme my-4 w-100"
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
          <Footer />
        </div>
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
        />
      </Modal>
    </>
  );
}

export default ProfileBuilder;
