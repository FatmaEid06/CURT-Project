import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ className = "" }) {
  return (
    <BiLoaderAlt
      className={`w-[1.6rem] h-[1.6rem] md:w-[2.4rem] md:h-[2.4rem] animate-spin shrink-0 ${className}`}
    />
  );
}

export default SpinnerMini;
