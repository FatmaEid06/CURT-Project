function Row({ type = "horizontal", children }) {
  const types = {
    horizontal: "flex justify-between items-center",
    vertical: "flex flex-col gap-[1.6rem]",
  };

  return <div className={types[type] || types.vertical}>{children}</div>;
}

export default Row;
