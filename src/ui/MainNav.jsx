import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { MdAddTask } from "react-icons/md";
import { NavLink } from "react-router-dom";
const linkStyle = ({ isActive }) =>
  `flex items-center gap-[1.2rem] text-[1.6rem] font-medium py-[1.2rem] px-[2.4rem] transition-all duration-300 ${
    isActive
      ? "text-[var(--color-grey-800)] bg-[var(--color-grey-50)] rounded-[var(--border-radius-sm)]"
      : "text-[var(--color-grey-600)] hover:text-[var(--color-grey-800)] hover:bg-[var(--color-grey-50)] hover:rounded-[var(--border-radius-sm)]"
  }`;

const iconStyle = (isActive) =>
  `w-[2.4rem] h-[2.4rem] transition-all duration-300 ${
    isActive ? "text-[var(--color-brand-600)]" : "text-[var(--color-grey-400)]"
  }`;
function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        <li>
          <NavLink to="/home" className={linkStyle}>
            {({ isActive }) => (
              <>
                <FaHome className={iconStyle(isActive)} />
                <span>Home</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={linkStyle}>
            {({ isActive }) => (
              <>
                <GoProjectRoadmap className={iconStyle(isActive)} />
                <span>Projects</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={linkStyle}>
            {({ isActive }) => (
              <>
                <MdAddTask className={iconStyle(isActive)} />
                <span>Tasks</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={linkStyle}>
            {({ isActive }) => (
              <>
                <CgProfile className={iconStyle(isActive)} />
                <span>Profile</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
