import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ className = "" }) {
  return (
    <BiLoaderAlt
      className={`w-[2.4rem] h-[2.4rem] animate-spin ${className}`}
    />
  );
}

export default SpinnerMini;
