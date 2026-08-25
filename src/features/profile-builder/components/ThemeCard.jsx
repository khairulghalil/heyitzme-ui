import { Accordion, Form, Dropdown } from "react-bootstrap";

function ThemeCard({
  builderProfile,
  handleChange,
  showThemeList = false,
  setShowThemeList,
}) {
  const fontFamily = ["Afacad", "Sofia", "Aclonica", "Alex Brush"];

  return (
    <Accordion defaultActiveKey={showThemeList ? "1" : "0"} className="mb-3">
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setShowThemeList(!showThemeList)}>
          Theme
        </Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="primaryColor">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Primary Color</Form.Label>
              <Form.Control
                type="color"
                value={builderProfile?.theme?.primaryColor || "#FFA01A"}
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
                value={builderProfile?.theme?.secondaryColor || "#FDD7A3"}
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
                value={builderProfile?.theme?.backgroundColor || "#FFFFFF"}
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
                value={builderProfile?.theme?.fontColor || "#9e9e9e"}
                onChange={handleChange}
                name="theme.fontColor"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fontFamily">
            <div className="d-flex align-items-center justify-content-between">
              <Form.Label className="mb-0">Font</Form.Label>

              <Dropdown>
                <Dropdown.Toggle className="text-end" variant="light">
                  {builderProfile?.theme?.fontFamily || "Afacad"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {fontFamily.map((font) => (
                    <Dropdown.Item
                      key={font}
                      style={{ fontFamily: font }}
                      onClick={() =>
                        handleChange({
                          target: { name: "theme.fontFamily", value: font },
                        })
                      }
                    >
                      {font}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ThemeCard;
