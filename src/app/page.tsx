import CharacterList from './components/CharacterList'
import { getCharacters } from '@/lib/api'

export default async function Home() {
  const data = await getCharacters()

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <CharacterList initialData={data} />
    </div>
  )
}
