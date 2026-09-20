import { useState } from "react";
import Button from "../../ui/Button";

function AddTask() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen((show) => !show)}>Add new task</Button>
    </div>
  );
}

export default AddTask;
