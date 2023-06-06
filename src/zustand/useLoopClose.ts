import { create } from 'zustand'
import { IFrame } from '@/types/frame'

interface ILoopCloseState {
  currentFrame: IFrame | null
  setCurrentFrame: (frame: IFrame) => void

  referenceFrame: IFrame | null
  setReferenceFrame: (frame: IFrame) => void

  reset: () => void
}

export const useLoopClose = create<ILoopCloseState>((set, get) => ({
  currentFrame: null,
  setCurrentFrame: (frame: IFrame) => {
    if (frame.id === get().referenceFrame?.id) return
    set({ currentFrame: frame })
  },

  referenceFrame: null,
  setReferenceFrame: (frame: IFrame) => {
    if (frame.id === get().currentFrame?.id) return
    set({ referenceFrame: frame })
  },

  reset: () => set({ currentFrame: null, referenceFrame: null })
}))
