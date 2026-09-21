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
    <aside className="bg-[var(--color-grey-0)] py-[3.2rem] px-[2.4rem] border-r border-[var(--color-grey-100)] [grid-row:1/-1] flex flex-col gap-[3.2rem]">
      <MainNav />
      <div className="mt-auto pt-[2rem] border-t border-[var(--color-grey-100)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-[1.2rem] text-[1.6rem] font-medium py-[1.2rem] px-[2.4rem] text-[var(--color-grey-600)] hover:text-[var(--color-grey-800)] hover:bg-[var(--color-grey-50)] rounded-[var(--border-radius-sm)] transition-all duration-300 cursor-pointer"
        >
          <HiArrowRightOnRectangle className="w-[2.4rem] h-[2.4rem] text-[var(--color-grey-400)]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
