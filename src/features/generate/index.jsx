import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { selectProfile } from "../../store/profile/selectors";
import { updateProfile } from "../../store/profile/actions";
import { isAuthenticated } from "../../utils";
import { Footer } from "../../components";
import { ContactCard, SocialMediaCard, ThemeCard } from "./components";
import "./generate.scss";

function generateCard({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useParams().username;

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

  const handleUpdate = () => {
    console.log("Updating profile:", updProfile);
    dispatch(updateProfile({ username, data: updProfile }));
  };

  useEffect(() => {
    if (type === "edit") {
      if (!isAuthenticated(username) || !profile) {
        navigate(`/${username}`);
      }

      setUpdProfile(profile);
      setProfilePictureUrl(
        `https://images.heyitzme.com/profiles/${profile.profileImage}?v=${profile.profileImageVer}`,
      );
    }
  }, []);

  return (
    <>
      <div className="generate-card p-4">
        <div className="text-center">
          <img
            id="profile-picture"
            className="profile-picture rounded-circle img-fluid my-4"
            alt="Profile"
            src={profilePictureUrl || null}
          />
        </div>

        <Form.Group className="mb-3" controlId="name">
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

        <ContactCard updProfile={updProfile} handleChange={handleChange} />
        <SocialMediaCard updProfile={updProfile} handleChange={handleChange} />
        <ThemeCard updProfile={updProfile} handleChange={handleChange} />

        <div className="text-center">
          <button className="btn btn-secondary my-4 me-2">Cancel</button>
          <button
            className="btn btn-primary my-4"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default generateCard;
