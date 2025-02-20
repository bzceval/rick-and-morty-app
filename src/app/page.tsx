'use client'

import { useCharacters } from '@/lib/api'
import { useFilters } from '@/store/useFilters'
import { Character } from '@/types/types'

export default function Home() {
  const { status, gender, setStatus, setGender } = useFilters()
  const { data, isLoading, error } = useCharacters(status, gender)

  if (isLoading) return <p>Yükleniyor...</p>
  if (error) return <p>Hata oluştu.</p>

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tümü</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          className="p-2 border"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Tümü</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.results.map((character: Character) => (
          <div key={character.id} className="p-4 border rounded-lg">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-auto"
            />
            <h2 className="text-lg font-bold">{character.name}</h2>
            <p>
              {character.status} - {character.gender}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
