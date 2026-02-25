import { getEntryBySlug } from '@/lib/mdx'
import Link from 'next/link'

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

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = await getEntryBySlug(params.slug)

  if (!entry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Entry Not Found</h1>
          <Link
            href="/journal"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to all entries
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/journal"
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to all entries
            </Link>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                moodColors[entry.mood] || 'bg-gray-100'
              }`}>
                {moodIcons[entry.mood] || '📝'} {entry.mood}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{entry.title}</h1>
            <p className="text-gray-600">
              {new Date(entry.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap">{entry.content}</div>
          </div>

          {(entry.tags && entry.tags.length > 0) && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(entry.tags || []).map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            View Timeline
          </Link>
          <Link
            href="/journal"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            All Entries
          </Link>
        </div>
      </main>
    </div>
  )
}