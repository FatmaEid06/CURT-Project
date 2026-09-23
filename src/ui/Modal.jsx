import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/UseOutSideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}{" "}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-[var(--backdrop-color)] backdrop-blur-[4px] z-[1000] transition-all duration-500">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-grey-0)] rounded-[var(--border-radius-lg)] shadow-[var(--shadow-lg)] p-[3.2rem_4rem] transition-all duration-500"
      >
        <button
          onClick={close}
          className="bg-transparent border-none p-[0.4rem] rounded-[var(--border-radius-sm)] translate-x-[0.8rem] transition-all duration-200 absolute top-[1.2rem] right-[1.9rem] hover:bg-[var(--color-grey-100)] cursor-pointer"
        >
          <HiXMark className="w-[2.4rem] h-[2.4rem] text-[var(--color-grey-500)]" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
