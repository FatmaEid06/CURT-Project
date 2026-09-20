function FormRow({ label, error, children, orientation = "horizontal" }) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`grid items-center py-[1.2rem] first:pt-0 last:pb-0 ${
        isVertical
          ? "grid-cols-1 gap-[0.8rem]"
          : "grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[var(--color-grey-100)] has-[button]:flex has-[button]:justify-end has-[button]:gap-[1.2rem]"
      }`}
    >
      {label && (
        <label className="font-medium" htmlFor={children?.props?.id}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-[1.4rem] text-[var(--color-red-700)]">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormRow;
