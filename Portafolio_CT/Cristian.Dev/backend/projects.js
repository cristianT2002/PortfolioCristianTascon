const PROJECTS = {
  "1": { title: "HSE Video Analytics" },
  "2": { title: "AX Real Ops" },
  "3": { title: "Monitoreo IoT — Solar Fotovoltaico" },
  "4": { title: "HCC Viewer" },
};

const DEFAULT_LIKES = {
  "1": 412,
  "2": 284,
  "3": 356,
  "4": 198,
};

function isValidProjectId(projectId) {
  return Object.hasOwn(PROJECTS, projectId);
}

function getProjectTitle(projectId) {
  return PROJECTS[projectId]?.title ?? `Proyecto ${projectId}`;
}

module.exports = {
  PROJECTS,
  DEFAULT_LIKES,
  isValidProjectId,
  getProjectTitle,
};
