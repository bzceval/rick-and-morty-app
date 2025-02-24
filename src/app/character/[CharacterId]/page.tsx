'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Character } from '@/types/types' 
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// API'den karakteri getir
async function getCharacter(id: string): Promise<Character | null> {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export default function CharacterDetail() {
  const { CharacterId } = useParams()
  const [character, setCharacter] = useState<Character | null>(null)

  useEffect(() => {
    if (CharacterId) {
      getCharacter(CharacterId as string).then(setCharacter)
    }
  }, [CharacterId])

  if (!character) return <p>Loading...</p>

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-auto rounded-lg"
        />
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle>{character.name}</CardTitle>
        <p className="text-muted-foreground">
          {character.status} - {character.gender}
        </p>
      </CardContent>
    </Card>
  )
}
