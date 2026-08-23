import { Accordion, Form } from "react-bootstrap";

function ThemeCard({ updProfile, handleChange }) {
  return (
    <Accordion className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Theme</Accordion.Header>

        <Accordion.Body>
          <Form.Group className="mb-3" controlId="primaryColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Primary Color</Form.Label>
              <Form.Control
                type="color"
                value={updProfile?.theme?.primaryColor || "#FFA01A"}
                onChange={handleChange}
                name="theme.primaryColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="secondaryColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Secondary Color</Form.Label>
              <Form.Control
                type="color"
                value={updProfile?.theme?.secondaryColor || "#FDD7A3"}
                onChange={handleChange}
                name="theme.secondaryColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="backgroundColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Background Color</Form.Label>
              <Form.Control
                type="color"
                value={updProfile?.theme?.backgroundColor || "#FFFFFF"}
                onChange={handleChange}
                name="theme.backgroundColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fontColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Font Color</Form.Label>
              <Form.Control
                type="color"
                value={updProfile?.theme?.fontColor || "#9e9e9e"}
                onChange={handleChange}
                name="theme.fontColor"
              />
            </div>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ThemeCard;
