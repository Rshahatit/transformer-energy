import React, { createContext, useContext, useState } from 'react';

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  esgScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  latitude: number;
  longitude: number;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  initializeProjects: (projects: Project[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const initializeProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, currentProject, setCurrentProject, addProject, initializeProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};