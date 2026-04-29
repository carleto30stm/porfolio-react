import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sistema de Gestion Pymes',
    description: 'Full-stack para gestion de ventas, inventario y clientes en pequenas empresas.',
    longDescription:
      'Plataforma de gestion de pymes completa con autenticacion JWT, integracion con facturacion ARCA , panel de administracion, manejo de inventario y flujo de caja, CC clientes y proveedores',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Docker'],
    category: 'fullstack',
    github: 'https://github.com/carleto30stm',
    demo: 'https://mypymegestion-production.up.railway.app/',
    featured: true,
  },
  {
    id: '2',
    title: 'Sistema de Gestion Medico',
    description: 'Aplicacion para gestionar el cronograma de medicos para pediatria clinica.',
    longDescription:
      'Sistema de gestion de cronograma de medicos para pediatria clinica, con autenticacion, roles de usuario, calendario interactivo, liquidacion de sueldo y panel de administracion.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Redux', 'Jest', 'Docker', 'TailwindCSS'],
    category: 'fullstack',
    github: 'https://github.com/carleto30stm',
    featured: true,
  },
  {
    id: '3',
    title: 'Sistema de Gestion para consultorios medicos',
    description: 'Sistema para gestionar turnos, pacientes y medicos en consultorios medicos.',
    longDescription:
      'Sistema de gestion para consultorios medicos con autenticacion, roles de usuario, calendario interactivo, historial medico, odontograma, manejo de pacientes y medicos, y panel de administracion.',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'TailwindCSS', 'JWT', 'Redux', 'Jest', 'Docker', 'NestJS'],
    category: 'fullstack',
    github: 'https://github.com/carleto30stm',
    demo: 'https://consultorios-production.up.railway.app/login',
    featured: true,
  },
  {
    id: '4',
    title: 'Porfolio Personal',
    description: 'Porfilio personal con proyectos, experiencia y habilidades.',
    longDescription:
      'Porfolio personal desarrollado con react y frame-motion, con secciones de proyectos, experiencia, habilidades y contacto. Diseño responsive y animaciones suaves.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'axios'],
    category: 'frontend',
    github: 'https://github.com/carleto30stm',
    featured: false,
  },
  {
    id: '5',
    title: 'msFileGenerator',
    description: 'Generador de pdf',
    longDescription:
      'Microservicio para generar archivos PDF a partir de plantillas y datos dinamicos, utilizando Java 8 y Spring Boot. Soporta generacion de facturas, reportes y documentos personalizados con integracion a OracleSQL para almacenamiento.',
    tech: ['Java 8 ', 'Spring Boot', 'OracleSQL', 'JPA', 'Maven', 'JUnit'],
    category: 'backend',
    github: 'https://github.com/carleto30stm',
    featured: false,
  },
  {
    id: '6',
    title: 'msVentas',
    description: 'Microservicio para gestionar ventas',
    longDescription:
      'Microservicio que que valida recetas usando mensaje ADESFA para utenticar recetas medicas, utilizando Java 8 y Spring Boot.',
    tech: ['Java 8 ', 'Spring Boot', 'OracleSQL', 'JPA', 'Maven', 'JUnit'],
    category: 'backend',
    github: 'https://github.com/carleto30stm',
    featured: false,
  },
];
