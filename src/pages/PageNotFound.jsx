import { useNavigate } from "react-router-dom";
import Heading from "../ui/Heading";

function useMoveback() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
function PageNotFound() {
  const moveBack = useMoveback();
  return (
    <main className="h-screen bg-[var(--color-grey-50)] flex items-center justify-center p-[4.8rem] ">
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)] p-[4.8rem] flex-[0_1_96rem] text-center [&_h1]:mb-[3.2rem]">
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <button
          onClick={moveBack}
          className="text-[1.4rem] font-medium px-[1.6rem] py-[0.8rem] border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] cursor-pointer hover:bg-[var(--color-grey-150,var(--color-grey-50))] transition-colors"
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
