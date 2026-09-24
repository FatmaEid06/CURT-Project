import { useEffect, useState } from "react";
import AddProject from "../features/projects/AddProject";
import ProjectTable from "../features/projects/ProjectTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getStorageData } from "../data/helpers";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../ui/SearchInputs";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  function loadProjects() {
    setProjects(getStorageData("projects", []));
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery),
  );
  return (
    <>
      <Row type="horizontal">
        <Heading>All Projects</Heading>
        <AddProject onUpdate={loadProjects} />
      </Row>
      <div>
        <SearchInput field="search" placeholder="Search projects by name..." />
      </div>
      <ProjectTable projects={filteredProjects} onUpdate={loadProjects} />
    </>
  );
}

export default Projects;
