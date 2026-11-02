import { Accordion, Form, OverlayTrigger, Popover } from "react-bootstrap";

function ContactCard({
  builderProfile,
  handleChange,
  showContactList = false,
  setShowContactList,
}) {
  return (
    <Accordion defaultActiveKey={showContactList ? "1" : "0"} className="mb-3">
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setShowContactList(!showContactList)}>
          Contact & Links
        </Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="phone">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Phone</Form.Label>

              <Form.Check
                type="switch"
                id="phone-toggle"
                name="contact.phone.show"
                checked={builderProfile?.contact?.phone?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="contact.phone.item"
              value={builderProfile?.contact?.phone?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Email</Form.Label>

              <Form.Check
                type="switch"
                id="email-toggle"
                name="contact.email.show"
                checked={builderProfile?.contact?.email?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="email"
              name="contact.email.item"
              value={builderProfile?.contact?.email?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="whatsapp">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">WhatsApp Number</Form.Label>

              <Form.Check
                type="switch"
                id="whatsapp-toggle"
                name="contact.whatsapp.show"
                checked={builderProfile?.contact?.whatsapp?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="contact.whatsapp.item"
              value={builderProfile?.contact?.whatsapp?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="whatsappText">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Whatsapp Message</Form.Label>

              <Form.Check
                type="switch"
                id="whatsapp-toggle"
                name="contact.whatsappText.show"
                checked={builderProfile?.contact?.whatsappText?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="contact.whatsappText.item"
              value={builderProfile?.contact?.whatsappText?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="mb-0">Location (Google Maps)</Form.Label>
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  rootClose
                  overlay={
                    <Popover
                      id="google-maps-link-help"
                      className="google-maps-help-popover"
                    >
                      <Popover.Body>
                        <ol className="mb-0 ps-3">
                          <li>Open Google Maps.</li>
                          <li>Find your location.</li>
                          <li>
                            Select <strong>Share</strong>.
                          </li>
                          <li>
                            Choose <strong>Copy link</strong>.
                          </li>
                          <li>Paste the link into this field.</li>
                        </ol>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <button
                    type="button"
                    className="location-info-button"
                    aria-label="How to copy a Google Maps link"
                  >
                    <i className="bi bi-info-circle" aria-hidden="true" />
                  </button>
                </OverlayTrigger>
              </div>

              <Form.Check
                type="switch"
                id="location-toggle"
                name="contact.location.show"
                checked={builderProfile?.contact?.location?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="contact.location.item"
              value={builderProfile?.contact?.location?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="linkedin">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">LinkedIn</Form.Label>

              <Form.Check
                type="switch"
                id="linkedin-toggle"
                name="contact.linkedin.show"
                checked={builderProfile?.contact?.linkedin?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="contact.linkedin.item"
              value={builderProfile?.contact?.linkedin?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="website">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Website</Form.Label>

              <Form.Check
                type="switch"
                id="website-toggle"
                name="contact.website.show"
                checked={builderProfile?.contact?.website?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="contact.website.item"
              value={builderProfile?.contact?.website?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ContactCard;
