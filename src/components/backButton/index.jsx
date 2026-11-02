import "./backButton.scss";

function BackButton({ action }) {
  return (
    <span className="back-button" onClick={action}>
      <i className="bi bi-chevron-left"></i>
    </span>
  );
}

export default BackButton;
