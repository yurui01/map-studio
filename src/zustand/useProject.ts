import { create } from 'zustand'
import { IProject } from '@/types/project'

interface IProjectState {
  project: IProject | null
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
  setProject: (project: IProject) => void
  removeProject: () => void
}

export const useProject = create<IProjectState>((set, get) => ({
  project: null,
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setProject: (project: IProject) => set({ project }),
  removeProject: () => set({ project: null })
}))
