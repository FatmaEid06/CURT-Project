import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateTaskForm from "./CreateTaskForm";
function AddTask({ onUpdate }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="task-form">
          <Button>Add Task</Button>
        </Modal.Open>

        <Modal.Window name="task-form">
          <CreateTaskForm onUpdate={onUpdate} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTask;
