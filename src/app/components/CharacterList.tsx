'use client'

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useCharacters } from '@/lib/api'
import { useFilters } from '@/store/useFilters'
import { Character } from '@/types/types'
import Link from 'next/link'

interface CharacterApiResponse {
  results: Character[]
}

export default function CharacterList({
  initialData
}: {
  initialData: CharacterApiResponse
}) {
  const { status, gender, setStatus, setGender } = useFilters()

  const {
    data = initialData,
    isLoading,
    error
  } = useCharacters(
    status === 'all' ? '' : status,
    gender === 'all' ? '' : gender
  )
  const characters = 'results' in data ? data.results : []

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-6 items-center justify-center py-8">
        <Select onValueChange={setStatus} value={status || 'all'}>
          <SelectTrigger className="w-full md:w-[180px] border-foreground focus:ring-foreground">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setGender} value={gender || 'all'}>
          <SelectTrigger className="w-full md:w-[180px] border-foreground focus:ring-foreground">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setStatus('all')
            setGender('all')
          }}
          variant="outline"
          className="w-full md:w-auto border-foreground focus:ring-foreground group hover:bg-foreground hover:text-background hover:border-foreground"
        >
          <span className="group-hover:text-background">Reset Filters</span>
        </Button>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            An error occurred while loading data.
          </AlertDescription>
        </Alert>
      )}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {characters.map((character: Character) => (
          <Link key={character.id} href={`/character/${character.id}`}>
            <Card className="h-full flex flex-col overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-background">
              <CardHeader className="p-0">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-auto rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-1 p-4 text-center flex flex-col justify-between">
                <CardTitle className="text-lg">{character.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {character.status} - {character.gender}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
