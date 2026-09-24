import { useSearchParams } from "react-router-dom";
import TaskTableOperations from "../features/tasks/TaskTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddTask from "../features/tasks/AddTask";
import { useEffect, useState } from "react";
import { getStorageData } from "../data/helpers";
import TaskTable from "../features/tasks/TaskTable";
import Spinner from "../ui/Spinner";

const title = {
  all: "All tasks",
  "to-do": "To Do Tasks",
  "in-progress": "In progress Tasks",
  done: "Done Tasks",
};

function Tasks() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    id: "u1",
  };
  const currentStatus = searchParams.get("status") || "all";
  const currentPriority = searchParams.get("priority") || "all";
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  const heading = title[currentStatus] || "All tasks";

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
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <Row type="horizontal">
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
          tasks={filterTasks}
          projects={projects}
          currentUser={currentUser}
          onUpdate={loadData}
        />
      )}
    </div>
  );
}

export default Tasks;
