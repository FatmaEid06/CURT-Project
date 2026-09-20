import { useSearchParams } from "react-router-dom";
import TaskTableOperations from "../features/tasks/TaskTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddTask from "../features/tasks/AddTask";

const title = {
  all: "All tasks",
  "to-do": "To Do Tasks",
  "in-progress": "In progress Tasks",
  done: "Done Tasks",
};

function Tasks() {
  const [searchParams] = useSearchParams();
  const currentTitle = searchParams.get("status");

  const heading = title[currentTitle] || "All tasks";
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">{heading}</Heading>
        <TaskTableOperations />
      </Row>
      <Row>
        <AddTask />
      </Row>
    </>
  );
}

export default Tasks;
