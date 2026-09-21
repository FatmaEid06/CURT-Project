import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { getStorageData, setStorageData } from "../../data/helpers";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import toast from "react-hot-toast";

function ProjectRow({ project, onUpdate }) {
  const users = getStorageData("users", []);
  const owner = users.find((user) => user.id === project.ownerId);
  const navigate = useNavigate();
  function handleDelete() {
    try {
      const projects = getStorageData("projects", []);
      const currentProjects = projects.filter(
        (curProject) => curProject.id !== project.id,
      );
      setStorageData("projects", currentProjects);
      onUpdate?.();
      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error("Project can't be deleted");
      console.log(err);
    }
  }

  return (
    <div className="grid grid-cols-[1.2fr_2fr_1fr_1fr_1.2rem] gap-[2.4rem] items-center py-[1.6rem] px-[2.4rem] bg-[var(--color-grey-0)] border-b border-[var(--color-grey-100)] text-[1.4rem]">
      <span className="font-semibold text-[var(--color-grey-900)]">
        {project.name}
      </span>
      <span className="text-[var(--color-grey-600)]">
        {owner?.name || "Unassigned"}
      </span>
      <span className="text-[var(--color-grey-600)]">
        {project.members?.length || 1} members
      </span>

      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={project.id} />
            <Menus.List id={project.id}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                See details
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Menus>

        <Modal.Window name="delete">
          <ConfirmDelete resourceName="project" onConfirm={handleDelete} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default ProjectRow;
