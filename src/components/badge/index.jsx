import "./badge.scss";

function BasicBadge({ text }) {
  return (
    <span className={`badge basic ${text && "has-text"} rounded-pill`}>
      BASIC {text}
    </span>
  );
}

function ProBadge({ text }) {
  return (
    <span className={`badge pro ${text && "has-text"} rounded-pill`}>
      ✦ PRO {text}
    </span>
  );
}

function PremiumBadge({ text }) {
  return (
    <span className={`badge premium ${text && "has-text"} rounded-pill`}>
      <span className="premium-icon">♛</span> PREMIUM {text}
    </span>
  );
}

export { BasicBadge, ProBadge, PremiumBadge };
