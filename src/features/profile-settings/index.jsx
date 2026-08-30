import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfile } from "../../store/profile/actions";
import { Form, Modal } from "react-bootstrap";
import moment from "moment";
import {
  selectProfile,
  selectUpdProfileLoading,
} from "../../store/profile/selectors";
import {
  Footer,
  Dropdown,
  BackButton,
  useToast,
  Loader,
} from "../../components";
import { isAuthenticated, copyToClipboard } from "../../utils";

import "./profile-settings.scss";
function ProfileSettings() {
  const username = useParams().username;
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const updLoading = useSelector(selectUpdProfileLoading);

  const [editRegisteredEmail, setEditRegisteredEmail] = useState(false);
  const [newRegisteredEmail, setNewRegisteredEmail] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const emailOptions = [
    {
      label: "Change email",
      action: () => setEditRegisteredEmail(true),
    },
  ];

  const validOptions = [
    {
      label: "Renew Subscription",
      action: () => setEditValidUntil(true),
    },
  ];

  const passwordOptions = [
    {
      label: "Change Password",
      action: () => setEditPassword(true),
    },
  ];

  const handleCopyLink = async () => {
    const profileUrl = `https://heyitzme.com/${profile.username}`;
    const copied = await copyToClipboard(profileUrl);

    if (copied) {
      showToast("Link copied", "success");
    }
  };

  const handleChangeRegisteredEmail = () => {
    if (!newRegisteredEmail) {
      showToast("Please enter a new email", "error");
      return;
    }

    dispatch(
      updateProfile({
        username: profile.username,
        data: { registeredEmail: newRegisteredEmail },
      }),
    )
      .unwrap()
      .then(() => {
        showToast("Registered email updated", "success");
        handleCloseRegisteredEmail();
      })
      .catch(() => {
        showToast("Failed to update profile", "error");
      });
  };

  const handleCloseRegisteredEmail = () => {
    setEditRegisteredEmail(false);
    setNewRegisteredEmail(profile.registeredEmail);
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showToast("Please fill in all password fields", "error");
      return;
    } else if (newPassword !== confirmNewPassword) {
      showToast("New password and confirm password do not match", "error");
      return;
    }

    dispatch(
      updateProfile({
        username: profile.username,
        data: { currentPassword, newPassword },
      }),
    )
      .unwrap()
      .then(() => {
        showToast("Password updated", "success");
        handleClosePassword();
      })
      .catch(() => {
        showToast("Failed to update profile", "error");
      });
  };

  const handleClosePassword = () => {
    setEditPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  useEffect(() => {
    if (!isAuthenticated(username) || !profile) {
      navigate(`/${username}`);
    } else {
      setNewRegisteredEmail(profile.registeredEmail);
    }
  }, []);

  return (
    <>
      {profile && (
        <>
          <Loader show={updLoading} showLogo />
          <div className="containers text-center">
            <svg
              className="background"
              viewBox="100 0 780 410"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin slice"
            >
              <path
                d="M420.739 171.709C152.117 176.988 69.3602 62.4165 0 0H880V336C880 275.833 689.361 166.43 420.739 171.709Z"
                fill={profile.theme.primaryColor || "var(--primary-app-color)"}
              />
            </svg>
            <div className="setting-wrapper mb-5">
              <div className="setting-card p-2 mx-3 mt-5 text-start">
                <div className="setting-header my-4 mb-5 text-start">
                  <BackButton action={() => navigate(`/${profile.username}`)} />
                  <h2 className="mb-0 me-2 text-end">PROFILE SETTINGS</h2>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-2">
                  <div className="setting-list w-100 py-4">
                    <p>
                      <i className="bi bi-person me-2"></i>
                      Username
                    </p>
                    <span>{profile.username}</span>
                  </div>

                  <div className="setting-list w-100 py-4">
                    <p>
                      <i className="bi bi-info-circle me-2"></i>
                      Account Status
                    </p>
                    <span className="text-uppercase">{profile.status}</span>
                  </div>
                </div>

                <div className="setting-list">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <p className="mb-0">
                      <i className="bi bi-link-45deg me-2"></i>
                      Profile URL
                    </p>

                    <button
                      type="button"
                      className="btn p-0 copy-btn text-end"
                      onClick={handleCopyLink}
                    >
                      <i className="bi bi-copy"></i>
                    </button>
                  </div>

                  <span>{`https://heyitzme.com/${profile.username}`}</span>
                </div>

                <hr className="my-4" />
                <div className="setting-list">
                  <div className="d-flex align-items-center justify-content-between">
                    <p>
                      <i className="bi bi-envelope me-2"></i>
                      Registered Email
                    </p>
                    <Dropdown item={emailOptions} vertical />
                  </div>

                  {editRegisteredEmail ? (
                    <div className="d-flex flex-column align-items-end gap-2">
                      <input
                        type="email"
                        className="form-control w-100 mt-1"
                        value={newRegisteredEmail}
                        onChange={(e) => setNewRegisteredEmail(e.target.value)}
                      />

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-secondary w-100"
                          onClick={handleCloseRegisteredEmail}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary w-100"
                          onClick={handleChangeRegisteredEmail}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span>{profile.registeredEmail}</span>
                  )}
                </div>

                <div className="setting-list">
                  <div className="d-flex align-items-center justify-content-between">
                    <p>
                      <i className="bi bi-lock me-2"></i>
                      Password
                    </p>
                    <Dropdown item={passwordOptions} vertical />
                  </div>

                  {editPassword ? (
                    <div className="mt-2 d-flex flex-column gap-2">
                      <Form.Group className="mb-2" controlId="currentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-2"
                        controlId="confirmNewPassword"
                      >
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmNewPassword"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        />
                      </Form.Group>

                      <div className="d-flex gap-2 align-self-end">
                        <button
                          className="btn btn-secondary"
                          onClick={handleClosePassword}
                        >
                          Cancel
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={handleChangePassword}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span>*******************</span>
                  )}
                </div>

                <hr className="my-4" />
                <div className="setting-list">
                  <p>
                    <i className="bi bi-calendar-plus me-2"></i>
                    Date Joined
                  </p>
                  <span>{moment(profile.createdAt).format("DD MMM YYYY")}</span>
                </div>

                <div className="setting-list">
                  <div className="d-flex align-items-center justify-content-between">
                    <p>
                      <i className="bi bi-calendar-check me-2"></i>
                      Valid Until
                    </p>

                    <Dropdown item={validOptions} vertical />
                  </div>

                  <span>{moment(profile.expiresAt).format("DD MMM YYYY")}</span>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary mb-4"
              onClick={() => navigate(`/${profile.username}`)}
            >
              <span className="me-2">◂</span>Back to Profile
            </button>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProfileSettings;
