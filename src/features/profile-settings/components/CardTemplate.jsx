import { QRCodeSVG } from "qrcode.react";
import html2pdf from "html2pdf.js";
import * as logo from "../../../assets/img/logo";

export const printCardTemplate = () => {
  const element = document.querySelector(".print-area");

  if (element) {
    html2pdf()
      .set({
        margin: 0,
        filename: "heyitzme-card-template.pdf",
        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 2,
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

function CardTemplate() {
  return (
    <>
      <div className="card-template print-area text-center d-flex flex-column justify-content-center">
        <div className="business-card front-side d-flex flex-column align-items-center mb-5 text-center">
          <div className="nfc-logo">
            <img className="img-fluid" src={logo.nfc} alt="Logo" width="20" />
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
              value={"https://heyitzme.com"}
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
          <p>heyitzme.com/khairul-ghalil</p>
        </div>
      </div>

      <button onClick={printCardTemplate}>Print PDF</button>
    </>
  );
}

export default CardTemplate;
