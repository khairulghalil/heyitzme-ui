import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import { selectProfile } from "../../store/profile/selectors";
import { updateProfile } from "../../store/profile/actions";
import { applyTheme, isAuthenticated } from "../../utils";
import { Footer, ConfirmModal } from "../../components";
import { ContactCard, SocialMediaCard, ThemeCard } from "./components";
import Profiles from "../profiles";
import "./ProfileBuilder.scss";

function ProfileBuilder({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useParams().username;
  const editScrollPosition = useRef(0);

  const profile = useSelector(selectProfile);

  const [builderProfile, setBuilderProfile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
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
    dispatch(updateProfile({ username, data: builderProfile }));
    setShowConfirmModal(false);
    navigate(`/${username}`);
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
        setBuilderProfile(profile);
        setProfilePictureUrl(
          `https://images.heyitzme.com/profiles/${profile.profileImage}?v=${profile.profileImageVer}`,
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
      {!showCard && (
        <div className="builder-wrapper">
          <div className="builder-card p-4">
            <div className="text-center">
              <img
                id="profile-picture"
                className="profile-picture rounded-circle img-fluid"
                alt="Profile"
                src={profilePictureUrl || null}
              />
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

            <div className="text-center">
              <button
                className="btn btn-secondary my-4 me-2"
                onClick={handleConfirmCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary my-4"
                onClick={() => {
                  editScrollPosition.current = window.scrollY;
                  setShowCard(true);
                }}
              >
                Show Card <span className="ms-2">▸</span>
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )}

      {showCard && (
        <Profiles
          previewData={builderProfile}
          type={type}
          updateAction={handleConfirmUpdate}
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
    </>
  );
}

export default ProfileBuilder;
