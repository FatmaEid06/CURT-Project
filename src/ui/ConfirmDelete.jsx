import Button from "./Button";
import Heading from "./Heading";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="w-[40rem] flex flex-col gap-[1.2rem]">
      <Heading as="h3">Delete {resourceName}</Heading>
      <p className="text-[var(--color-grey-500)] mb-[1.2rem] text-[1.4rem]">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-[1.2rem]">
        <Button variant="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
