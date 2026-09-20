import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { getStorageData, setStorageData } from "../../data/helpers";

function CreateTaskForm({ onCloseModal, defaultProjectId = "" }) {
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !projectId) {
      setError("Task title and project are required.");
      return;
    }

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

    if (onCloseModal) onCloseModal();
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
        <Select
          type="white"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          options={users.map((u) => ({ value: u.id, label: u.name }))}
        />
      </FormRow>

      <FormRow orientation="horizontal">
        <Button variant="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save Task
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateTaskForm;
