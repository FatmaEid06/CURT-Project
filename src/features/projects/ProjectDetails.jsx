import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStorageData, setStorageData } from "../../data/helpers";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import TaskTable from "../tasks/TaskTable";
import Spinner from "../../ui/Spinner";

function ProjectDetails() {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const currentUser = getStorageData("currentUser", null);

  function loadData() {
    const projects = getStorageData("projects", []);
    setProject(projects.find((p) => p.id === projectId) || null);
    setTasks(
      getStorageData("tasks", []).filter((t) => t.projectId === projectId),
    );
    setUsers(getStorageData("users", []));
  }

  useEffect(() => {
    loadData();
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [projectId]);

  if (isLoading) return <Spinner />;

  if (!project) {
    return (
      <div className="text-center py-[4.8rem] flex flex-col items-center gap-[1.6rem]">
        <p className="text-[1.6rem] text-[var(--color-grey-500)]">
          Project not found.
        </p>
        <Button variant="secondary" onClick={() => navigate("/projects")}>
          &larr; Back to Projects
        </Button>
      </div>
    );
  }

  const owner = users.find((u) => u.id === project.ownerId);
  const members = users.filter((u) => project.members?.includes(u.id));
  const isOwner = currentUser?.id === project.ownerId;

  function handleDelete() {
    try {
      const projects = getStorageData("projects", []);
      setStorageData(
        "projects",
        projects.filter((p) => p.id !== project.id),
      );
      toast.success("Project deleted successfully");
      navigate("/projects", { replace: true });
    } catch (err) {
      toast.error("Project can't be deleted");
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col gap-[3.2rem]">
      <Row type="horizontal">
        <div>
          <button
            onClick={() => navigate("/projects")}
            className="text-[1.4rem] text-[var(--color-brand-600)] hover:underline bg-transparent border-none cursor-pointer mb-[0.8rem]"
          >
            &larr; Back to Projects
          </button>
          <Heading as="h1">{project.name}</Heading>
        </div>

        {isOwner && (
          <Modal>
            <Modal.Open opens="delete-project">
              <Button variant="danger">Delete Project</Button>
            </Modal.Open>
            <Modal.Window name="delete-project">
              <ConfirmDelete resourceName="project" onConfirm={handleDelete} />
            </Modal.Window>
          </Modal>
        )}
      </Row>

      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)] p-[2.4rem] flex flex-col gap-[1.2rem] text-[1.4rem]">
        <p className="text-[var(--color-grey-600)]">
          {project.description || "No description provided."}
        </p>
        <p>
          <span className="font-semibold">Owner: </span>
          {owner?.name || "Unknown"}
        </p>
        <p>
          <span className="font-semibold">Members: </span>
          {members.map((m) => m.name).join(", ") || "No members"}
        </p>
      </div>

      <div>
        <Heading as="h2">Tasks in this project</Heading>
        <div className="mt-[1.6rem]">
          <TaskTable
            tasks={tasks}
            projects={[project]}
            currentUser={currentUser}
            onUpdate={loadData}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
