import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Character } from '@/types/types'
import { notFound } from 'next/navigation'

async function getCharacter(id: string): Promise<Character | null> {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function CharacterDetail({
  params
}: {
  params: Promise<{ CharacterId: string }> // ✅ params'ı Promise olarak tanımla
}) {
  const { CharacterId } = await params // ✅ params'ı `await` ile çöz

  const character = await getCharacter(CharacterId)

  if (!character) return notFound()

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
