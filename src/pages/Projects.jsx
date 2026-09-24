import { useEffect, useState } from "react";
import AddProject from "../features/projects/AddProject";
import ProjectTable from "../features/projects/ProjectTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getStorageData } from "../data/helpers";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../ui/SearchInputs";
import Spinner from "../ui/Spinner";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  function loadProjects() {
    setProjects(getStorageData("projects", []));
  }

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
      {isLoading ? (
        <Spinner />
      ) : (
        <ProjectTable projects={filteredProjects} onUpdate={loadProjects} />
      )}
    </>
  );
}

export default Projects;
