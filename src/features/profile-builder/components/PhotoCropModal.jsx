import { useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import Cropper from "react-easy-crop";

function PhotoCropModal({
  imageSrc,
  onCancel,
  onSave,
  aspect = 1,
  cropShape = "round",
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = () => {
    onSave(croppedAreaPixels);
  };

  return (
    <Modal.Body className="text-center">
      <div className="photo-modal-header mb-2 d-flex justify-content-start">
        <div className="icon me-3">
          <i className="bi bi-image"></i>
        </div>
        <h2 className="fw-bold mb-0 text-start align-self-center ">
          Crop Image
        </h2>
      </div>
      <p className="text-start">
        Drag to reposition. Pinch or use slider to scale.
      </p>
      <hr />
      <div className="photo-crop-area">
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        )}
      </div>

      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="form-range my-3"
      />

      <p className="text-start save-info">
        <i className="bi bi-check-circle-fill me-2"></i>
        Save your changes once the image is ready.
      </p>

      <div className="d-flex justify-content-center gap-2">
        <Button variant="secondary" className="mx-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" className="mx-1" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal.Body>
  );
}

export default PhotoCropModal;
