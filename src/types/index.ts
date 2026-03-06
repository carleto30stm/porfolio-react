export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  github?: string;
  demo?: string;
  image?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  startDate: string;
  endDate?: string;
  description: string[];
  tech: string[];
  type: 'work' | 'education';
}

export interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_commits?: number;
  contributionCalendar?: {
    weeks: Array<{
      contributionDays: Array<{
        date: string;
        contributionCount: number;
        color: string;
      }>;
    }>;
  };
}

export type Language = 'es' | 'en';
