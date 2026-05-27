const fs = require("fs");
const path = require("path");
const { DEFAULT_LIKES } = require("./projects");

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "engagement.json");

function createDefaultEngagement() {
  const engagement = {};

  for (const [projectId, likes] of Object.entries(DEFAULT_LIKES)) {
    engagement[projectId] = { likes, comments: [] };
  }

  return engagement;
}

function readEngagement() {
  if (!fs.existsSync(DATA_FILE)) {
    const engagement = createDefaultEngagement();
    writeEngagement(engagement);
    return engagement;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const engagement = createDefaultEngagement();

    for (const projectId of Object.keys(engagement)) {
      if (parsed[projectId]) {
        engagement[projectId] = {
          likes: Number(parsed[projectId].likes) || engagement[projectId].likes,
          comments: Array.isArray(parsed[projectId].comments)
            ? parsed[projectId].comments
            : [],
        };
      }
    }

    return engagement;
  } catch (error) {
    console.error("Error leyendo engagement.json, usando valores por defecto:", error);
    return createDefaultEngagement();
  }
}

function writeEngagement(engagement) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(engagement, null, 2), "utf8");
}

function getProjectEngagement(projectId) {
  const engagement = readEngagement();
  return engagement[projectId] ?? { likes: 0, comments: [] };
}

function updateProjectEngagement(projectId, updater) {
  const engagement = readEngagement();
  const current = engagement[projectId] ?? { likes: 0, comments: [] };
  engagement[projectId] = updater(current);
  writeEngagement(engagement);
  return engagement[projectId];
}

module.exports = {
  readEngagement,
  getProjectEngagement,
  updateProjectEngagement,
};
