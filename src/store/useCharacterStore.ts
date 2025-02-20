import { Character } from '@/types/types'
import { create } from 'zustand'

interface CharacterState {
  character: Character | null
  setCharacter: (character: Character) => void
}

export const useCharacterStore = create<CharacterState>((set) => ({
  character: null,
  setCharacter: (character) => set({ character })
}))
