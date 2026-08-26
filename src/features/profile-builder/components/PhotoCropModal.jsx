import { useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import Cropper from "react-easy-crop";

function PhotoCropModal({ imageSrc, onCancel, onSave }) {
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
      <div className="photo-crop-area">
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
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

      <div>
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
