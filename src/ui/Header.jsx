import { useEffect, useState } from "react";
import { getStorageData } from "../data/helpers";

function Header() {
  const [currentUser, setCurrentUser] = useState(() =>
    getStorageData("currentUser", null),
  );

  useEffect(function () {
    function refresh() {
      setCurrentUser(getStorageData("currentUser", null));
    }
    window.addEventListener("user-updated", refresh);
    return () => window.removeEventListener("user-updated", refresh);
  }, []);

  return (
    <header className="bg-[var(--color-grey-0)] py-[1.2rem] px-[4.8rem] border-b border-[var(--color-grey-100)] flex gap-[2.4rem] items-center justify-end">
      <p> {currentUser?.name}👋</p>
    </header>
  );
}

export default Header;
