import AddProject from "../features/projects/AddProject";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Projects() {
  return (
    <Row type="horizontal">
      <Heading>All Projects</Heading>
      <AddProject />
    </Row>
  );
}

export default Projects;
