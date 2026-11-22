import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { useToast, Loader } from "..";
import * as logo from "../../assets/img/logo";
import "./subscription.scss";

function Subscription({ show, onHide }) {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!show) return undefined;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const previousStyles = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.width = previousStyles.bodyWidth;
      body.style.overflow = previousStyles.bodyOverflow;
      html.style.overflow = previousStyles.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [show]);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={onHide}
        placement="end"
        className="subscription-offcanvas w-100"
      >
        <Offcanvas.Header closeButton closeVariant="white" />
        <Offcanvas.Body className="subscription-body text-center">
          <div className="subscription-title d-flex flex-column align-items-center mb-4">
            <span>Subscription</span>
            <img className="subscription-logo" src={logo.logo} alt="HeyItzMe" />
            <p>Make the most of your digital profile.</p>
          </div>
          <div className="subscription-card">
            <p>
              Choose a plan that suits your needs and unlock premium features.
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Subscription;
