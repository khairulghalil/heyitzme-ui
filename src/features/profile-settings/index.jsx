import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import moment from "moment";
import { updateProfile } from "../../store/profile/actions";
import { printCardTemplate } from "../../components/cardTemplate";
import { printDisplayTemplate } from "../../components/displayTemplate";
import {
  selectProfile,
  selectUpdProfileLoading,
} from "../../store/profile/selectors";
import {
  CardTemplate,
  DisplayTemplate,
  Footer,
  BackButton,
  useToast,
  Loader,
} from "../../components";
import { NFCModal } from "./components";
import { isAuthenticated, copyToClipboard, removeToken } from "../../utils";

import "./profile-settings.scss";
function ProfileSettings() {
  const username = useParams().username;
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const updLoading = useSelector(selectUpdProfileLoading);

  const [printLoading, setPrintLoading] = useState(false);
  const [editRegisteredEmail, setEditRegisteredEmail] = useState(false);
  const [newRegisteredEmail, setNewRegisteredEmail] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleCopyLink = async () => {
    const profileUrl = `https://heyitzme.com/${profile.username}`;
    const copied = await copyToClipboard(profileUrl);

    if (copied) {
      showToast("Link copied", "success");
    }
  };

  const handleSignOut = () => {
    removeToken();
    navigate(`/${username}`);
    showToast("Signed out successfully", "success");
  };

  const handlePrint = async (printTemplate) => {
    setPrintLoading(true);
    try {
      await printTemplate();
    } catch (error) {
      console.error("Could not generate PDF:", error);
      showToast("Could not generate PDF. Please try again.", "error");
    } finally {
      setPrintLoading(false);
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
        setNewRegisteredEmail(newRegisteredEmail);
        handleCloseRegisteredEmail(true);
      })
      .catch(() => {
        showToast("Failed to update profile", "error");
      });
  };

  const handleCloseRegisteredEmail = (updated) => {
    console.log("Closing registered email edit, updated:", updated);
    setEditRegisteredEmail(false);
    if (!updated) {
      setNewRegisteredEmail(profile.registeredEmail);
    }
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
          <DisplayTemplate profile={profile} />
          <Loader show={updLoading || printLoading} showLogo />

          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: "-10000px",
              width: "210mm",
              pointerEvents: "none",
            }}
          >
            <DisplayTemplate profile={profile} />
            <CardTemplate username={profile.username} />
          </div>
          <div className="containers text-center">
            <div className="setting-header">
              <BackButton action={() => navigate(`/${profile.username}`)} />
              <div className="title text-start">
                <span>Account</span>
                <h2>Profile Settings</h2>
              </div>
              <div className="setting-list w-100 px-4 py-3 my-4 text-start">
                <div className="row">
                  <div className="col">
                    <p>
                      <i className="bi bi-person me-2"></i>
                      Username
                    </p>
                    <span>{profile.username}</span>
                  </div>
                  <div className="col text-end align-items-center d-flex justify-content-end">
                    <span
                      className={`badge rounded-pill ${profile.status === "active" ? "bg-success" : "bg-danger"}`}
                    >
                      {profile.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-content">
              <div className="setting-card profile d-flex mb-5 mt-3">
                <div className="col-10 text-start">
                  <p className="mb-0 fw-bold">Your Public Profile URL</p>
                  <span>{`https://heyitzme.com/${profile.username}`}</span>
                </div>
                <div className="col text-end align-items-center d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn p-0 copy-btn text-end"
                    onClick={handleCopyLink}
                  >
                    <i className="bi bi-copy"></i>
                  </button>
                </div>
              </div>
              <div className="d-flex content-header">
                <p>Account and Security </p>
              </div>
              <div className="setting-card d-flex flex-wrap mb-5">
                <div className="icon col-2">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="input text-start col-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Registered Email</p>
                    <span
                      className={`action ${editRegisteredEmail ? "d-none" : ""}`}
                      onClick={() => setEditRegisteredEmail(true)}
                    >
                      Edit
                    </span>
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
                          onClick={() => handleCloseRegisteredEmail(false)}
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

                <div className="w-100">
                  <hr />
                </div>

                <div className="icon col-2">
                  <i className="bi bi-lock"></i>
                </div>
                <div className="input text-start col-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Password</p>
                    <span
                      className={`action ${editPassword ? "d-none" : ""}`}
                      onClick={() => setEditPassword(true)}
                    >
                      Change
                    </span>
                  </div>
                  {editPassword ? (
                    <div className="form-input mt-2 d-flex flex-column gap-2">
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
              </div>
              <div className="d-flex content-header membership">
                <p>Membership</p>
                <span className={`badge ms-auto rounded-pill bg-warning`}>
                  Premium
                </span>
              </div>
              <div className="setting-card d-flex flex-wrap mb-5">
                <div className="icon col-2">
                  <i className="bi bi-calendar-plus"></i>
                </div>
                <div className="input text-start col-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Date Joined</p>
                  </div>
                  <span>{moment(profile.createdAt).format("DD MMM YYYY")}</span>
                </div>

                <div className="w-100">
                  <hr />
                </div>

                <div className="icon col-2">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div className="input text-start col-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Valid Until</p>
                    <span className={`action`} onClick={() => null}>
                      Renew Subscription
                    </span>
                  </div>
                  <span>{moment(profile.expiresAt).format("DD MMM YYYY")}</span>
                </div>
              </div>

              <div className="d-flex content-header membership">
                <p>Print Your Profile</p>
              </div>
              <div className="setting-card print-profile d-flex flex-wrap">
                <div className="input text-start col-9">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>A6 Size Display</p>
                  </div>
                  <span>Showcase your profile at your counter</span>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  <button
                    className="btn btn-primary p-0"
                    onClick={() => handlePrint(printDisplayTemplate)}
                  >
                    Save
                  </button>
                </div>

                <div className="w-100">
                  <hr />
                </div>

                <div className="input text-start col-9">
                  <div className="d-flex justify-content-start align-items-start">
                    <p>NFC Card</p>
                    <button
                      type="button"
                      className="info-button"
                      aria-label="How to create NFC card"
                    >
                      <i
                        className="bi bi-info-circle nfc-info ms-2"
                        aria-hidden="true"
                        onClick={() => setShowInfoModal(true)}
                      />
                    </button>
                  </div>
                  <span>Print your NFC card template</span>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  <button
                    className="btn btn-primary p-0"
                    onClick={() => handlePrint(printCardTemplate)}
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="setting-card d-flex sign-out flex-wrap mt-5">
                <div className="icon col-2">
                  <i className="bi bi-box-arrow-right"></i>
                </div>
                <div className="input text-start col-9">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Sign Out</p>
                  </div>
                  <span>End your session on this device</span>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  <button
                    className="btn btn-secondary p-0"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
              <div className="info text-centre mt-4">
                <span>
                  Your account information is private and only visible to you.
                </span>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      <Modal
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        centered
        className="confirmModal"
      >
        <NFCModal
          onClose={() => setShowInfoModal(false)}
          handleCopyLink={handleCopyLink}
        />
      </Modal>
    </>
  );
}

export default ProfileSettings;
