import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { getStorageData, setStorageData } from "../../data/helpers";
import toast from "react-hot-toast";

const inputStyle =
  "border border-[var(--color-grey-300)] rounded-[var(--border-radius-sm)] p-[0.8rem_1.2rem] text-[1.4rem]";

function UpdateUser({ onUpdate, onCloseModal }) {
  const currentUser = getStorageData("currentUser", null);

  const [name, setName] = useState(currentUser?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const hasChanges = name.trim() !== currentUser?.name || password !== "";

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";

    if (password && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const users = getStorageData("users", []);
      const storedUser = users.find((u) => u.id === currentUser.id);

      const updatedUser = {
        ...storedUser,
        name: name.trim(),
        // leave the password field empty to keep the old password
        password: password || storedUser?.password || currentUser.password,
      };

      setStorageData(
        "users",
        users.map((u) => (u.id === currentUser.id ? updatedUser : u)),
      );
      setStorageData("currentUser", updatedUser);

      setPassword("");
      setConfirmPassword("");
      toast.success("Profile updated successfully");

      // let the Header know the name changed
      window.dispatchEvent(new Event("user-updated"));
      onUpdate?.();
      onCloseModal?.();
    } catch (err) {
      toast.error("Profile can't be updated");
      console.log(err);
    }
  }

  function handleReset() {
    setName(currentUser?.name || "");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit} type="regular" className="w-[60rem]">
      <FormRow label="Full name" error={errors.name}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputStyle}
        />
      </FormRow>

      <FormRow label="Email address">
        <input
          type="email"
          value={currentUser?.email || ""}
          disabled
          readOnly
          className={`${inputStyle} bg-[var(--color-grey-100)] text-[var(--color-grey-500)] cursor-not-allowed`}
        />
      </FormRow>

      <FormRow label="New password (optional)">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave empty to keep the current one"
          className={inputStyle}
        />
      </FormRow>

      <FormRow label="Confirm new password" error={errors.confirmPassword}>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={!password}
          className={inputStyle}
        />
      </FormRow>

      <FormRow orientation="horizontal">
        <Button variant="secondary" type="button" onClick={handleReset}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={!hasChanges || !name.trim()}
        >
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUser;
