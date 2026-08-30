import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  selectProfile,
  selectUpdProfileLoading,
} from "../../store/profile/selectors";
import { Footer } from "../../components";
import { isAuthenticated } from "../../utils";

import "./profile-settings.scss";
function ProfileSettings() {
  const username = useParams().username;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const updLoading = useSelector(selectUpdProfileLoading);

  const [editRegisteredEmail, setEditRegisteredEmail] = useState(false);

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
              viewBox="0 0 880 510"
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
              <div className="setting-header mt-5 text-start">
                <span
                  className="back-button"
                  onClick={() => navigate(`/${profile.username}`)}
                >
                  <i className="bi bi-arrow-left"></i>
                </span>
                <h2 className="mb-0 text-end">PROFILE SETTINGS</h2>
              </div>
              <div className="setting-card p-2 mx-3 mt-5 text-start">
                <div className="setting-list mt-3">
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

                    <button
                      type="button"
                      className={`btn p-0 btn-sm btn-outline-secondary edit-btn ${editRegisteredEmail ? "d-none" : ""}`}
                      onClick={() =>
                        setEditRegisteredEmail(!editRegisteredEmail)
                      }
                    >
                      Edit
                    </button>
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
                  <p>
                    <i className="bi bi-envelope me-2"></i>
                    Password
                  </p>
                  <span>********</span>
                </div>

                <div className="setting-list">
                  <p>
                    <i className="bi bi-info-circle me-2"></i>
                    Status
                  </p>
                  <span>{profile.status}</span>
                </div>

                <div className="setting-list mb-3">
                  <p>
                    <i className="bi bi-calendar-check me-2"></i>
                    Valid until
                  </p>
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
