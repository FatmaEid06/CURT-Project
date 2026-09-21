import ProjectRow from "./ProjectRow";

function ProjectTable({ projects = [], onUpdate }) {
  if (projects.length === 0) {
    return (
      <p className="text-[1.6rem] text-center text-[var(--color-grey-500)] py-[3.2rem]">
        No projects found.
      </p>
    );
  }

  return (
    <div className="border border-[var(--color-grey-200)] rounded-[var(--border-radius-md)] bg-[var(--color-grey-0)] overflow-hidden">
      <div className="grid grid-cols-[1.2fr_2fr_1fr_1fr_1.2rem] gap-[2.4rem] items-center py-[1.6rem] px-[2.4rem] bg-[var(--color-grey-50)] border-b border-[var(--color-grey-100)] font-semibold text-[1.4rem] text-[var(--color-grey-600)] uppercase tracking-[0.4px]">
        <span>Name</span>
        <span>Owner</span>
        <span>Team</span>
        <span></span>
      </div>
      <div>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}

export default ProjectTable;
