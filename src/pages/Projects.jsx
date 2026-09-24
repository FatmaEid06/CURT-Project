import { useEffect, useState } from "react";
import AddProject from "../features/projects/AddProject";
import ProjectTable from "../features/projects/ProjectTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getStorageData } from "../data/helpers";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../ui/SearchInputs";
import Spinner from "../ui/Spinner";
import TableOperations from "../ui/TableOperations";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

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

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * 5,
    currentPage * 5,
  );
  return (
    <>
      <Row type="horizontal">
        <Heading>All Projects</Heading>

        <TableOperations>
          <SearchInput
            field="search"
            placeholder="Search projects by name..."
          />

          <AddProject onUpdate={loadProjects} />
        </TableOperations>
      </Row>

      {isLoading ? (
        <Spinner />
      ) : (
        <ProjectTable
          projects={paginatedProjects}
          onUpdate={loadProjects}
          count={filteredProjects.length}
        />
      )}
    </>
  );
}

export default Projects;
