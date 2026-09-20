function Select({ options, value, onChange, type = "white", ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`text-[1.4rem] py-[0.8rem] px-[1.2rem] rounded-[var(--border-radius-sm)] bg-[var(--color-grey-0)] font-medium shadow-[var(--shadow-sm)] border ${
        type === "white"
          ? "border-[var(--color-grey-100)]"
          : "border-[var(--color-grey-300)]"
      }`}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
