import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / 5);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[1.4rem] ml-[0.8rem]">
        Showing{" "}
        <span className="font-semibold">{(currentPage - 1) * 5 + 1}</span> to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * 5}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-[0.6rem]">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="border-none rounded-[var(--border-radius-sm)] font-medium text-[1.4rem] flex items-center justify-center gap-[0.4rem] py-[0.6rem] px-[1.2rem] pr-[0.4rem] bg-[var(--color-grey-50)] color-inherit transition-all duration-300 hover:not-disabled:bg-[var(--color-brand-600)] hover:not-disabled:text-[var(--color-brand-50)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <HiChevronLeft className="h-[1.8rem] w-[1.8rem]" />
          <span>Previous</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="border-none rounded-[var(--border-radius-sm)] font-medium text-[1.4rem] flex items-center justify-center gap-[0.4rem] py-[0.6rem] px-[1.2rem] pl-[0.4rem] bg-[var(--color-grey-50)] color-inherit transition-all duration-300 hover:not-disabled:bg-[var(--color-brand-600)] hover:not-disabled:text-[var(--color-brand-50)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>Next</span>
          <HiChevronRight className="h-[1.8rem] w-[1.8rem]" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
