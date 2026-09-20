function Button({
  size = "medium",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const baseStyle =
    "rounded-[var(--border-radius-sm)] shadow-[var(--shadow-sm)] cursor-pointer transition-all";

  const sizeStyles = {
    small:
      "text-[1.2rem] py-[0.4rem] px-[0.8rem] uppercase font-semibold text-center",
    medium: "text-[1.4rem] py-[1.2rem] px-[1.6rem] font-medium",
    large: "text-[1.6rem] py-[1.2rem] px-[2.4rem] font-medium",
  };

  const variationStyles = {
    primary:
      "text-[var(--color-brand-50)] bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] border-none",
    secondary:
      "text-[var(--color-grey-600)] bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] hover:bg-[var(--color-grey-50)]",
    danger:
      "text-[var(--color-red-100)] bg-[var(--color-red-700)] hover:bg-[var(--color-red-800)] border-none",
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size] || sizeStyles.medium} ${
        variationStyles[variant] || variationStyles.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
