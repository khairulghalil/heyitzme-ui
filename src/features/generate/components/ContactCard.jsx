import { Accordion, Form } from "react-bootstrap";

function ContactCard({
  updProfile,
  handleChange,
  showContactList = false,
  setShowContactList,
}) {
  return (
    <Accordion defaultActiveKey={showContactList ? "1" : "0"} className="mb-3">
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setShowContactList(!showContactList)}>
          Contact
        </Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="contact.phone"
              value={updProfile?.contact?.phone || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="contact.email"
              value={updProfile?.contact?.email || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="whatsapp">
            <Form.Label>WhatsApp</Form.Label>
            <Form.Control
              type="text"
              name="contact.whatsapp"
              value={updProfile?.contact?.whatsapp || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="whatsappText">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              name="contact.whatsappText"
              value={updProfile?.contact?.whatsappText || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="linkedin">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              type="text"
              name="contact.linkedin"
              value={updProfile?.contact?.linkedin || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="contact.website"
              value={updProfile?.contact?.website || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ContactCard;
