import toast from "react-hot-toast";
import {
  getAssigneeIds,
  getStorageData,
  setStorageData,
} from "../../data/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiCheckCircle, HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import EditTaskForm from "./EditTaskForm";
import Tag from "../../ui/Tag";

function TaskRow({ task, onUpdate, project, currentUser }) {
  const users = getStorageData("users", []);
  const assigneeIds = getAssigneeIds(task);
  const assigneeNames = users
    .filter((user) => assigneeIds.includes(user.id))
    .map((user) => user.name)
    .join(", ");

  const isOwner = project?.ownerId === currentUser?.id;
  const isAsignee = currentUser?.id === task.assignedTo;
  const canUpdateStatus = isOwner || isAsignee;

  const navigate = useNavigate();
  function handleDelete() {
    try {
      const tasks = getStorageData("tasks", []);
      const updatedTasks = tasks.filter((curtask) => curtask.id !== task.id);
      setStorageData("tasks", updatedTasks);
      onUpdate?.();
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Task can't be deleted");
      console.log(err);
    }
  }

  function handleStatus(newStat) {
    try {
      const tasks = getStorageData("tasks", []);
      const changedTasks = tasks.map((curTask) =>
        curTask?.id === task?.id ? { ...curTask, status: newStat } : curTask,
      );

      setStorageData("tasks", changedTasks);
      onUpdate?.();
      toast.success(`task stautus successfully ipdated to ${newStat}`);
    } catch (err) {
      toast.error("Task status can't be updated");
      console.log(err);
    }
  }

  return (
    <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-[7.4rem] items-center py-[2.6rem] px-[2.4rem] bg-[var(--color-grey-0)] border-b border-[var(--color-grey-100)] text-[1.4rem]">
      <span className="font-semibold text-[var(--color-grey-900)]">
        {task.title}
      </span>
      <Tag type="status" value={task.status} />
      <Tag type="priority" value={task.priority} />
      <span className="text-[var(--color-grey-600)]">
        {assigneeNames || "Unassigned"}
      </span>

      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={task.id} />
            <Menus.List id={task.id}>
              {canUpdateStatus && task.status !== "done" && (
                <Menus.Button
                  icon={<HiCheckCircle />}
                  onClick={() => handleStatus("done")}
                >
                  Mark as Done
                </Menus.Button>
              )}

              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                See details
              </Menus.Button>
              {isOwner && (
                <>
                  <Modal.Open opens={`edit-${task.id}`}>
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens={`delete-${task.id}`}>
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </>
              )}
            </Menus.List>
          </Menus.Menu>
        </Menus>
        <Modal.Window name={`edit-${task.id}`}>
          <EditTaskForm task={task} onUpdate={onUpdate} />
        </Modal.Window>

        <Modal.Window name={`delete-${task.id}`}>
          <ConfirmDelete resourceName="task" onConfirm={handleDelete} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default TaskRow;
