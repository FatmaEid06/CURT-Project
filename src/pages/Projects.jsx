import { useEffect, useState } from "react";
import AddProject from "../features/projects/AddProject";
import ProjectTable from "../features/projects/ProjectTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getStorageData } from "../data/helpers";

function Projects() {
  const [projects, setProjects] = useState([]);
  function loadProjects() {
    setProjects(getStorageData("projects", []));
  }

  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading>All Projects</Heading>
        <AddProject onUpdate={loadProjects} />
      </Row>
      <ProjectTable projects={projects} onUpdate={loadProjects} />
    </>
  );
}

export default Projects;
