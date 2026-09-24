import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { MdAddTask } from "react-icons/md";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/home", label: "Home", Icon: FaHome },
  { to: "/projects", label: "Projects", Icon: GoProjectRoadmap },
  { to: "/tasks", label: "Tasks", Icon: MdAddTask },
  { to: "/profile", label: "Profile", Icon: CgProfile },
];

const linkStyle = ({ isActive }) =>
  `flex items-center justify-center gap-[1rem] py-[1rem] px-[0.6rem]
   md:justify-start md:py-[1.5rem] md:px-[1.2rem]
   text-[1.8rem] font-medium transition-all duration-300 ${
     isActive
       ? "text-[var(--color-grey-800)] bg-[var(--color-grey-50)] rounded-[var(--border-radius-sm)]"
       : "text-[var(--color-grey-600)] hover:text-[var(--color-grey-800)] hover:bg-[var(--color-grey-50)] hover:rounded-[var(--border-radius-sm)]"
   }`;

const iconStyle = (isActive) =>
  `w-[2.4rem] h-[2.4rem] shrink-0 transition-all duration-300 ${
    isActive ? "text-[var(--color-brand-600)]" : "text-[var(--color-grey-400)]"
  }`;

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        {links.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={linkStyle}
              title={label}
              aria-label={label}
            >
              {({ isActive }) => (
                <>
                  <Icon className={iconStyle(isActive)} />
                  <span className="hidden md:inline">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
