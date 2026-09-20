import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
function TaskTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterfield="status"
        options={[
          { value: "all", label: "All" },
          { value: "to-do", label: "To Do" },
          {
            value: "in-progress",
            label: "In Progress",
          },
          { value: "done", label: "Done" },
        ]}
      />
    </TableOperations>
  );
}

export default TaskTableOperations;
