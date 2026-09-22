import TaskRow from "./TaskRow";

function TaskTable({ tasks = [], projects = [], currentUser, onUpdate }) {
  if (!tasks.length)
    return (
      <p className="text-[1.6rem] text-center text-[var(--color-grey-500)] py-[3.2rem]">
        No tasks found
      </p>
    );
  return (
    <div className="border border-[var(--color-grey-200)] rounded-[var(--border-radius-md)] bg-[var(--color-grey-0)] overflow-hidden">
      <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_auto] gap-[2.4rem] items-center py-[1.6rem] px-[2.4rem] bg-[var(--color-grey-50)] border-b border-[var(--color-grey-100)] font-semibold text-[1.4rem] text-[var(--color-grey-600)] uppercase tracking-[0.4px]">
        <span>Title</span>
        <span>Status</span>
        <span>Proirity</span>
        <span>Assignee</span>
        <span></span>
      </div>

      <div>
        {tasks.map((task) => {
          const project = projects.find(
            (project) => project.id === task.projectId,
          );
          return (
            <TaskRow
              task={task}
              project={project}
              onUpdate={onUpdate}
              currentUser={currentUser}
              key={task.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TaskTable;
