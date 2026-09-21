import { getStorageData } from "../data/helpers";
import Heading from "../ui/Heading";

function Home() {
  const currentUser = getStorageData("currentUser", []);
  return (
    <div className="flex flex-col gap-[2.4rem] items-center justify-center text-center h-[70vh] ">
      <Heading as="h1">Welcome,{currentUser.name}!☺️</Heading>
      <p className="text-[1.6rem] text-[var(--color-grey-600)]">
        Use the sidebar to manage your projects, assign tasks, and track team
        progress.
      </p>
    </div>
  );
}

export default Home;
