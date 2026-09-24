import { useSearchParams } from "react-router-dom";
import TaskTableOperations from "../features/tasks/TaskTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddTask from "../features/tasks/AddTask";
import { useEffect, useState } from "react";
import { getStorageData } from "../data/helpers";
import TaskTable from "../features/tasks/TaskTable";
import Spinner from "../ui/Spinner";

const statusLabels = {
  "to-do": "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

function Tasks() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    id: "u1",
  };

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const currentStatus = searchParams.get("status") || "all";
  const currentPriority = searchParams.get("priority") || "all";
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  let heading = "All Tasks";
  const isStatusAll = currentStatus === "all";
  const isPriorityAll = currentPriority === "all";

  if (!isStatusAll && !isPriorityAll) {
    heading = `${statusLabels[currentStatus]} & ${priorityLabels[currentPriority]} Tasks`;
  } else if (!isStatusAll) {
    heading = `${statusLabels[currentStatus]} Tasks`;
  } else if (!isPriorityAll) {
    heading = `${priorityLabels[currentPriority]} Priority Tasks`;
  }

  function loadData() {
    setTasks(getStorageData("tasks", []));
    setProjects(getStorageData("projects", []));
  }
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filterTasks = tasks.filter(
    (task) =>
      (currentStatus === "all" || task.status === currentStatus) &&
      (currentPriority === "all" || task.priority === currentPriority) &&
      (!searchQuery || task.title.toLowerCase().includes(searchQuery)),
  );

  const paginatedTasks = filterTasks.slice(
    (currentPage - 1) * 5,
    currentPage * 5,
  );

  return (
    <div className="flex flex-col gap-[2rem]">
      <Row type="vertical">
        <Heading as="h1">{heading}</Heading>
        <TaskTableOperations />
      </Row>

      <Row type="horizontal">
        <AddTask onUpdate={loadData} />
      </Row>

      {isLoading ? (
        <Spinner />
      ) : (
        <TaskTable
          tasks={paginatedTasks}
          projects={projects}
          currentUser={currentUser}
          onUpdate={loadData}
          count={filterTasks.length}
        />
      )}
    </div>
  );
}

export default Tasks;
