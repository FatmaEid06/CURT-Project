import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <div className="grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <SideBar />
      <main className="bg-[var(--color-grey-50)] p-[4rem_4.8rem_6.4rem] overflow-scroll">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
