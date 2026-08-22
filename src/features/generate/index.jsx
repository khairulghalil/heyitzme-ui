import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProfile } from "../../store/profile/selectors";
import { updateProfile } from "../../store/profile/actions";
import { removeToken, isAuthenticated } from "../../utils";

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

  const handleUpdate = () => {
    console.log("Update profile:", updProfile);
    dispatch(updateProfile({ username, data: updProfile }));
  };

  useEffect(() => {
    if (type === "edit") {
      if (!isAuthenticated(username) || !profile) {
        navigate(`/${username}`);
      }

      setUpdProfile(profile);
    }
  }, []);

  return (
    <div className="generate-card d-flex flex-column justify-content-center align-items-center text-center p-4">
      <h4>Generate Card for {username}</h4>

      <input
        type="text"
        value={updProfile?.name || ""}
        onChange={(e) => setUpdProfile({ ...updProfile, name: e.target.value })}
      />
      <input
        type="text"
        value={updProfile?.bio || ""}
        onChange={(e) => setUpdProfile({ ...updProfile, bio: e.target.value })}
      />
      <input
        type="text"
        value={updProfile?.about || ""}
        onChange={(e) =>
          setUpdProfile({ ...updProfile, about: e.target.value })
        }
      />

      <button className="btn btn-primary m-4" onClick={() => handleUpdate()}>
        Update
      </button>
      <button
        disabled
        className="btn btn-danger m-4 "
        onClick={() => removeToken()}
      >
        Logout
      </button>
    </div>
  );
}

export default generateCard;
