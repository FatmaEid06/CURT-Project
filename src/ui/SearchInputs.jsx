import { useSearchParams } from "react-router-dom";

function SearchInput({ field = "search", placeholder = "Search..." }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) params.set(field, value);
    else params.delete(field);
    setSearchParams(params, { replace: true });
  }

  return (
    <input
      type="search"
      value={searchParams.get(field) || ""}
      onChange={handleChange}
      placeholder={placeholder}
      className="border border-[var(--color-grey-100)] bg-[var(--color-grey-0)] shadow-[var(--shadow-sm)] rounded-[var(--border-radius-sm)] py-[0.8rem] px-[1.2rem] text-[1.4rem] w-[24rem]"
    />
  );
}

export default SearchInput;
