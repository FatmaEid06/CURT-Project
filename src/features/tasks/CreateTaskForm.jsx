import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { getStorageData, setStorageData } from "../../data/helpers";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateTaskForm({ onCloseModal, defaultProjectId = "", onUpdate }) {
  const projects = getStorageData("projects", []);
  const users = getStorageData("users", []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(
    defaultProjectId || (projects[0]?.id ?? ""),
  );
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("to-do");
  const [assignedTo, setAssignedTo] = useState(users[0]?.id ?? "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedProject = projects.find((p) => p.id === projectId);
  const assigneeOptions = users.filter((u) =>
    selectedProject?.members?.includes(u.id),
  );

  function toggleAssignee(userId) {
    setAssignedTo((cur) =>
      cur.includes(userId)
        ? cur.filter((id) => id !== userId)
        : [...cur, userId],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !projectId) {
      setError("Task title and project are required.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      try {
        const tasks = getStorageData("tasks", []);
        const newTask = {
          id: `t-${Date.now()}`,
          projectId,
          title: title.trim(),
          description: description.trim(),
          status,
          priority,
          assignedTo,
        };

        setStorageData("tasks", [...tasks, newTask]);
        toast.success("Task added successfully");
        onUpdate?.();
        onCloseModal?.();
      } catch (err) {
        toast.error("Task can't be added");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }

  return (
    <Form onSubmit={handleSubmit} type="regular" className="w-[55rem]">
      <FormRow
        label="Task Title"
        error={error && !title.trim() ? "Title required" : ""}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[0.8rem_1.2rem] text-[1.4rem]"
          placeholder="e.g. Simulate front wing flow"
        />
      </FormRow>

      <FormRow label="Project">
        <Select
          type="white"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          options={projects.map((p) => ({ value: p.id, label: p.name }))}
        />
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
        <Button variant="primary" type="submit">
          {isLoading ? <SpinnerMini /> : "Save Task"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateTaskForm;
