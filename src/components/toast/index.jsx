import { createContext, useContext, useState } from "react";
import { Toast as BootstrapToast, ToastContainer } from "react-bootstrap";
import "./toast.scss";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const showToast = (message) => {
    setToast({
      show: true,
      message,
    });
  };

  const hideToast = () => {
    setToast({
      show: false,
      message: "",
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer position="bottom-center" className="p-0 toast-container">
        <BootstrapToast
          show={toast.show}
          onClose={hideToast}
          delay={3000}
          autohide
        >
          <BootstrapToast.Body>{toast.message}</BootstrapToast.Body>
        </BootstrapToast>
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
