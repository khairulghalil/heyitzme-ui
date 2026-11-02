import { Accordion, Button, Form } from "react-bootstrap";

function AdditionalSectionCard({
  builderProfile,
  handleChange,
  showAdditionalSectionList = false,
  setShowAdditionalSectionList,
}) {
  const sectionData = builderProfile?.additionalSection?.item;
  const sectionLimit = builderProfile?.additionalSection?.limit || 1;
  console.log("sectionLimit:", sectionLimit);
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
