import * as socialMediaIcons from "../../../assets/img/socmed";

function SocialMedia({ links }) {
  const { facebook, tiktok, instagram, x, threads, youtube, discord } = links;
  const hidden = (value) => (value ? "" : "d-none");
  return (
    <>
      <div className="social-media-links mt-3 pb-5">
        <a href={facebook} target="_blank" className={hidden(facebook)}>
          <img
            src={socialMediaIcons.facebook}
            alt="facebook"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={tiktok} target="_blank" className={hidden(tiktok)}>
          <img
            src={socialMediaIcons.tiktok}
            alt="tiktok"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={instagram} target="_blank" className={hidden(instagram)}>
          <img
            src={socialMediaIcons.instagram}
            alt="instagram"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={x} target="_blank" className={hidden(x)}>
          <img
            src={socialMediaIcons.x}
            alt="x"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={threads} target="_blank" className={hidden(threads)}>
          <img
            src={socialMediaIcons.threads}
            alt="threads"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={youtube} target="_blank" className={hidden(youtube)}>
          <img
            src={socialMediaIcons.youtube}
            alt="youtube"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={discord} target="_blank" className={hidden(discord)}>
          <img
            src={socialMediaIcons.discord}
            alt="discord"
            className="img-fluid social-media-icon"
          />
        </a>
      </div>
    </>
  );
}

export default SocialMedia;
