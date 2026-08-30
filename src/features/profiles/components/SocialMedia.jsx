import * as socialMediaIcons from "../../../assets/img/socmed";

function SocialMedia({ links }) {
  const { facebook, tiktok, instagram, x, threads, youtube, discord } = links;
  const hidden = (value) => (value ? "" : "d-none");
  return (
    <>
      <div className="social-media-links mt-3 pb-5">
        <a
          href={facebook.item}
          target="_blank"
          className={hidden(facebook.show)}
        >
          <img
            src={socialMediaIcons.facebook}
            alt="facebook"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={tiktok.item} target="_blank" className={hidden(tiktok.show)}>
          <img
            src={socialMediaIcons.tiktok}
            alt="tiktok"
            className="img-fluid social-media-icon"
          />
        </a>
        <a
          href={instagram.item}
          target="_blank"
          className={hidden(instagram.show)}
        >
          <img
            src={socialMediaIcons.instagram}
            alt="instagram"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={x.item} target="_blank" className={hidden(x.show)}>
          <img
            src={socialMediaIcons.x}
            alt="x"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={threads.item} target="_blank" className={hidden(threads.show)}>
          <img
            src={socialMediaIcons.threads}
            alt="threads"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={youtube.item} target="_blank" className={hidden(youtube.show)}>
          <img
            src={socialMediaIcons.youtube}
            alt="youtube"
            className="img-fluid social-media-icon"
          />
        </a>
        <a href={discord.item} target="_blank" className={hidden(discord.show)}>
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
