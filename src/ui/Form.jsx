function Form({ type = "regular", children, className = "", ...props }) {
  const baseStyle = "overflow-hidden text-[1.4rem]";

  const typeStyles = {
    regular:
      "py-[2.4rem] px-[4rem] bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)]",
    modal: "w-[80rem]",
  };

  return (
    <form
      className={`${baseStyle} ${typeStyles[type] || typeStyles.regular} ${className}`}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
