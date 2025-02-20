import { create } from 'zustand'

type FilterState = {
  status: string
  gender: string
  setStatus: (status: string) => void
  setGender: (gender: string) => void
}

export const useFilters = create<FilterState>((set) => ({
  status: '',
  gender: '',
  setStatus: (status) => set({ status }),
  setGender: (gender) => set({ gender })
}))
