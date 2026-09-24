const styles = {
  status: {
    "to-do": "bg-slate-100 text-slate-700",
    "in-progress": "bg-indigo-100 text-indigo-700",
    done: "bg-green-100 text-green-700",
  },
  priority: {
    low: "bg-sky-100 text-sky-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  },
};

const labels = {
  "to-do": "To Do",
  "in-progress": "In Progress",
  done: "Done",
  low: "Low",
  medium: "Medium",
  high: "High",
};

function Tag({ type, value }) {
  const color =
    styles[type]?.[value] ||
    "bg-[var(--color-grey-100)] text-[var(--color-grey-600)]";

  return (
    <span
      className={`inline-block w-fit rounded-full py-[0.4rem] px-[1.2rem] text-[1.2rem] font-semibold whitespace-nowrap ${color}`}
    >
      {labels[value] || value}
    </span>
  );
}

export default Tag;
