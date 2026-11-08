import { QRCodeSVG } from "qrcode.react";
import html2pdf from "html2pdf.js";
import * as logo from "../../assets/img/logo";
import "./cardTemplate.scss";

export const printCardTemplate = () => {
  const element = document.querySelector(".card-print-area");

  if (element) {
    html2pdf()
      .set({
        margin: 0,
        filename: "heyitzme-card-template.pdf",
        image: {
          type: "png",
        },
        html2canvas: {
          scale: 4,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  }
};

function CardTemplate({ username }) {
  return (
    <>
      <div className="card-print-area text-center d-flex flex-column justify-content-center">
        <div className="business-card front-side d-flex flex-column align-items-center mb-5 text-center">
          <div className="nfc-logo">
            <img className="img-fluid" src={logo.nfc} alt="Logo" width="25" />
          </div>
          <img
            className="img-fluid"
            src={logo.logo}
            alt="Logo"
            width="200"
            height="80"
          />
          <p>Your Profile, Endless Connections</p>
        </div>

        <div className="business-card back-side flex-column d-flex align-items-center">
          <div className="qr-code-container">
            <QRCodeSVG
              id="qrcode"
              value={`https://heyitzme.com/${username}`}
              size={70}
              bgColor="#cfcfcf09"
              fgColor="#f8f3f3"
              imageSettings={{
                src: logo.logo,
                height: 15,
                width: 15,
                excavate: true,
              }}
            />
            <img
              className="qr-center-logo"
              src={logo.icon}
              alt=""
              aria-hidden="true"
            />
          </div>
          <p>heyitzme.com/{username}</p>
        </div>
      </div>

      <button onClick={printCardTemplate}>Print PDF</button>
    </>
  );
}

export default CardTemplate;
