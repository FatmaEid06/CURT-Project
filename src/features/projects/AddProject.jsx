import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateProjectForm from "./CreateProjectForm";

function AddProject({ onUpdate }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="project-form">
          <Button>Add Project</Button>
        </Modal.Open>

        <Modal.Window name="project-form">
          <CreateProjectForm onUpdate={onUpdate} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddProject;
