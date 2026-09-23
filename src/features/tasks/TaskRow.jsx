import toast from "react-hot-toast";
import { getStorageData, setStorageData } from "../../data/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiCheckCircle, HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";

function TaskRow({ task, onUpdate, project, currentUser }) {
  const users = getStorageData("users", []);
  const asignee = users.find((user) => user.id === task.assignedTo);

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
    <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-[2.4rem] items-center py-[1.6rem] px-[2.4rem] bg-[var(--color-grey-0)] border-b border-[var(--color-grey-100)] text-[1.4rem]">
      <span className="font-semibold text-[var(--color-grey-900)]">
        {task.title}
      </span>
      <span className="text-[var(--color-grey-600)] capitalize">
        {task.status}
      </span>
      <span className="text-[var(--color-grey-600)] capitalize">
        {task.priority}
      </span>
      <span className="text-[var(--color-grey-600)]">
        {asignee?.name || "Unassigned"}
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
                onClick={() => navigate(`tasks/${task.id}`)}
              >
                See details
              </Menus.Button>
              {isOwner && (
                <>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>
                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </>
              )}
            </Menus.List>
          </Menus.Menu>
        </Menus>

        <Modal.Window name="delete">
          <ConfirmDelete resourceName="task" onConfirm={handleDelete} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default TaskRow;
