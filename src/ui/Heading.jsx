function Heading({ as: Component = "h1", children }) {
  const styles = {
    h1: "text-[3rem] font-semibold leading-[1.4]",
    h2: "text-[2rem] font-semibold leading-[1.4]",
    h3: "text-[2rem] font-medium leading-[1.4]",
    h4: "text-[3rem] font-semibold text-center leading-[1.4]",
  };

  return (
    <Component className={styles[Component] || styles.h1}>{children}</Component>
  );
}

export default Heading;
