import Filter from "../../ui/Filter";
import SearchInput from "../../ui/SearchInputs";
import TableOperations from "../../ui/TableOperations";
function TaskTableOperations() {
  return (
    <TableOperations>
      <SearchInput field="search" placeholder="Search tasks by title..." />

      <Filter
        filterfield="status"
        options={[
          { value: "all", label: "All" },
          { value: "to-do", label: "To Do" },
          { value: "in-progress", label: "In Progress" },
          { value: "done", label: "Done" },
        ]}
      />

      <Filter
        filterfield="priority"
        options={[
          { value: "all", label: "All" },
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
      />
    </TableOperations>
  );
}

export default TaskTableOperations;
