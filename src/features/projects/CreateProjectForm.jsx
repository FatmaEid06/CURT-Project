import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { getStorageData, setStorageData } from "../../data/helpers";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateProjectForm({ onCloseModal, onUpdate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    id: "u1",
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      try {
        const projects = getStorageData("projects", []);
        const newProject = {
          id: `p-${Date.now()}`,
          name: name.trim(),
          description: description.trim(),
          ownerId: currentUser.id,
          members: [currentUser.id],
        };

        setStorageData("projects", [...projects, newProject]);
        toast.success("Project added successfully");
        onUpdate?.();
        onCloseModal?.();
      } catch (err) {
        toast.error("Failed to add the project");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);
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
          placeholder="e.g. FSAE 2027 Chassis"
        />
      </FormRow>

      <FormRow label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[0.8rem_1.2rem] text-[1.4rem]"
          rows="3"
          placeholder="Brief scope of work..."
        />
      </FormRow>

      <FormRow orientation="horizontal">
        <Button variant="secondary" type="button" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {isLoading ? <SpinnerMini /> : "Create Project"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProjectForm;
