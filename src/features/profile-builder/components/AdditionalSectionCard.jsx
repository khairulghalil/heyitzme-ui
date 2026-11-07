import {
  Accordion,
  Button,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

function AdditionalSectionCard({
  builderProfile,
  handleChange,
  showAdditionalSectionList = false,
  setShowAdditionalSectionList,
}) {
  const sectionData = builderProfile?.additionalSection?.item;
  const sectionLimit = builderProfile?.additionalSection?.limit || 1;
  const sections = Array.isArray(sectionData)
    ? sectionData
    : sectionData && typeof sectionData === "object"
      ? [sectionData]
      : [];

  const updateSections = (items) => {
    handleChange({
      target: {
        name: "additionalSection.item",
        value: items,
      },
    });
  };

  const addSection = () => {
    updateSections([...sections, { enable: true, title: "", content: "" }]);
  };

  const deleteSection = (indexToDelete) => {
    updateSections(sections.filter((_, index) => index !== indexToDelete));
  };

  return (
    <Accordion
      defaultActiveKey={showAdditionalSectionList ? "additional-section" : null}
      className="mb-3"
    >
      <Accordion.Item eventKey="additional-section">
        <Accordion.Header
          onClick={() =>
            setShowAdditionalSectionList(!showAdditionalSectionList)
          }
        >
          Additional Section
          <OverlayTrigger
            trigger="click"
            placement="top"
            rootClose
            overlay={
              <Popover
                id="additional-section-formatting-help"
                className="help-popover"
              >
                <Popover.Body className="p-2">
                  Markdown syntax supported
                  <p className="m-0 mt-2">
                    <strong className="me-5">Bold</strong> :{" "}
                    <span className="text-muted ms-2">*text*</span>
                  </p>
                  <p className="m-0">
                    <em className="me-5">Italic</em> :{" "}
                    <span className="text-muted ms-2">_text_</span>
                  </p>
                  <p className="m-0">
                    <strong>
                      <em className="b-italic">Bold Italic</em>
                    </strong>{" "}
                    : <span className="text-muted ms-2">*_text_*</span>
                  </p>
                </Popover.Body>
              </Popover>
            }
          >
            <button
              type="button"
              className="info-button"
              aria-label="Additional section text formatting help"
              onClick={(event) => event.stopPropagation()}
            >
              <i className="bi bi-info-circle ms-2" aria-hidden="true" />
            </button>
          </OverlayTrigger>
        </Accordion.Header>
        <Accordion.Body>
          {sections.map((section, index) => (
            <Form.Group
              className="mb-3"
              controlId={`additional-section-${index}`}
              key={index}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Control
                  type="text"
                  className="mb-2"
                  name={`additionalSection.item.${index}.title`}
                  value={section.title || ""}
                  onChange={handleChange}
                  placeholder="Title"
                />

                <Button
                  type="button"
                  variant="outline-danger"
                  className="mb-2 delete-section-btn"
                  aria-label={`Delete additional section ${index + 1}`}
                  title="Delete section"
                  onClick={() => deleteSection(index)}
                >
                  <i className="bi bi-trash3" aria-hidden="true" />
                </Button>

                <Form.Check
                  type="switch"
                  id={`additional-section-${index}-toggle`}
                  name={`additionalSection.item.${index}.enable`}
                  checked={section.enable ?? false}
                  onChange={handleChange}
                  aria-label={`Enable additional section ${index + 1}`}
                  className="mb-2 text-end"
                />
              </div>
              <Form.Control
                as="textarea"
                name={`additionalSection.item.${index}.content`}
                value={section.content || ""}
                onChange={handleChange}
                rows={3}
                placeholder="Content"
              />
            </Form.Group>
          ))}
          {sections.length < sectionLimit && (
            <Button type="button" variant="secondary" onClick={addSection}>
              Add section
            </Button>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AdditionalSectionCard;
