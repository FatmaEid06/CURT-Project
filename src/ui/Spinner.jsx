export default function Spinner() {
  return (
    <div
      className="my-[4.8rem] mx-auto w-[6.4rem] aspect-square rounded-full animate-[spin_1.5s_linear_infinite]"
      style={{
        background:
          "radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, var(--color-brand-600))",
        WebkitMaskImage:
          "radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)",
      }}
    />
  );
}
