import { useState } from "react";
import {
  getAssigneeIds,
  getStorageData,
  setStorageData,
} from "../../data/helpers";
import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

function EditTaskForm({ task, onCloseModal, onUpdate }) {
  const projects = getStorageData("projects", []);
  const users = getStorageData("users", []);
  const project = projects.find((p) => p.id === task.projectId);

  const currentIds = getAssigneeIds(task);
  const assigneeOptions = users.filter(
    (u) => project?.members?.includes(u.id) || currentIds.includes(u.id),
  );

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || "");
  const [error, setError] = useState("");

  function toggleAssignee(userId) {
    setAssignedTo((cur) =>
      cur.includes(userId)
        ? cur.filter((id) => id !== userId)
        : [...cur, userId],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      const tasks = getStorageData("tasks", []);
      const updatedTasks = tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              title: title.trim(),
              description: description.trim(),
              priority,
              status,
              assignedTo,
            }
          : t,
      );
      setStorageData("tasks", updatedTasks);
      toast.success("Task updated successfully");
      onUpdate?.();
      onCloseModal?.();
    } catch (err) {
      toast.error("Task can't be updated");
      console.log(err);
    }
  }

  return (
    <Form onSubmit={handleSubmit} type="regular" className="w-[55rem]">
      <FormRow label="Task Title" error={error}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) setError("");
          }}
          className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[0.8rem_1.2rem] text-[1.4rem]"
        />
      </FormRow>

      <FormRow label="Project">
        <span className="text-[var(--color-grey-600)]">
          {project?.name || "Unknown"}
        </span>
      </FormRow>

      <FormRow label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[0.8rem_1.2rem] text-[1.4rem]"
          rows="2"
        />
      </FormRow>

      <FormRow label="Priority">
        <Select
          type="white"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />
      </FormRow>

      <FormRow label="Status">
        <Select
          type="white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: "to-do", label: "To Do" },
            { value: "in-progress", label: "In Progress" },
            { value: "done", label: "Done" },
          ]}
        />
      </FormRow>

      <FormRow label="Assign To">
        <div className="flex flex-col gap-[0.8rem]">
          {assigneeOptions.length === 0 && (
            <span className="text-[var(--color-grey-500)]">
              This project has no members.
            </span>
          )}
          {assigneeOptions.map((user) => (
            <label
              key={user.id}
              className="flex items-center gap-[0.8rem] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={assignedTo.includes(user.id)}
                onChange={() => toggleAssignee(user.id)}
              />
              <span>{user.name}</span>
            </label>
          ))}
        </div>
      </FormRow>

      <FormRow orientation="horizontal">
        <Button variant="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={!title.trim()}>
          Save Changes
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditTaskForm;
