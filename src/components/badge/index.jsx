import "./badge.scss";

function BasicBadge() {
  return (
    <span className="badge basic rounded-pill bg-primary-subtle text-primary-emphasis">
      BASIC
    </span>
  );
}

function ProBadge() {
  return (
    <span className="badge pro rounded-pill bg-primary-subtle text-primary-emphasis px-3">
      ✦ PRO
    </span>
  );
}

function PremiumBadge() {
  return (
    <span className="badge premium rounded-pill bg-primary-subtle text-primary-emphasis px-2">
      <span className="premium-icon">♛</span> PREMIUM
    </span>
  );
}

export { BasicBadge, ProBadge, PremiumBadge };
