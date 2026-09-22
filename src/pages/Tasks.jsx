import { useSearchParams } from "react-router-dom";
import TaskTableOperations from "../features/tasks/TaskTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddTask from "../features/tasks/AddTask";
import { useEffect, useState } from "react";
import { setStorageData } from "../data/helpers";
import TaskTable from "../features/tasks/TaskTable";

const title = {
  all: "All tasks",
  "to-do": "To Do Tasks",
  "in-progress": "In progress Tasks",
  done: "Done Tasks",
};

function Tasks() {
  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    id: "u1",
  };
  const currentStatus = searchParams.get("status") || "all";

  const currentTitle = searchParams.get("status");

  const heading = title[currentTitle] || "All tasks";

  function loadData() {
    setTasks(setStorageData("tasks", []));
    setProjects(setStorageData("projects", []));
  }
  useEffect(() => {
    loadData();
  }, []);

  const filterTasks =
    currentStatus != "all"
      ? tasks.filter((task) => task.status === currentStatus)
      : tasks;
  return (
    <div className="flex flex-col gap-[3.2rem]">
      <Row type="horizontal">
        <Heading as="h1">{heading}</Heading>
        <TaskTableOperations />
      </Row>

      <Row type="horizontal">
        <AddTask onUpdate={loadData} />
      </Row>

      <TaskTable
        tasks={filterTasks}
        projects={projects}
        currentUser={currentUser}
        onUpdate={loadData}
      />
    </div>
  );
}

export default Tasks;
