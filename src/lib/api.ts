import { useQuery } from '@tanstack/react-query'

const fetchCharacters = async (status?: string, gender?: string) => {
  const query = new URLSearchParams()
  if (status) query.append('status', status)
  if (gender) query.append('gender', gender)

  const response = await fetch(`https://rickandmortyapi.com/api/character?${query}`)
  if (!response.ok) throw new Error('Veri getirilemedi')
  return response.json()
}

export const useCharacters = (status?: string, gender?: string) => {
  return useQuery({
    queryKey: ['characters', status, gender],
    queryFn: () => fetchCharacters(status, gender),
    staleTime: 1000 * 60 * 5
  })
}
