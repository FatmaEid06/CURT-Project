export const initialUsers = [
  {
    id: "u1",
    name: "Ahmed Lead (Aerodynamics)",
    email: "ahmed@curt.com",
    password: "123",
  },
  {
    id: "u2",
    name: "Salma Member (CFD)",
    email: "salma@curt.com",
    password: "123",
  },
  {
    id: "u3",
    name: "Youssef Member (Powertrain)",
    email: "youssef@curt.com",
    password: "123",
  },
];

export const initialProjects = [
  {
    id: "p1",
    name: "FSAE 2027 - Aero Package",
    description:
      "Front wing, rear wing, and sidepod optimization for downforce.",
    ownerId: "u1",
    members: ["u1", "u2"],
  },
  {
    id: "p2",
    name: "FSAE 2027 - Powertrain Cooling",
    description:
      "Radiator sizing and fluid routing for electric inverter/motor.",
    ownerId: "u3",
    members: ["u3", "u1"],
  },
];

export const initialTasks = [
  {
    id: "t1",
    projectId: "p1",
    title: "Run CFD iteration 4 on endplates",
    description:
      "Check Y-vortex shedding and pressure coefficient distribution.",
    status: "in-progress",
    priority: "high",
    assignedTo: "u2",
  },
  {
    id: "t2",
    projectId: "p1",
    title: "Manufacture carbon fiber main plane mock",
    description: "Prepare vacuum bag setup in composite lab.",
    status: "to-do",
    priority: "medium",
    assignedTo: "u1",
  },
  {
    id: "t3",
    projectId: "p2",
    title: "CFD duct flow simulation",
    description: "Validate air velocity across radiator core face.",
    status: "done",
    priority: "low",
    assignedTo: "u3",
  },
];
