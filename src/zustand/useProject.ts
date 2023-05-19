import { create } from 'zustand'
import { IProject } from '@/types/project'

interface IProjectState {
  project: IProject | null
  setProject: (project: IProject) => void
}

export const useProject = create<IProjectState>((set, get) => ({
  project: null,
  setProject: (project: IProject) => set({ project }),
  removeProject: () => set({ project: null })
}))
