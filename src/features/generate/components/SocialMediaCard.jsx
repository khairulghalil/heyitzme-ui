import { Accordion, Form } from "react-bootstrap";

function SocialMediaCard({ updProfile, handleChange }) {
  return (
    <Accordion className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Social Media</Accordion.Header>

        <Accordion.Body>
          <Form.Group className="mb-3" controlId="facebook">
            <Form.Label>Facebook</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.facebook"
              value={updProfile?.socialMedia?.facebook || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tiktok">
            <Form.Label>Tiktok</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.tiktok"
              value={updProfile?.socialMedia?.tiktok || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="instagram">
            <Form.Label>Instagram</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.instagram"
              value={updProfile?.socialMedia?.instagram || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="x">
            <Form.Label>X</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.x"
              value={updProfile?.socialMedia?.x || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="threads">
            <Form.Label>Threads</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.threads"
              value={updProfile?.socialMedia?.threads || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="youtube">
            <Form.Label>Youtube</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.youtube"
              value={updProfile?.socialMedia?.youtube || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="discord">
            <Form.Label>Discord</Form.Label>
            <Form.Control
              type="text"
              name="socialMedia.discord"
              value={updProfile?.socialMedia?.discord || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default SocialMediaCard;
