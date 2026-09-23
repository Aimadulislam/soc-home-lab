export type ProjectDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type ProjectLevel = ProjectDifficulty;

export interface Project {
  id: string;
  category: string;
  status: string;
  difficulty: ProjectDifficulty;
  level?: ProjectDifficulty;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  architectureDetails?: {
    summary: string;
    nodes: string[];
    mitreTactics: string[];
    keyCapabilities: string[];
    sampleSnippetTitle?: string;
    sampleSnippet?: string;
  };
}
