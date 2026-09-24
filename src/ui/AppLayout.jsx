import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <div className="grid grid-cols-[5.2rem_1fr] grid-rows-[auto_1fr] h-screen md:grid-cols-[15rem_1fr]">
      <SideBar />
      <Header />
      <main className="bg-[var(--color-grey-50)] overflow-auto col-start-2 px-[1.6rem] pt-[2rem] pb-[3.2rem] md:px-[4.8rem] md:pt-[4rem] md:pb-[6.4rem]">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
