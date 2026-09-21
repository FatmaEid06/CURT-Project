import { getStorageData } from "../data/helpers";

function Header() {
  const currentUser = getStorageData("currentUser", null);
  return (
    <header className="bg-[var(--color-grey-0)] py-[1.2rem] px-[4.8rem] border-b border-[var(--color-grey-100)] flex gap-[2.4rem] items-center justify-end">
      <p> {currentUser.name}👋</p>
    </header>
  );
}

export default Header;
