import {
  Cpu,
  Database,
  Layout,
  Layers,
  MessageSquare,
  Rocket,
  Shield,
  Zap,
} from 'lucide-react';

export const PROJECTS = [
  {
    id: '1',
    title: 'Operations Management Platform',
    company: 'Freelancer',
    role: 'Full Stack Developer',
    period: '2025 — 2026',
    client: 'Operador de telecomunicaciones (Colombia)',
    sector: 'Telecomunicaciones',
    postBadge: 'Full-Stack Build',
    description:
      'Plataforma full-stack para gestión operativa de campo: despacho, seguimiento en mapa y cargas masivas de datos con validación en tiempo real.',
    hashtags: ['#fullstack', '#react', '#flask', '#telecom', '#fieldops'],
    highlights: [
      'Automatización de cargas masivas con validación en tiempo real',
      'Mapa Leaflet con seguimiento de órdenes y estado operativo',
      'PostgreSQL multi-esquema por operación y región',
    ],
    achievements: [
      { value: '40%', label: 'menos esfuerzo manual en cargas' },
      { value: 'Multi-schema', label: 'PostgreSQL por operación' },
      { value: 'Tiempo real', label: 'mapa y estado de órdenes' },
    ],
    stack: {
      frontend: ['React', 'Redux', 'Leaflet', 'Tailwind'],
      backend: ['Flask', 'SQLAlchemy', 'REST API'],
      infra: ['PostgreSQL', 'Docker'],
    },
    clients: [
      {
        name: 'Operador Telecom',
        handle: 'telecom_colombia',
        comment: 'Cliente · Telecomunicaciones · Gestión de campo',
        logo: null,
      },
    ],
    likes: 284,
    views: 1240,
    postedAgo: 'Hace 4 meses',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18a5?auto=format&fit=crop&q=80&w=1200',
    ],
    link: 'https://github.com/cristianT2002',
    github: 'https://github.com/cristianT2002',
  },
  {
    id: '2',
    title: 'Industrial Risk Detection System',
    company: 'Axure Technologies',
    role: 'Innovation & Development Analyst',
    period: '2023 — 2026',
    client: 'Plantas industriales — sector Oil & Gas',
    sector: 'Seguridad industrial',
    postBadge: 'AI · Computer Vision',
    description:
      'Backend en tiempo real para detección de EPP y accesos no autorizados con YOLO + OpenCV. Pipeline de alertas por SMTP y WhatsApp integrado a arquitectura orientada a eventos.',
    hashtags: ['#yolo', '#opencv', '#fastapi', '#oilandgas', '#safety'],
    highlights: [
      'Detección de EPP y accesos no autorizados con 85%+ de precisión',
      'Event bus para arquitectura desacoplada y escalable',
      'Alertas automáticas por SMTP y WhatsApp en tiempo real',
    ],
    achievements: [
      { value: '85%+', label: 'precisión en detección EPP' },
      { value: 'Event bus', label: 'arquitectura desacoplada' },
      { value: 'Alertas', label: 'SMTP + WhatsApp en tiempo real' },
    ],
    stack: {
      frontend: ['Dashboard interno'],
      backend: ['Python', 'FastAPI', 'YOLO', 'OpenCV'],
      infra: ['Docker', 'GPU', 'Grafana', 'Prometheus'],
    },
    clients: [
      {
        name: 'Axure Technologies',
        handle: 'axure_technologies',
        comment: 'Empresa · Oil & Gas · Seguridad industrial',
        logo: null,
      },
      {
        name: 'Planta Industrial',
        handle: 'oilgas_planta',
        comment: 'Cliente · Monitoreo EPP en producción',
        logo: null,
      },
    ],
    likes: 412,
    views: 1890,
    postedAgo: 'Hace 1 año',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    ],
    link: 'https://github.com/cristianT2002',
    github: 'https://github.com/cristianT2002',
  },
  {
    id: '3',
    title: 'Predictive Analytics — Telecom',
    company: 'Axure Technologies',
    role: 'Innovation & Development Analyst',
    period: '2023 — 2025',
    client: 'Infraestructura de red — operadores telecom',
    sector: 'Telecomunicaciones',
    postBadge: 'ML · Predictive',
    description:
      'Solución de ML con integración PRTG para estimar agotamiento de consumo en infraestructura crítica y anticipar sobreconsumo antes de que impacte costos.',
    hashtags: ['#machinelearning', '#prtg', '#fastapi', '#telecom', '#analytics'],
    highlights: [
      'Integración nativa con PRTG para métricas de infraestructura',
      'Modelos predictivos de agotamiento de consumo en producción',
      '96% de reducción en costos por sobreconsumo detectado',
    ],
    achievements: [
      { value: '96%', label: 'reducción de costos por sobreconsumo' },
      { value: 'PRTG', label: 'integración nativa de métricas' },
      { value: 'ML', label: 'modelos predictivos en producción' },
    ],
    stack: {
      frontend: ['Dashboards de métricas'],
      backend: ['Python', 'FastAPI', 'scikit-learn'],
      infra: ['PRTG API', 'PostgreSQL'],
    },
    clients: [
      {
        name: 'Axure Technologies',
        handle: 'axure_technologies',
        comment: 'Empresa · Infraestructura de red',
        logo: null,
      },
      {
        name: 'Operador de Red',
        handle: 'telecom_infra',
        comment: 'Cliente · Predicción de consumo crítico',
        logo: null,
      },
    ],
    likes: 356,
    views: 1629,
    postedAgo: 'Hace 8 meses',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    ],
    link: 'https://github.com/cristianT2002',
    github: 'https://github.com/cristianT2002',
  },
  {
    id: '4',
    title: 'Industrial Monitoring Dashboard',
    company: 'Axure Technologies',
    role: 'Frontend Developer',
    period: '2026 — Presente',
    client: 'Clientes Oil & Gas — monitoreo de activos',
    sector: 'Oil & Gas',
    postBadge: 'Frontend · Real-time',
    description:
      'Rediseño de plataforma web de monitoreo industrial: mapa interactivo Leaflet, dashboards en tiempo real y arquitectura de componentes optimizada para operadores de campo.',
    hashtags: ['#react', '#leaflet', '#oilandgas', '#dashboard', '#realtime'],
    highlights: [
      'Mapa Leaflet con telemetría y activos en tiempo real',
      '30% menos tiempo de respuesta en la interfaz',
      'Arquitectura de componentes React escalable para operadores',
    ],
    achievements: [
      { value: '30%', label: 'menos tiempo de respuesta UI' },
      { value: 'Tiempo real', label: 'telemetría en mapa y paneles' },
      { value: 'React', label: 'arquitectura de componentes escalable' },
    ],
    stack: {
      frontend: ['React', 'Leaflet', 'Tailwind CSS'],
      backend: ['REST API', 'WebSockets'],
      infra: ['Docker', 'CI/CD'],
    },
    clients: [
      {
        name: 'Axure Technologies',
        handle: 'axure_technologies',
        comment: 'Empresa · Oil & Gas · Monitoreo industrial',
        logo: null,
      },
      {
        name: 'Cliente Oil & Gas',
        handle: 'oilgas_monitoring',
        comment: 'Cliente · Activos en campo · Tiempo real',
        logo: null,
      },
    ],
    likes: 198,
    views: 890,
    postedAgo: 'Hace 2 meses',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504917593497-3244197a2f71?auto=format&fit=crop&q=80&w=1200',
    ],
    link: 'https://github.com/cristianT2002',
    github: 'https://github.com/cristianT2002',
  },
];

export const SKILLS = [
  {
    name: 'Backend / API',
    icon: Database,
    skills: ['Python', 'FastAPI', 'Flask', 'Node.js', 'REST APIs'],
  },
  {
    name: 'Frontend',
    icon: Layout,
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux'],
  },
  {
    name: 'Data & Infra',
    icon: Cpu,
    skills: ['PostgreSQL', 'Docker', 'AWS', 'Kubernetes', 'Grafana', 'Prometheus'],
  },
  {
    name: 'AI / Computer Vision',
    icon: Shield,
    skills: ['YOLO', 'OpenCV', 'scikit-learn', 'Event-driven architecture'],
  },
];

export const CAREER = [
  {
    id: 'axure',
    company: 'Axure Technologies',
    period: '2022 — Presente',
    summary:
      'De prácticas en electrónica a desarrollo full-stack e innovación: visión por computadora, monitoreo industrial y ML con impacto medible en clientes Oil & Gas y telecom.',
    roles: [
      {
        title: 'Frontend Developer',
        period: '2026 — Presente',
        projectIds: ['4'],
      },
      {
        title: 'Innovation & Development Analyst',
        period: '2023 — 2026',
        projectIds: ['2', '3'],
      },
      {
        title: 'Electronics Engineering Intern',
        period: '2022 — 2023',
        projectIds: [],
      },
    ],
  },
  {
    id: 'freelance',
    company: 'Freelancer',
    period: '2025 — 2026',
    summary:
      'Desarrollo full-stack para operadores de telecomunicaciones con foco en automatización operativa y plataformas de gestión de campo.',
    roles: [
      {
        title: 'Full Stack Developer',
        period: '2025 — 2026',
        projectIds: ['1'],
      },
    ],
  },
];

export const NAV_LINKS = [
  { name: 'Inicio', href: '#home', icon: Rocket },
  { name: 'Proyectos', href: '#projects', icon: Layers },
  { name: 'Trayectoria', href: '#experience', icon: Cpu },
  { name: 'Habilidades', href: '#skills', icon: Zap },
  { name: 'Contacto', href: '#contact', icon: MessageSquare },
];

export const PROFILE = {
  name: 'Cristian Tascón',
  title: 'Backend · Full Stack Developer',
  instagramHandle: 'cristian.dev_fs',
  email: 'cristiantmm11@outlook.com',
  location: 'Bogotá, D.C., Colombia',
  github: 'https://github.com/cristianT2002',
  linkedin: 'https://linkedin.com/in/cristiantasconm',
  bio: 'Software Engineer con 3+ años construyendo soluciones Full Stack, especializado en Backend ',
};
