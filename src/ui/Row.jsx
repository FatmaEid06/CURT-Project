function Row({ type = "horizontal", children }) {
  const types = {
    horizontal:
      "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[1.2rem] sm:gap-0 w-full",
    vertical: "flex flex-col gap-[1.2rem] md:gap-[1.6rem] w-full",
  };

  return <div className={types[type] || types.vertical}>{children}</div>;
}

export default Row;
