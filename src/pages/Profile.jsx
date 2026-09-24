import { useState } from "react";
import Heading from "../ui/Heading";
import UpdateUser from "../features/users/UpdateUser";
import { getAssigneeIds, getStorageData } from "../data/helpers";
import Button from "../ui/Button";
import Row from "../ui/Row";
import Modal from "../ui/Modal";

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-[0.4rem] bg-[var(--color-grey-50)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)] py-[1.6rem] px-[2rem]">
      <span className="text-[2.8rem] font-semibold text-[var(--color-grey-900)] leading-none">
        {value}
      </span>
      <span className="text-[1.3rem] text-[var(--color-grey-500)]">
        {label}
      </span>
    </div>
  );
}

function Profile() {
  const [currentUser, setCurrentUser] = useState(() =>
    getStorageData("currentUser", null),
  );

  const projects = getStorageData("projects", []);
  const tasks = getStorageData("tasks", []);

  if (!currentUser) return null;

  const ownedProjects = projects.filter(
    (project) => project.ownerId === currentUser.id,
  );
  const memberProjects = projects.filter(
    (project) =>
      project.ownerId !== currentUser.id &&
      project.members?.includes(currentUser.id),
  );
  const myTasks = tasks.filter((task) =>
    getAssigneeIds(task).includes(currentUser.id),
  );
  const countByStatus = (status) =>
    myTasks.filter((task) => task.status === status).length;

  function loadUser() {
    setCurrentUser(getStorageData("currentUser", null));
  }

  return (
    <div className="flex flex-col gap-[3.2rem]">
      <Row type="horizontal">
        <Heading as="h1">My profile</Heading>

        <Modal>
          <Modal.Open opens="update-user">
            <Button>Update account</Button>
          </Modal.Open>
          <Modal.Window name="update-user">
            <UpdateUser onUpdate={loadUser} />
          </Modal.Window>
        </Modal>
      </Row>

      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-100)] rounded-[var(--border-radius-md)] p-[2.4rem] flex flex-col gap-[2.4rem]">
        <div className="flex items-center gap-[1.6rem]">
          <div className="w-[6.4rem] h-[6.4rem] rounded-full bg-[var(--color-brand-600)] text-[var(--color-brand-50)] flex items-center justify-center text-[2.6rem] font-semibold shrink-0">
            {currentUser.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-[2rem] font-semibold text-[var(--color-grey-900)]">
              {currentUser.name}
            </span>
            <span className="text-[1.4rem] text-[var(--color-grey-500)]">
              {currentUser.email}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-[1.6rem]">
          <Stat label="Projects I own" value={ownedProjects.length} />
          <Stat
            label="Projects I'm a member of"
            value={memberProjects.length}
          />
          <Stat label="Tasks to do" value={countByStatus("to-do")} />
          <Stat
            label="Tasks in progress"
            value={countByStatus("in-progress")}
          />
          <Stat label="Tasks done" value={countByStatus("done")} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
