function SocialLink({ contact }) {
  const { whatsapp, phone, email, website, linkedin } = contact;
  const hidden = (value) => (value ? "" : "d-none");

  const getIconSrc = (platform) => {
    return socialMediaIcons[platform] || "";
  };

  return (
    <>
      <div className="social-links mb-3">
        <a
          href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsappText)}`}
          className={`social-icon ${hidden(whatsapp)}`}
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        <a href={`tel:${phone}`} className={`social-icon ${hidden(phone)}`}>
          <i className="bi bi-telephone"></i>
        </a>

        <a href={`mailto:${email}`} className={`social-icon ${hidden(email)}`}>
          <i className="bi bi-envelope"></i>
        </a>

        <a href={website} className={`social-icon ${hidden(website)}`}>
          <i className="bi bi-globe"></i>
        </a>

        <a href={linkedin} className={`social-icon ${hidden(linkedin)}`}>
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </>
  );
}

export default SocialLink;
