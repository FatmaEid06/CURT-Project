import { HiArrowRightOnRectangle } from "react-icons/hi2";
import MainNav from "./MainNav";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  }

  return (
    <aside
      className="
    col-start-1 row-start-1 row-span-2
    flex flex-col gap-[0.4rem]
    bg-[var(--color-grey-0)] border-r border-[var(--color-grey-100)]
    px-[0.6rem] py-[1.6rem] md:px-[1rem] md:py-[2.4rem]
    overflow-y-auto
  "
    >
      <MainNav />

      <div className="mt-auto pt-[1.2rem] border-t border-[var(--color-grey-100)]">
        <button
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="
        w-full flex items-center justify-center gap-[1rem]
        py-[1rem] px-[0.6rem] md:justify-start md:py-[1.2rem] md:px-[1.2rem]
        text-[1.5rem] font-medium
        text-[var(--color-grey-600)] hover:text-[var(--color-grey-800)]
        hover:bg-[var(--color-grey-50)] rounded-[var(--border-radius-sm)]
        transition-all duration-300 cursor-pointer
      "
        >
          <HiArrowRightOnRectangle className="w-[2.4rem] h-[2.4rem] text-[var(--color-grey-400)] shrink-0" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
