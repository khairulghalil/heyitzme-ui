import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import { selectProfile } from "../../store/profile/selectors";
import { updateProfile } from "../../store/profile/actions";
import { applyTheme, isAuthenticated } from "../../utils";
import { Footer } from "../../components";
import {
  ContactCard,
  SocialMediaCard,
  ThemeCard,
  ConfirmModal,
} from "./components";
import Profiles from "../profiles";
import "./generate.scss";

function GenerateCard({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useParams().username;
  const editScrollPosition = useRef(0);

  const profile = useSelector(selectProfile);
  // const profile = {
  //   username: "khairul-ghalil",
  //   name: "Muhammad Khairullah",
  //   bio: "Founder of HeyItzMe 1",
  //   profileImage: "khairul-ghalil.png",
  //   profileImageVer: 2,
  //   about:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation caecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   contact: {
  //     email: "khairulmuhdghalil@gmail.com",
  //     phone: "+60105757340",
  //     website: "",
  //     linkedin: "",
  //     whatsapp: "+60105757340",
  //     whatsappText: "HeyItzMe!",
  //   },
  //   socialMedia: {
  //     x: "https://x.com/khairul_ghalil",
  //     tiktok: "https://www.tiktok.com/@khairul.ghalil",
  //     discord: "",
  //     threads: "",
  //     youtube: "",
  //     facebook: "https://www.facebook.com/khairul.ghalil",
  //     instagram: "https://www.instagram.com/khairul.ghalil/",
  //   },
  //   theme: {
  //     primaryColor: "#FFA01A",
  //     secondaryColor: "#FDD7A3",
  //     backgroundColor: "#ffffff",
  //     fontColor: "#9e9e9e",
  //   },
  //   status: {
  //     active: true,
  //     expiryDate: "2027-08-14 05:15:45.484465+00",
  //   },
  // };

  const [updProfile, setUpdProfile] = useState(null);
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

      setUpdProfile({
        ...updProfile,
        [parent]: {
          ...updProfile?.[parent],
          [child]: value,
        },
      });

      return;
    }

    setUpdProfile({
      ...updProfile,
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
    console.log("handleConfirmUpdate called");
    setModalText("Are you sure you want to update your profile?");
    setAction(() => handleUpdate);
    setShowConfirmModal(true);
  };

  const handleUpdate = () => {
    dispatch(updateProfile({ username, data: updProfile }));
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
        setUpdProfile(profile);
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
        <div className="generate-wrapper">
          <div className="generate-card p-4">
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
                value={updProfile?.name || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                name="bio"
                value={updProfile?.bio || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="about">
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                name="about"
                value={updProfile?.about || ""}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>

            <ContactCard
              updProfile={updProfile}
              handleChange={handleChange}
              showContactList={showContactList}
              setShowContactList={setShowContactList}
            />
            <SocialMediaCard
              updProfile={updProfile}
              handleChange={handleChange}
              showSocMedList={showSocMedList}
              setShowSocMedList={setShowSocMedList}
            />
            <ThemeCard
              updProfile={updProfile}
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
          previewData={updProfile}
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

export default GenerateCard;
