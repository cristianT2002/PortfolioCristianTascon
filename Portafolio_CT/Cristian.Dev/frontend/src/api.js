export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchEngagement() {
  const response = await fetch(`${API_BASE_URL}/api/projects/engagement`);
  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "No se pudo cargar la interacción de proyectos.");
  }

  return data.engagement;
}

export async function toggleProjectLike(projectId, action) {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "No se pudo registrar el like.");
  }

  return data;
}

export async function postProjectComment(projectId, author, text) {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, text }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "No se pudo publicar el comentario.");
  }

  return data;
}
