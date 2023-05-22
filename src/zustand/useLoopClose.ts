import { create } from 'zustand'
import { IFrame } from '@/types/frame'

interface ILoopCloseState {
  currentFrame: IFrame | null
  setCurrentFrame: (frame: IFrame) => void

  referenceFrame: IFrame | null
  setReferenceFrame: (frame: IFrame) => void
}

export const useLoopClose = create<ILoopCloseState>((set, get) => ({
  currentFrame: null,
  setCurrentFrame: (frame: IFrame) => set({ currentFrame: frame }),

  referenceFrame: null,
  setReferenceFrame: (frame: IFrame) => set({ referenceFrame: frame })
}))
