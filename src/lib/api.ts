import { Character } from '@/types/types'
import { useQuery } from '@tanstack/react-query'

const API_URL = 'https://rickandmortyapi.com/api/character'

export const getCharacters = async (
  status = '',
  gender = ''
): Promise<Character> => {
  const query = new URLSearchParams()
  if (status) query.append('status', status)
  if (gender) query.append('gender', gender)

  const res = await fetch(`${API_URL}?${query}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

export const useCharacters = (status?: string, gender?: string) => {
  return useQuery<Character>({
    queryKey: ['characters', status, gender],
    queryFn: () => getCharacters(status, gender),
    staleTime: 1000 * 60 * 5
  })
}
