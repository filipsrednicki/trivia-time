import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon} from "../icons/im-x.svg";

interface Props {
  isShown: boolean;
  isLoading?: boolean;
  closeButton?: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({
  closeModal,
  isShown,
  closeButton,
  children,
  isLoading,
}: Props): React.ReactPortal | null => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isShown) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!isLoading) {
          closeModal();
        }
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [closeModal, isLoading, isShown]);

  if (!isShown) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current && modalRef.current === e.target) {
      if (!isLoading) {
        closeModal();
      }
    }
  };

  return createPortal(
    <div className="modal" ref={modalRef} onMouseDown={handleMouseDown}>
      <div>
        {closeButton && !isLoading && (
          <div className="close-icon" onClick={closeModal}>
            <CloseIcon/>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
};

export default Modal;
