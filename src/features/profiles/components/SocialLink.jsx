function SocialLink({ contact }) {
  const { whatsapp, phone, email, website, linkedin, location } = contact;
  const whatsappText = contact.whatsappText || contact.whatsapp_text;
  const hidden = (value) => (value ? "" : "d-none");

  return (
    <>
      <div className="social-links mb-3">
        <a
          href={`https://wa.me/${whatsapp.item.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText?.show ? whatsappText.item : "")}`}
          className={`social-icon ${hidden(whatsapp.show)}`}
          aria-label="WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        <a
          href={`tel:${phone.item}`}
          className={`social-icon ${hidden(phone.show)}`}
          aria-label="Phone"
        >
          <i className="bi bi-telephone"></i>
        </a>

        <a
          href={`mailto:${email.item}`}
          className={`social-icon ${hidden(email.show)}`}
          aria-label="Email"
        >
          <i className="bi bi-envelope"></i>
        </a>

        <a
          href={location.item}
          className={`social-icon ${hidden(location.show)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Location"
        >
          <i className="bi bi-geo-alt"></i>
        </a>

        <a
          href={website.item}
          className={`social-icon ${hidden(website.show)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Website"
        >
          <i className="bi bi-globe"></i>
        </a>

        <a
          href={linkedin.item}
          className={`social-icon ${hidden(linkedin.show)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </>
  );
}

export default SocialLink;
