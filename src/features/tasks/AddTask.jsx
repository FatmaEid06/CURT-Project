import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateTaskForm from "./CreateTaskForm";
function AddTask() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="task-form">
          <Button>Add Task</Button>
        </Modal.Open>

        <Modal.Window name="task-form">
          <CreateTaskForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTask;
