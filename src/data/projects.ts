import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform con autenticacion, pagos y panel admin.',
    longDescription:
      'Plataforma de comercio electronico completa con autenticacion JWT, integracion con Stripe para pagos, panel de administracion, manejo de inventario y notificaciones en tiempo real con WebSockets.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'Docker'],
    category: 'fullstack',
    github: 'https://github.com/carlos',
    demo: 'https://demo.example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'REST API - Task Manager',
    description: 'API REST robusta para gestion de tareas con autenticacion y roles.',
    longDescription:
      'API RESTful con autenticacion JWT, roles de usuario (admin/user), endpoints CRUD completos, validacion con Zod, documentacion con Swagger y tests con Jest.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Zod', 'Jest'],
    category: 'backend',
    github: 'https://github.com/carlos',
    featured: true,
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    description: 'Dashboard interactivo con graficos en tiempo real y filtros avanzados.',
    longDescription:
      'Aplicacion de analytics con graficos interactivos, filtros dinamicos, exportacion a CSV/PDF, modo oscuro y diseno responsive.',
    tech: ['React', 'TypeScript', 'Chart.js', 'TailwindCSS'],
    category: 'frontend',
    github: 'https://github.com/carlos',
    demo: 'https://demo.example.com',
    featured: true,
  },
  {
    id: '4',
    title: 'Chat App en Tiempo Real',
    description: 'Aplicacion de chat con WebSockets, rooms y notificaciones push.',
    longDescription:
      'Chat en tiempo real con Socket.io, multiples salas, mensajes privados, estado online/offline, notificaciones push y historial de mensajes.',
    tech: ['React', 'Node.js', 'Socket.io', 'Redis', 'MongoDB'],
    category: 'fullstack',
    github: 'https://github.com/carlos',
    featured: false,
  },
  {
    id: '5',
    title: 'Blog CMS Headless',
    description: 'CMS headless con editor markdown y API GraphQL.',
    longDescription:
      'Sistema de gestion de contenido con editor de markdown, API GraphQL, tags, categorias, SEO optimizado y preview en tiempo real.',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'Prisma'],
    category: 'fullstack',
    github: 'https://github.com/carlos',
    featured: false,
  },
  {
    id: '6',
    title: 'CLI Tool - Git Helpers',
    description: 'Herramienta CLI para automatizar flujos de trabajo con Git.',
    longDescription:
      'CLI tool escrito en Node.js para automatizar tareas comunes de Git: crear branches con convencion, generar changelogs, validar commit messages y mas.',
    tech: ['Node.js', 'TypeScript', 'Commander.js', 'Inquirer'],
    category: 'backend',
    github: 'https://github.com/carlos',
    featured: false,
  },
];
