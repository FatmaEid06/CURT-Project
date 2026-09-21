import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/UseOutSideClick";

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children} </div>;
}

function Toggle({ id }) {
  const { openId, open, setPosition, close } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <button
      onClick={handleClick}
      className="bg-transparent border-none p-[0.4rem] rounded-[var(--border-radius-sm)] translate-x-[0.8rem] transition-all duration-200 hover:bg-[var(--color-grey-100)] cursor-pointer [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-[var(--color-grey-700)]"
    >
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id || !position) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ right: `${position.x}px`, top: `${position.y}px` }}
      className="fixed bg-[var(--color-grey-0)] shadow-[var(--shadow-md)] rounded-[var(--border-radius-md)] z-[1000] overflow-hidden list-none m-0 p-0 min-w-[15rem]"
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ icon, onClick, children }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick()?.();
    close();
  }
  return (
    <li>
      <button
        onClick={handleClick}
        className="w-full text-left bg-transparent border-none py-[1.2rem] px-[2.4rem] text-[1.4rem] transition-all duration-200 flex items-center gap-[1.6rem] hover:bg-[var(--color-grey-50)] cursor-pointer [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-[var(--color-grey-400)] [&_svg]:transition-all [&_svg]:duration-300"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
