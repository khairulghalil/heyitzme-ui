import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import moment from "moment";
import {
  selectProfile,
  selectUpdProfileLoading,
} from "../../store/profile/selectors";
import { Footer, Dropdown, BackButton } from "../../components";
import { isAuthenticated } from "../../utils";

import "./profile-settings.scss";
function ProfileSettings() {
  const username = useParams().username;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const updLoading = useSelector(selectUpdProfileLoading);

  const [editRegisteredEmail, setEditRegisteredEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

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

  useEffect(() => {
    if (!isAuthenticated(username) || !profile) {
      navigate(`/${username}`);
    }
  }, []);

  return (
    <>
      {profile && (
        <>
          <div className="containers text-center">
            <svg
              className="background"
              viewBox="0 0 780 410"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMaxYMin slice"
            >
              <path
                d="M420.739 171.709C152.117 176.988 69.3602 62.4165 0 0H880V336C880 275.833 689.361 166.43 420.739 171.709Z"
                fill={profile.theme.primaryColor || "var(--primary-app-color)"}
              />
            </svg>
            <div className="setting-wrapper">
              <div className="setting-card p-2 mx-3 mt-5 text-start">
                <div className="setting-header my-4 text-start">
                  <BackButton action={() => navigate(`/${profile.username}`)} />
                  <h2 className="mb-0 me-2 text-end">PROFILE SETTINGS</h2>
                </div>
                <div className="setting-list mt-4">
                  <p>
                    <i className="bi bi-person me-2"></i>
                    Username
                  </p>
                  <span>{profile.username}</span>
                </div>

                <div className="setting-list">
                  <p>
                    <i className="bi bi-link-45deg me-2"></i>Profile URL
                  </p>
                  <span>{`https://heyitzme.com/${profile.username}`}</span>
                </div>

                <div className="setting-list">
                  <div className="d-flex align-items-center justify-content-between">
                    <p>
                      <i className="bi bi-envelope me-2"></i>
                      Registered email
                    </p>
                    <Dropdown item={emailOptions} vertical />
                  </div>

                  {editRegisteredEmail ? (
                    <div className="d-flex flex-column align-items-end gap-2">
                      <input
                        type="email"
                        className="form-control w-100 mt-1"
                        value={profile.contact.email}
                        onChange={(e) => setEditRegisteredEmail(e.target.value)}
                      />

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-secondary w-100"
                          onClick={() => setEditRegisteredEmail(false)}
                        >
                          Cancel
                        </button>
                        <button className="btn btn-primary w-100">Save</button>
                      </div>
                    </div>
                  ) : (
                    <span>{profile.contact.email}</span>
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
                          onChange={null}
                        />
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          onChange={null}
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
                          onChange={null}
                        />
                      </Form.Group>

                      <div className="d-flex gap-2 align-self-end">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditPassword(false)}
                        >
                          Cancel
                        </button>

                        <button className="btn btn-primary">Save</button>
                      </div>
                    </div>
                  ) : (
                    <span>*******************</span>
                  )}
                </div>

                <div className="setting-list">
                  <p>
                    <i className="bi bi-info-circle me-2"></i>
                    Status
                  </p>
                  <span>{profile.status}</span>
                </div>

                <div className="setting-list">
                  <div className="d-flex align-items-center justify-content-between">
                    <p>
                      <i className="bi bi-calendar-check me-2"></i>
                      Valid until
                    </p>

                    <Dropdown item={validOptions} vertical />
                  </div>

                  <span>{moment(profile.expiresAt).format("DD MMM YYYY")}</span>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProfileSettings;
