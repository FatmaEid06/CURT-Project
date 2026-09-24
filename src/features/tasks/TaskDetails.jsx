import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStorageData, setStorageData } from "../../data/helpers";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);

  const currentUser = getStorageData("currentUser", null);

  function loadData() {
    const tasks = getStorageData("tasks", []);
    const foundTask = tasks.find((t) => t.id === taskId);
    setTask(foundTask || null);
    if (foundTask) {
      const projects = getStorageData("projects", []);
      setProject(projects.find((p) => p.id === foundTask.projectId) || null);
    }
    setUsers(getStorageData("users", []));
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  if (!task) {
    return (
      <div className="text-center py-[4.8rem] flex flex-col items-center gap-[1.6rem]">
        <p className="text-[1.6rem] text-[var(--color-grey-500)]">
          Task not found.
        </p>
        <Button variant="secondary" onClick={() => navigate("/tasks")}>
          &larr; Back to Tasks
        </Button>
      </div>
    );
  }

  const assignee = users.find((u) => u.id === task.assignedTo);
  const isOwner = project?.ownerId === currentUser?.id;

  function handleDelete() {
    try {
      const tasks = getStorageData("tasks", []);
      setStorageData(
        "tasks",
        tasks.filter((t) => t.id !== task.id),
      );
      toast.success("Task deleted successfully");
      navigate("/tasks", { replace: true });
    } catch (err) {
      toast.error("Task can't be deleted");
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col gap-[3.2rem]">
      <Row type="horizontal">
        <div>
          <button
            onClick={() => navigate("/tasks")}
            className="text-[1.4rem] text-[var(--color-brand-600)] hover:underline bg-transparent border-none cursor-pointer mb-[0.8rem]"
          >
            &larr; Back to Tasks
          </button>
          <Heading as="h1">{task.title}</Heading>
        </div>

        {isOwner && (
          <Modal>
            <Modal.Open opens="delete-task">
              <Button variant="danger">Delete Task</Button>
            </Modal.Open>
            <Modal.Window name="delete-task">
              <ConfirmDelete resourceName="task" onConfirm={handleDelete} />
            </Modal.Window>
          </Modal>
        )}
      </Row>

      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)] p-[2.4rem] flex flex-col gap-[1.6rem] text-[1.4rem]">
        <p className="text-[var(--color-grey-600)]">
          {task.description || "No description provided."}
        </p>
        <p>
          <span className="font-semibold">Project: </span>
          {project?.name || "Unknown"}
        </p>
        <p className="capitalize">
          <span className="font-semibold">Priority: </span>
          {task.priority}
        </p>
        <p className="capitalize">
          <span className="font-semibold">Status: </span>
          {task.status}
        </p>
        <p>
          <span className="font-semibold">Assigned to: </span>
          {assignee?.name || "Unassigned"}
        </p>
      </div>
    </div>
  );
}

export default TaskDetails;
