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
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Facebook</Form.Label>

              <Form.Check
                type="switch"
                id="facebook-toggle"
                name="socialMedia.facebook.show"
                checked={builderProfile?.socialMedia?.facebook?.show || false}
                onChange={handleChange}
              />
            </div>

            <Form.Control
              type="text"
              name="socialMedia.facebook.item"
              value={builderProfile?.socialMedia?.facebook?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tiktok">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Tiktok</Form.Label>

              <Form.Check
                type="switch"
                id="tiktok-toggle"
                name="socialMedia.tiktok.show"
                checked={builderProfile?.socialMedia?.tiktok?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="socialMedia.tiktok.item"
              value={builderProfile?.socialMedia?.tiktok?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="instagram">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Instagram</Form.Label>

              <Form.Check
                type="switch"
                id="instagram-toggle"
                name="socialMedia.instagram.show"
                checked={builderProfile?.socialMedia?.instagram?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="socialMedia.instagram.item"
              value={builderProfile?.socialMedia?.instagram?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="x">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">X</Form.Label>

              <Form.Check
                type="switch"
                id="x-toggle"
                name="socialMedia.x.show"
                checked={builderProfile?.socialMedia?.x?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="socialMedia.x.item"
              value={builderProfile?.socialMedia?.x?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="threads">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Threads</Form.Label>

              <Form.Check
                type="switch"
                id="threads-toggle"
                name="socialMedia.threads.show"
                checked={builderProfile?.socialMedia?.threads?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="socialMedia.threads.item"
              value={builderProfile?.socialMedia?.threads?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="youtube">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Youtube</Form.Label>

              <Form.Check
                type="switch"
                id="youtube-toggle"
                name="socialMedia.youtube.show"
                checked={builderProfile?.socialMedia?.youtube?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="socialMedia.youtube.item"
              value={builderProfile?.socialMedia?.youtube?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="discord">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Form.Label className="mb-0">Discord</Form.Label>

              <Form.Check
                type="switch"
                id="discord-toggle"
                name="socialMedia.discord.show"
                checked={builderProfile?.socialMedia?.discord?.show || false}
                onChange={handleChange}
              />
            </div>
            <Form.Control
              type="text"
              name="socialMedia.discord.item"
              value={builderProfile?.socialMedia?.discord?.item || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default SocialMediaCard;
