const express = require("express");
const cors = require("cors");
const crypto = require("node:crypto");
require("dotenv").config();

const { isValidProjectId, getProjectTitle } = require("./projects");
const { readEngagement, updateProjectEngagement } = require("./store");
const { getMissingEnvVars, sendPortfolioEmail } = require("./mail");

const app = express();
const port = Number(process.env.PORT) || 4000;
app.disable("x-powered-by");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/projects/engagement", (_req, res) => {
  res.json({ ok: true, engagement: readEngagement() });
});

app.post("/api/projects/:projectId/like", async (req, res) => {
  const { projectId } = req.params;
  const { action } = req.body || {};

  if (!isValidProjectId(projectId)) {
    return res.status(404).json({ ok: false, error: "Proyecto no encontrado." });
  }

  if (action !== "like" && action !== "unlike") {
    return res.status(400).json({ ok: false, error: "Acción inválida." });
  }

  const missingEnv = getMissingEnvVars();
  if (missingEnv.length > 0) {
    return res.status(500).json({
      ok: false,
      error: "Configuración SMTP incompleta en el servidor.",
    });
  }

  try {
    const projectTitle = getProjectTitle(projectId);
    let updated;

    if (action === "like") {
      updated = updateProjectEngagement(projectId, (current) => ({
        ...current,
        likes: current.likes + 1,
      }));

      await sendPortfolioEmail({
        subject: `[Portafolio] Nuevo like en "${projectTitle}"`,
        text: `Alguien dio like al proyecto "${projectTitle}".\n\nTotal actual: ${updated.likes} me gusta.`,
        html: `
          <h2>Nuevo like en tu portafolio</h2>
          <p><strong>Proyecto:</strong> ${projectTitle}</p>
          <p><strong>Total de likes:</strong> ${updated.likes}</p>
        `,
      });
    } else {
      updated = updateProjectEngagement(projectId, (current) => ({
        ...current,
        likes: Math.max(0, current.likes - 1),
      }));
    }

    return res.json({
      ok: true,
      likes: updated.likes,
      comments: updated.comments,
    });
  } catch (error) {
    console.error("Error procesando like:", error);
    return res.status(500).json({
      ok: false,
      error: "No se pudo registrar el like en este momento.",
    });
  }
});

app.post("/api/projects/:projectId/comments", async (req, res) => {
  const { projectId } = req.params;
  const { author, text } = req.body || {};

  if (!isValidProjectId(projectId)) {
    return res.status(404).json({ ok: false, error: "Proyecto no encontrado." });
  }

  const trimmedAuthor = String(author ?? "").trim();
  const trimmedText = String(text ?? "").trim();

  if (!trimmedAuthor || !trimmedText) {
    return res.status(400).json({
      ok: false,
      error: "Nombre y comentario son obligatorios.",
    });
  }

  if (trimmedText.length > 500) {
    return res.status(400).json({
      ok: false,
      error: "El comentario no puede superar 500 caracteres.",
    });
  }

  const missingEnv = getMissingEnvVars();
  if (missingEnv.length > 0) {
    return res.status(500).json({
      ok: false,
      error: "Configuración SMTP incompleta en el servidor.",
    });
  }

  try {
    const projectTitle = getProjectTitle(projectId);
    const comment = {
      id: crypto.randomUUID(),
      author: trimmedAuthor,
      text: trimmedText,
      createdAt: new Date().toISOString(),
    };

    const updated = updateProjectEngagement(projectId, (current) => ({
      ...current,
      comments: [...current.comments, comment],
    }));

    await sendPortfolioEmail({
      subject: `[Portafolio] Nuevo comentario en "${projectTitle}"`,
      text: `Proyecto: ${projectTitle}\nAutor: ${trimmedAuthor}\n\nComentario:\n${trimmedText}`,
      html: `
        <h2>Nuevo comentario en tu portafolio</h2>
        <p><strong>Proyecto:</strong> ${projectTitle}</p>
        <p><strong>Autor:</strong> ${trimmedAuthor}</p>
        <hr />
        <p>${trimmedText.replaceAll("\n", "<br/>")}</p>
      `,
    });

    return res.json({
      ok: true,
      comment,
      likes: updated.likes,
      comments: updated.comments,
    });
  } catch (error) {
    console.error("Error procesando comentario:", error);
    return res.status(500).json({
      ok: false,
      error: "No se pudo publicar el comentario en este momento.",
    });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      ok: false,
      error: "Todos los campos son obligatorios.",
    });
  }

  const missingEnv = getMissingEnvVars();
  if (missingEnv.length > 0) {
    return res.status(500).json({
      ok: false,
      error: "Configuración SMTP incompleta en el servidor.",
    });
  }

  try {
    await sendPortfolioEmail({
      replyTo: email,
      subject: `[Portafolio] ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <p>${String(message).replaceAll("\n", "<br/>")}</p>
      `,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Error enviando correo de contacto:", error);
    return res.status(500).json({
      ok: false,
      error: "No se pudo enviar el mensaje en este momento.",
    });
  }
});

app.listen(port, () => {
  const missingEnv = getMissingEnvVars();
  if (missingEnv.length > 0) {
    console.warn(
      `[contact-api] Variables faltantes: ${missingEnv.join(", ")}`
    );
  }
  console.log(`[contact-api] Escuchando en http://localhost:${port}`);
});
