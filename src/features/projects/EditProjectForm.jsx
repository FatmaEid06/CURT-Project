import { useState } from "react";
import { getStorageData, setStorageData } from "../../data/helpers";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

function EditProjectForm({ project, onCloseModal, onUpdate }) {
  const users = getStorageData("users", []);

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");
  const [members, setMembers] = useState(project.members || [project.ownerId]);
  const [error, setError] = useState("");

  function toggleMember(userId) {
    // the owner can never be removed from their own project
    if (userId === project.ownerId) return;
    setMembers((cur) =>
      cur.includes(userId)
        ? cur.filter((id) => id !== userId)
        : [...cur, userId],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    try {
      const projects = getStorageData("projects", []);
      const updatedProjects = projects.map((p) =>
        p.id === project.id
          ? {
              ...p,
              name: name.trim(),
              description: description.trim(),
              members,
            }
          : p,
      );
      setStorageData("projects", updatedProjects);

      // tasks assigned to a removed member become unassigned
      const tasks = getStorageData("tasks", []);
      const updatedTasks = tasks.map((t) =>
        t.projectId === project.id &&
        t.assignedTo &&
        !members.includes(t.assignedTo)
          ? { ...t, assignedTo: "" }
          : t,
      );
      setStorageData("tasks", updatedTasks);

      toast.success("Project updated successfully");
      onUpdate?.();
      onCloseModal?.();
    } catch (err) {
      toast.error("Project can't be updated");
      console.log(err);
    }
  }

  return (
    <Form onSubmit={handleSubmit} type="regular" className="w-[50rem]">
      <FormRow label="Project Name" error={error}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim()) setError("");
          }}
          className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[0.8rem_1.2rem] text-[1.4rem]"
        />
      </FormRow>

      <FormRow label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[0.8rem_1.2rem] text-[1.4rem]"
          rows="3"
        />
      </FormRow>

      <FormRow label="Members">
        <div className="flex flex-col gap-[0.8rem]">
          {users.map((user) => (
            <label
              key={user.id}
              className="flex items-center gap-[0.8rem] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={members.includes(user.id)}
                disabled={user.id === project.ownerId}
                onChange={() => toggleMember(user.id)}
              />
              <span>
                {user.name}
                {user.id === project.ownerId && " (Owner)"}
              </span>
            </label>
          ))}
        </div>
      </FormRow>

      <FormRow orientation="horizontal">
        <Button variant="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={!name.trim()}>
          Save Changes
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditProjectForm;
