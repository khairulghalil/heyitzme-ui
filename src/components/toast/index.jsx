import { createContext, useContext, useState } from "react";
import { Toast as BootstrapToast, ToastContainer } from "react-bootstrap";
import "./toast.scss";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const showToast = (message, type = "info") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast({
      show: false,
      message: "",
      type: "info",
    });
  };

  const icon = {
    success: "✅",
    error: "⚠️",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer position="bottom-center" className="p-0 toast-container">
        <BootstrapToast
          show={toast.show}
          onClose={hideToast}
          delay={1500}
          autohide
        >
          <BootstrapToast.Body>
            {toast.type !== "info" && (
              <span className="me-2">{icon[toast.type]}</span>
            )}
            {toast.message}
          </BootstrapToast.Body>
        </BootstrapToast>
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
