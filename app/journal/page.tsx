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

export default async function JournalPage() {
  const entries = await getJournalEntries() || []
  const moods = await getMoods() || []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Journal Entries</h1>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="">All Moods</option>
              {moods.map(mood => (
                <option key={mood} value={mood}>{mood}</option>
              ))}
            </select>

            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="">All Tags</option>
              {[...new Set((entries || []).flatMap(e => e.tags || []))].map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search entries..."
              className="px-4 py-2 border rounded-lg bg-white flex-1"
            />
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          {entries.map(entry => (
            <Link
              key={entry.slug}
              href={`/journal/${entry.slug}`}
              className={`block p-6 rounded-lg hover:shadow-lg transition-all ${
                moodColors[entry.mood] || 'bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{moodIcons[entry.mood] || '📝'}</span>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{entry.title}</h2>
                      <p className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {entry.content.substring(0, 200)}...
                  </p>

                  {(entry.tags && entry.tags.length > 0) && (
                    <div className="flex flex-wrap gap-2">
                      {(entry.tags || []).map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white bg-opacity-60 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No journal entries yet. Start writing your first entry!</p>
          </div>
        )}
      </main>
    </div>
  )
}