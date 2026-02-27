import { getJournalEntries, getMoods } from '@/lib/mdx'
import Link from 'next/link'

interface JournalEntry {
  slug: string
  title: string
  date: string
  mood: string
  tags: string[]
  content: string
}

const moodColors: Record<string, string> = {
  happy: 'bg-yellow-100 border-yellow-400',
  productive: 'bg-green-100 border-green-400',
  reflective: 'bg-blue-100 border-blue-400',
  excited: 'bg-pink-100 border-pink-400',
  frustrated: 'bg-red-100 border-red-400',
  grateful: 'bg-purple-100 border-purple-400',
  calm: 'bg-teal-100 border-teal-400'
}

const moodIcons: Record<string, string> = {
  happy: '😊',
  productive: '💪',
  reflective: '🤔',
  excited: '🎉',
  frustrated: '😤',
  grateful: '🙏',
  calm: '😌'
}

export default async function HomePage() {
  const entries = await getJournalEntries()
  const moods = await getMoods() || []

  const moodStats = (moods || []).map(mood => ({
    mood,
    count: entries.filter(e => e.mood === mood).length
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">My Journal</h1>
            <nav className="space-x-4">
              <Link href="/journal" className="text-gray-600 hover:text-gray-900">
                All Entries
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Mood Summary */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Mood Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {moodStats.map(({ mood, count }) => (
              <div
                key={mood}
                className={`${moodColors[mood] || 'bg-gray-100 border-gray-300'} rounded-lg p-4 border-2 text-center`}
              >
                <div className="text-2xl mb-2">{moodIcons[mood] || '📝'}</div>
                <div className="font-medium capitalize">{mood}</div>
                <div className="text-sm text-gray-600">{count} entries</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Entries */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Entries</h2>
          {entries.length > 0 ? (
            <div className="space-y-4">
              {entries.slice(0, 5).map(entry => (
                <Link
                  key={entry.slug}
                  href={`/journal/${entry.slug}`}
                  className={`block p-4 rounded-lg hover:shadow-md transition-shadow ${
                    moodColors[entry.mood] || 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{entry.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} • {entry.mood}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {entry.tags && Array.isArray(entry.tags) && entry.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white bg-opacity-60 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-2xl ml-4">{moodIcons[entry.mood] || '📝'}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No journal entries yet. Start writing your first entry!
            </div>
          )}
          <Link
            href="/journal"
            className="block text-center mt-4 text-blue-600 hover:text-blue-800"
          >
            View all entries →
          </Link>
        </section>
      </main>
    </div>
  )
}
