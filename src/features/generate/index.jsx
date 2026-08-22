import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectProfile } from "../../store/profile/selectors";
import { removeToken, isAuthenticated } from "../../utils";

function generateCard({ type }) {
  const username = useParams().username;
  const navigate = useNavigate();

  const profile = useSelector(selectProfile);

  useEffect(() => {
    if (!isAuthenticated(username) || !profile) {
      navigate(`/${username}`);
    }
  }, []);

  return (
    <div>
      <h4>Generate Card for {username}</h4>

      <button className="btn btn-danger" onClick={() => removeToken()}>
        Logout
      </button>
    </div>
  );
}

export default generateCard;
