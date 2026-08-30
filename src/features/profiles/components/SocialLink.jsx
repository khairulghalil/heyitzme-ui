function SocialLink({ contact }) {
  const { whatsapp, phone, email, website, linkedin } = contact;
  const hidden = (value) => (value ? "" : "d-none");

  return (
    <>
      <div className="social-links mb-3">
        <a
          href={`https://wa.me/${whatsapp.item.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsappText.show ? contact.whatsappText.item : "")}`}
          className={`social-icon ${hidden(whatsapp.show)}`}
        >
          <i className="bi bi-whatsapp"></i>
        </a>

        <a
          href={`tel:${phone.item}`}
          className={`social-icon ${hidden(phone.show)}`}
        >
          <i className="bi bi-telephone"></i>
        </a>

        <a
          href={`mailto:${email.item}`}
          className={`social-icon ${hidden(email.show)}`}
        >
          <i className="bi bi-envelope"></i>
        </a>

        <a
          href={website.item}
          className={`social-icon ${hidden(website.show)}`}
        >
          <i className="bi bi-globe"></i>
        </a>

        <a
          href={linkedin.item}
          className={`social-icon ${hidden(linkedin.show)}`}
        >
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </>
  );
}

export default SocialLink;
