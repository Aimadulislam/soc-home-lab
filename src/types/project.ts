import React from 'react';

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type ProjectDifficulty = Difficulty;
export type ProjectLevel = Difficulty;

export type ProjectStatus = 'COMPLETED' | 'IN PROGRESS' | 'PLANNED' | 'ARCHIVED';

export interface Technology {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ArchitectureNode {
  label: string;
  sublabel?: string;
  role?: 'attacker' | 'network' | 'sensor' | 'target' | 'siem' | 'analyst';
}

export interface EnvironmentSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  difficulty: Difficulty;
  level?: Difficulty; // For backward compatibility
  description: string;
  overview?: string;
  image: string;
  technologies: (string | Technology)[];
  githubUrl: string;
  projectUrl?: string;
  detailsUrl?: string;
  demoUrl?: string;
  objectives?: string[];
  environment?: EnvironmentSpec[];
  architectureFlow?: ArchitectureNode[];
  activities?: string[];
  results?: string;
  architectureDetails?: {
    summary: string;
    nodes: string[];
    mitreTactics: string[];
    keyCapabilities: string[];
    sampleSnippetTitle?: string;
    sampleSnippet?: string;
  };
}
