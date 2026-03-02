import { useRef, useEffect, createContext, useContext } from "react";

const ModalContext = createContext();

function Modal({ children, isOpen, onClose }) {
  const dialogRef = useRef(null);

  // Sync prop with native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ onClose }}>
      <dialog
        ref={dialogRef}
        className=" m-auto backdrop:backdrop-blur backdrop:bg-pink-600/20 rounded-lg p-4 "
        onClose={onClose}
      >
        <div className="relative z-50 cursor-pointer">{children}</div>
      </dialog>
    </ModalContext.Provider>
  );
}

function Close({ children }) {
  const { onClose } = useContext(ModalContext);
  return <span onClick={onClose}>{children}</span>;
}

function Content({ children }) {
  return <>{children}</>;
}

Modal.Close = Close;
Modal.Content = Content;

export default Modal;
