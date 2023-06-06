import { create } from 'zustand'
import { IHistory } from '@/types/history'

interface IHistoryState {
  historys: IHistory[]
  addHistory: (history: IHistory) => void
}

export const useHistory = create<IHistoryState>((set, get) => ({
  historys: [],
  addHistory: (history: IHistory) => set({ historys: [...get().historys, history] })
}))
