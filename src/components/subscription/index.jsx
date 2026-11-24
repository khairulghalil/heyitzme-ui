import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { useToast, Loader } from "..";
import * as logo from "../../assets/img/logo";
import "./subscription.scss";

function Subscription({ show, onHide, type, selectedPlan }) {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const [expandedPlans, setExpandedPlans] = useState({});
  const [subscriptionData, setSubscriptionData] = useState([]);

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

    priorityCheck();

    return () => {
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.width = previousStyles.bodyWidth;
      body.style.overflow = previousStyles.bodyOverflow;
      html.style.overflow = previousStyles.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [show]);

  const priorityCheck = () => {
    const subscriptionDataRaw = [
      {
        type: "basic",
        title: "Basic Plan",
        description: "Free plan with basic features.",
        badge: "✦",
        price: "RM 35",
        period: "Per Year",
        features: [
          "Custom banner",
          "Unlimited profile sharing",
          "Up to 5 font styles to choose",
          "Custom profile theme",
        ],
        toHide: false,
      },
      {
        type: "pro",
        title: "Pro Plan",
        description: "Paid plan with advanced features.",
        badge: "✦",
        price: "RM 45",
        period: "Per Year",
        features: [
          "Upload custom logo feature",
          "Unlock 2 additional sections",
          "Up to 10 font styles to choose",
          "Basic Plan features included",
        ],
        toHide: false,
      },
      {
        type: "premium",
        title: "Premium Plan",
        description: "Paid plan with advanced features.",
        badge: "♛",
        price: "RM 50",
        period: "Per Year",
        features: [
          "Unlock verified badge",
          "Up to 5 additional sections",
          "Up to 15 font styles to choose",
          "Pro Plan features included",
        ],
        toHide: false,
      },
    ];

    const planConfig = {
      basic: {
        order: ["basic", "pro", "premium"],
        hidden: [],
      },
      pro: {
        order: ["pro", "premium", "basic"],
        hidden: ["basic"],
      },
      premium: {
        order: ["premium", "basic", "pro"],
        hidden: ["basic", "pro"],
      },
    };

    const config = planConfig[selectedPlan] || planConfig.basic;

    const priorityOrder = config.order;

    const rearrangedSubscriptionData = subscriptionDataRaw
      .map((plan) => ({
        ...plan,
        toHide: config.hidden.includes(plan.type),
      }))
      .sort(
        (a, b) => priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type),
      );

    setSubscriptionData(rearrangedSubscriptionData);
  };

  const onHideCanvas = () => {
    onHide();
    setTimeout(() => setExpandedPlans({}), 300);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={onHideCanvas}
        placement="end"
        className={`subscription-offcanvas w-100 ${type}`}
      >
        <Offcanvas.Header closeButton closeVariant="white" />
        <Offcanvas.Body className="subscription-body text-center pt-0">
          <div className="subscription-title d-flex flex-column align-items-center mb-3">
            <span>Subscription Plans</span>
            <img className="subscription-logo" src={logo.logo} alt="HeyItzMe" />
            <p>Choose a plan that suits your needs.</p>
          </div>

          {subscriptionData.map((plan) => (
            <div className="subscription-card mb-3" key={plan.type}>
              <div className="subscription-card-header d-flex justify-content-between">
                <div className="badge-wrapper">
                  <span className={plan.type}>
                    <i className="badge-icon">{plan.badge}</i> {plan.title}
                  </span>
                  <p>{plan.description}</p>
                </div>
                <div className="price-wrapper">
                  <h2>{plan.price}</h2>
                  <p>{plan.period}</p>
                </div>
              </div>
              <div className="subscription-card-content">
                <div className="d-flex justify-content-between">
                  <h4 className="text-start fw-bold text-white mt-3">
                    Features
                  </h4>
                  <button className="btn btn-secondary">GET</button>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="features-wrapper">
                    {plan.features
                      .slice(0, expandedPlans[plan.type] ? undefined : 2)
                      .map((feature, index) => (
                        <p key={index}>
                          <i className="bi bi-check-all"></i> {feature}
                        </p>
                      ))}
                  </div>
                  {plan.features.length > 2 && (
                    <button
                      type="button"
                      className="feature-toggle align-self-end"
                      aria-expanded={!!expandedPlans[plan.type]}
                      onClick={() =>
                        setExpandedPlans((previous) => ({
                          ...previous,
                          [plan.type]: !previous[plan.type],
                        }))
                      }
                    >
                      {expandedPlans[plan.type] ? "Hide" : "Show more"}
                    </button>
                  )}
                </div>
              </div>
              {plan.toHide && (
                <div className="content-overlay d-flex align-items-center justify-content-center px-2">
                  <span>
                    <p>
                      This plan doesn't include the features you're currently
                      using
                    </p>
                  </span>
                </div>
              )}
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Subscription;
