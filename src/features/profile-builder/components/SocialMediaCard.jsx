import { Accordion, Form } from "react-bootstrap";

function SocialMediaCard({
  builderProfile,
  handleChange,
  showSocMedList = false,
  setShowSocMedList,
}) {
  return (
    <Accordion defaultActiveKey={showSocMedList ? "1" : "0"} className="mb-3">
      <Accordion.Item eventKey="1">
        <Accordion.Header onClick={() => setShowSocMedList(!showSocMedList)}>
          Social Media
        </Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="facebook">
            <Form.Label>Facebook</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.facebook"
              value={builderProfile?.socialMedia?.facebook || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tiktok">
            <Form.Label>Tiktok</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.tiktok"
              value={builderProfile?.socialMedia?.tiktok || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="instagram">
            <Form.Label>Instagram</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.instagram"
              value={builderProfile?.socialMedia?.instagram || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="x">
            <Form.Label>X</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.x"
              value={builderProfile?.socialMedia?.x || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="threads">
            <Form.Label>Threads</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.threads"
              value={builderProfile?.socialMedia?.threads || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="youtube">
            <Form.Label>Youtube</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.youtube"
              value={builderProfile?.socialMedia?.youtube || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="discord">
            <Form.Label>Discord</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.discord"
              value={builderProfile?.socialMedia?.discord || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default SocialMediaCard;
