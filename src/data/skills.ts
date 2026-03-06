import type { Skill } from '../types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 92, category: 'frontend', icon: 'SiReact' },
  { name: 'TypeScript', level: 88, category: 'frontend', icon: 'SiTypescript' },
  { name: 'Next.js', level: 80, category: 'frontend', icon: 'SiNextdotjs' },
  { name: 'JavaScript', level: 95, category: 'frontend', icon: 'SiJavascript' },
  { name: 'HTML5 / CSS3', level: 90, category: 'frontend', icon: 'SiHtml5' },
  { name: 'TailwindCSS', level: 85, category: 'frontend', icon: 'SiTailwindcss' },

  // Backend
  { name: 'Node.js', level: 90, category: 'backend', icon: 'SiNodedotjs' },
  { name: 'Express', level: 88, category: 'backend', icon: 'SiExpress' },
  { name: 'Python', level: 70, category: 'backend', icon: 'SiPython' },
  { name: 'GraphQL', level: 72, category: 'backend', icon: 'SiGraphql' },
  { name: 'REST APIs', level: 92, category: 'backend', icon: 'SiOpenapiinitiative' },

  // Database
  { name: 'PostgreSQL', level: 82, category: 'database', icon: 'SiPostgresql' },
  { name: 'MongoDB', level: 80, category: 'database', icon: 'SiMongodb' },
  { name: 'Redis', level: 68, category: 'database', icon: 'SiRedis' },
  { name: 'Prisma', level: 75, category: 'database', icon: 'SiPrisma' },

  // DevOps
  { name: 'Docker', level: 78, category: 'devops', icon: 'SiDocker' },
  { name: 'Git / GitHub', level: 90, category: 'devops', icon: 'SiGit' },
  { name: 'Linux', level: 72, category: 'devops', icon: 'SiLinux' },
  { name: 'Railway', level: 70, category: 'devops', icon: 'SiRailway' },

  // Tools
  { name: 'VS Code', level: 95, category: 'tools', icon: 'SiGnubash' },
  { name: 'Jest', level: 75, category: 'tools', icon: 'SiJest' },
  { name: 'Figma', level: 65, category: 'tools', icon: 'SiFigma' },
  { name: 'Postman', level: 88, category: 'tools', icon: 'SiPostman' },
];
