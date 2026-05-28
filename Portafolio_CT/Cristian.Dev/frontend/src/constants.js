import {
  Cpu,
  Database,
  Layout,
  Layers,
  MessageSquare,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import operationsPlatformImg from "./assets/6789710080b686a72cec953c_opcion hse 5 (1).png";
import operationsPlatformLoginImg from "./assets/Captura de pantalla 2026-05-26 213244.png";
import axRealOpsImg from "./assets/Captura de pantalla 2026-05-26 213015.png";
import predictiveAnalyticsImg1 from "./assets/Captura de pantalla 2026-05-26 215615.png";
import predictiveAnalyticsImg2 from "./assets/Captura de pantalla 2026-05-26 214737.png";
import predictiveAnalyticsImg3 from "./assets/Captura de pantalla 2026-05-26 214700.png";
import industrialMonitoringImg1 from "./assets/Captura de pantalla 2026-05-25 203247.png";
import industrialMonitoringImg2 from "./assets/Captura de pantalla 2026-05-25 203410.png";
import hccViewerGraphImg from "./assets/graph.png";
import ecopetrolLogo from "./assets/images.png";
import geoParkLogo from "./assets/GeoPark.webp";
import hocolLogo from "./assets/naborsLogo.png";
import axMexicoLogo from "./assets/LOGO_AXMX.png";
import universidadLogo from "./assets/logoU.png";

export const PROJECTS = [
  {
    id: "1",
    title: "HSE Video Analytics",
    company: "Axure Technologies",
    role: "Analista de Innovación y Desarrollo",
    period: "2023 — 2026",
    client: "GeoPark, Ecopetrol y Hocol — sector Oil & Gas",
    sector: "Seguridad industrial",
    postBadge: "AI · Computer Vision",
    description:
      "Backend en Python para detectar riesgos e incumplimiento de EPP (cascos, accesos no autorizados) con YOLO y OpenCV sobre streams RTSP e inferencia en GPU. Alertas por SMTP y WhatsApp bajo arquitectura event-driven y clean architecture.",
    hashtags: ["#yolo", "#opencv", "#fastapi", "#oilandgas", "#hse"],
    highlights: [
      "Menor riesgo en mesa rotaria, planchada y contrapozo con monitoreo continuo",
      "Avisos cuando falta EPP o hay conductas fuera de protocolo",
      "Detección, notificación y visualización desacopladas para escalar sin fricción",
    ],
    challenges: [
      "Ampliar y afinar el dataset de entrenamiento del modelo",
      "Orquestar colas y eventos sin saturar el sistema",
      "Mostrar la inferencia en vivo sobre el streaming",
    ],
    achievements: [
      { value: "85%+", label: "precisión en detección EPP" },
      { value: "50%", label: "menos consumo de memoria" },
      { value: "15–20", label: "alertas diarias en producción" },
    ],
    stack: {
      frontend: ["Dashboard de monitoreo"],
      backend: ["Python", "FastAPI", "YOLO", "OpenCV"],
      infra: ["Docker", "GPU", "Grafana", "Prometheus"],
    },
    clients: [
      {
        name: "GeoPark",
        handle: "geopark",
        comment: "Cliente · Oil & Gas · Gestión operativa de campo",
        logo: geoParkLogo,
      },
      {
        name: "Ecopetrol",
        handle: "ecopetrol",
        comment: "Cliente · Oil & Gas · Gestión operativa de campo",
        logo: ecopetrolLogo,
      },
      {
        name: "Hocol",
        handle: "hocol",
        comment: "Cliente · Oil & Gas · Gestión operativa de campo",
        logo: hocolLogo,
      },
    ],
    likes: 412,
    views: 1890,
    postedAgo: "Hace 1 año",
    images: [
      operationsPlatformImg,
      {
        src: operationsPlatformLoginImg,
        fit: "cover",
        objectPosition: "center",
        padding: "tight",
      },
    ],
    link: "https://www.axuretechnologies.com/soluciones-de-hse",
    github: true,
  },
  {
    id: "2",
    title: "AX Real Ops",
    company: "Freelancer",
    role: "Backend | Data analyst | Electronic Engineer",
    period: "2025 — 2026",
    client: "AX México — sector Oil & Gas",
    sector: "Oil & Gas",
    postBadge: "Full-Stack · Operations",
    description:
      "Plataforma web con API REST en FastAPI y PostgreSQL multi-schema: centraliza operaciones de campo, mapas Leaflet, dashboards y exportación de reportes. Incluye sesiones, 2FA por correo y despliegue seguro con proxy reverso HTTPS.",
    hashtags: ["#fullstack", "#fastapi", "#react", "#postgresql", "#fieldops"],
    highlights: [
      "Centralización de datos y rediseño del control de actividades en campo",
      "Menos carga manual: automatización de registros, sitios y módulos de configuración",
      "Información operativa lista para decidir, sin tocar la infraestructura directamente",
    ],
    challenges: [
      "Modelar gran volumen de datos en múltiples tablas y dominios",
      "Resolver timeouts y cuellos de botella con consultas optimizadas",
      "Alinear la visión del cliente con flujos claros en la plataforma",
    ],
    achievements: [
      { value: "40%", label: "menos esfuerzo manual en cargas" },
      { value: "35%", label: "mejora en tiempos de consulta" },
      { value: "Multi-schema", label: "PostgreSQL por operación" },
    ],
    stack: {
      frontend: ["React", "Redux", "Axios", "Leaflet"],
      backend: ["Python", "FastAPI", "REST API", "pytest"],
      infra: ["PostgreSQL", "Docker", "HTTPS"],
    },
    clients: [
      {
        name: "AX México",
        handle: "axmexico",
        comment: "Cliente · Oil & Gas · Detección de riesgos industriales",
        logo: axMexicoLogo,
        logoBg: "black",
      },
    ],
    likes: 284,
    views: 1240,
    postedAgo: "Hace 4 meses",
    images: [
      {
        src: axRealOpsImg,
        fit: "cover",
        objectPosition: "center",
        padding: "tight",
      },
    ],
    link: "https://axmexicoservices.com/AX_MX/auth/login",
    github: true,
  },
  {
    id: "3",
    title: "Monitoreo IoT — Solar Fotovoltaico",
    company: "Universidad de San Buenaventura",
    role: "Tesis de grado · Ingeniería Electrónica",
    period: "2023 — 2024",
    client: "Universidad de San Buenaventura — tesis de grado",
    clientsSectionTitle: "Institución académica",
    sector: "Energía solar · IoT",
    postBadge: "IoT · Tesis",
    description:
      "Prototipo IoT para monitoreo remoto de variables eléctricas y ambientales (temperatura, irradiancia) en un panel solar autónomo. Telemetría con LoRa, almacenamiento en MariaDB (AWS) e interfaz web con Flask.",
    hashtags: ["#iot", "#solar", "#lora", "#flask", "#tesis"],
    highlights: [
      "Relación clara entre condiciones ambientales y rendimiento del panel",
      "Evaluación de LoRa como enlace para medición en campo",
      "Base para optimizar diseño y eficiencia de sistemas fotovoltaicos",
    ],
    challenges: [
      "Integración hardware–software en condiciones de intemperie",
      "Alcance y estabilidad entre nodos LoRa",
      "Sincronizar captura, almacenamiento y visualización de datos",
    ],
    achievements: [
      { value: "IoT", label: "prototipo en campo" },
      { value: "LoRa", label: "telemetría remota" },
      { value: "AWS", label: "MariaDB en la nube" },
    ],
    stack: {
      frontend: ["HTML", "CSS"],
      backend: ["Python", "Flask"],
      infra: ["MariaDB", "AWS EC2", "LoRa"],
    },
    clients: [
      {
        name: "Universidad de San Buenaventura",
        handle: "usb_bogota",
        comment: "Tesis de grado · Monitoreo IoT y energía solar",
        logo: universidadLogo,
      },
    ],
    likes: 356,
    views: 1629,
    postedAgo: "Hace 8 meses",
    images: [
      predictiveAnalyticsImg1,
      predictiveAnalyticsImg2,
      predictiveAnalyticsImg3,
    ],
    link: "https://bibliotecadigital.usb.edu.co/entities/publication/49bfa11e-7126-4d72-ab34-eb457466bff1",
  },
  {
    id: "4",
    title: "HCC Viewer",
    company: "Axure Technologies",
    role: "Frontend Developer · ML",
    period: "2025 — Presente",
    client: "Proyecto interno — Axure Technologies",
    clientsSectionTitle: "Contexto del proyecto",
    clientsEmptyMessage:
      "Desarrollo interno en Axure Technologies. Sin clientes externos.",
    sector: "Telecomunicaciones",
    postBadge: "ML · Predictive",
    description:
      "Plataforma para analizar el consumo de antenas satelitales y estimar cuándo se agotará la capacidad contratada. Modelos con scikit-learn y TensorFlow, API en FastAPI y frontend en React con Tailwind.",
    hashtags: ["#machinelearning", "#react", "#fastapi", "#telecom", "#satellite"],
    highlights: [
      "Anticipación de sobreconsumo antes de generar costos por excedentes",
      "Predicción basada en patrones reales de uso de la antena",
      "Dashboard claro para decisiones operativas del equipo",
    ],
    challenges: [
      "Modelar y entrenar con datos históricos de consumo",
      "Elegir algoritmos que den estimaciones confiables en producción",
      "Unificar modelo, API e interfaz en un solo flujo",
    ],
    achievements: [
      { value: "96%", label: "menos costos por sobreconsumo" },
      { value: "30%", label: "menos tiempo de respuesta UI" },
      { value: "ML", label: "modelo predictivo en producción" },
    ],
    stack: {
      frontend: ["React", "Tailwind CSS", "Axios"],
      backend: ["Python", "FastAPI", "scikit-learn", "TensorFlow"],
      infra: ["NumPy", "Pandas", "Docker"],
    },
    clients: [],
    likes: 198,
    views: 890,
    postedAgo: "Hace 2 meses",
    images: [
      hccViewerGraphImg,
      { src: industrialMonitoringImg1, fit: "cover", objectPosition: "top center", padding: "tight" },
      { src: industrialMonitoringImg2, fit: "cover", objectPosition: "top center", padding: "tight" },
    ],
    github: true,
  },
];

export const PRIVATE_REPO_TOOLTIP =
  "Por términos de confidencialidad, el repositorio es privado";

export const SKILLS = [
  {
    name: "Backend / API",
    icon: Database,
    skills: ["Python", "FastAPI", "Flask", "Node.js", "REST APIs"],
  },
  {
    name: "Frontend",
    icon: Layout,
    skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    name: "Data & Infra",
    icon: Cpu,
    skills: [
      "PostgreSQL",
      "Docker",
      "AWS",
      "Kubernetes",
      "Grafana",
      "Prometheus",
    ],
  },
  {
    name: "AI / Computer Vision",
    icon: Shield,
    skills: ["YOLO", "OpenCV", "scikit-learn", "Event-driven architecture"],
  },
];

/** Logos para el carrusel de tech stack (Simple Icons CDN) */
export const TECH_STACK = [
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "FastAPI", slug: "fastapi", color: "009688" },
  { name: "Flask", slug: "flask", color: "FFFFFF" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Redux", slug: "redux", color: "764ABC" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "AWS", slug: "amazonaws", color: "FF9900" },
  { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
  { name: "Grafana", slug: "grafana", color: "F46800" },
  { name: "Prometheus", slug: "prometheus", color: "E6522C" },
  { name: "OpenCV", slug: "opencv", color: "5C3EE8" },
  { name: "scikit-learn", slug: "scikitlearn", color: "F7931E" },
  { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
  { name: "Apache Kafka", slug: "apachekafka", color: "FFFFFF" },
];

export const TECH_STACK_ROW_1 = TECH_STACK.slice(0, 10);
export const TECH_STACK_ROW_2 = TECH_STACK.slice(10);

export const CAREER = [
  {
    id: "axure",
    company: "Axure Technologies",
    location: "Bogotá, Colombia",
    period: "DIC 2022 — Presente",
    summary:
      "De prácticas a productos en producción para Oil & Gas y telecom: visión por computadora en tiempo real, arquitecturas event-driven, APIs con FastAPI y modelos predictivos con impacto en costos operativos.",
    roles: [
      {
        title: "Frontend Developer",
        period: "2025 — Presente",
        narrative:
          "HCC Viewer: consumo satelital, predicción de agotamiento y dashboard React con respuesta más rápida para el equipo.",
        projectIds: ["4"],
      },
      {
        title: "Analista de Innovación y Desarrollo / Backend Engineer",
        period: "JUL 2023 — 2025",
        narrative:
          "HSE Video Analytics: YOLO en GPU, alertas por WhatsApp y clean architecture; 50 % menos memoria y 85 %+ de precisión en campo.",
        projectIds: ["1"],
      },
      {
        title: "Software Engineering Intern",
        period: "DIC 2022 — JUN 2023",
        narrative:
          "Módulos de visión por computadora y primeros microservicios bajo metodología ágil.",
        projectIds: [],
      },
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    location: "Colombia · Remoto",
    period: "OCT 2025 — MAR 2026",
    summary:
      "Part-time en AX Real Ops: PostgreSQL multi-schema, APIs FastAPI y automatización para operaciones de campo en Oil & Gas.",
    roles: [
      {
        title: "Backend · Full Stack Developer",
        period: "OCT 2025 — MAR 2026",
        narrative:
          "Plataforma full-stack con mapas, reportes, 2FA y despliegue seguro; menos trabajo manual y consultas más rápidas.",
        projectIds: ["2"],
      },
    ],
  },
];

export const NAV_LINKS = [
  { name: "Inicio", href: "#home", icon: Rocket },
  { name: "Experiencia", href: "#experience", icon: Cpu },
  { name: "Proyectos", href: "#projects", icon: Layers },
  { name: "Stack técnico", href: "#skills", icon: Zap },
  { name: "Contacto", href: "#contact", icon: MessageSquare },
];

export const PROFILE = {
  name: "Cristian Tascón",
  title: "Backend Engineer | Data analyst | Electronic Engineer",
  instagramHandle: "cristian.dev",
  email: "cristiantmm11@outlook.com",
  location: "Bogotá, D.C., Colombia",
  github: "https://github.com/cristianT2002",
  linkedin: "https://linkedin.com/in/cristiantasconm",
  gitlab: "https://gitlab.com/cristianT2002",
  cv: "/CV_Cristian_Tascon.pdf",
  cvFileName: "Cristian_Tascon_CV.pdf",
  bio: "Software Engineer con 3+ años construyendo soluciones basadas en análisis de datos, especializado en Backend e integración de IA, Machine Learning y Deep Learning.",
};
