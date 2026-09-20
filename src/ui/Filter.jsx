import { useSearchParams } from "react-router-dom";

function Filter({ filterfield, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterfield) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterfield, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  return (
    <div className="border border-[var(--color-grey-100)] bg-[var(--color-grey-0)] shadow-[var(--shadow-sm)] rounded-[var(--border-radius-sm)] p-[0.4rem] flex gap-[0.4rem]">
      {options.map((option) => {
        const isActive = option.value === currentFilter;
        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            disabled={isActive}
            className={`border-none rounded-[var(--border-radius-sm)] font-medium text-[1.4rem] py-[0.44rem] px-[0.8rem] transition-all duration-300 ${
              isActive
                ? "bg-[var(--color-brand-600)] text-[var(--color-brand-50)] cursor-default"
                : "bg-[var(--color-grey-0)] hover:bg-[var(--color-brand-600)] hover:text-[var(--color-brand-50)] cursor-pointer"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Filter;
