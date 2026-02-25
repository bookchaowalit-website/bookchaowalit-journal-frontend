import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

interface JournalEntry {
  slug: string
  title: string
  date: string
  mood: string
  tags: string[]
  content: string
  createdAt: string
  updatedAt: string
}

interface JournalEntryFrontmatter {
  title?: string
  date: string
  mood: string
  tags?: string[]
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  try {
    const entriesDir = path.join(process.cwd(), 'content', 'journal')
    const entries = await fs.readdir(entriesDir)

    const mdxFiles = entries.filter(file => file.endsWith('.mdx'))

    const journalEntries: JournalEntry[] = []

    for (const file of mdxFiles) {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(entriesDir, file)
      const content = await fs.readFile(filePath, 'utf-8')

      const { data, content: mdxContent } = matter(content)

      // Validate required fields
      if (!data.date || !data.mood) {
        console.warn(`Skipping entry ${slug}: missing required fields`)
        continue
      }

      const entry: JournalEntry = {
        slug,
        title: data.title || slug,
        date: data.date,
        mood: data.mood,
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: mdxContent,
        createdAt: data.date,
        updatedAt: data.date
      }

      journalEntries.push(entry)
    }

    // Filter out entries with invalid dates
    const validEntries = journalEntries.filter(entry => {
      const date = new Date(entry.date)
      return !isNaN(date.getTime())
    })

    return validEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error getting journal entries:', error)
    return []
  }
}

export async function getEntryBySlug(slug: string): Promise<JournalEntry | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'journal', `${slug}.mdx`)
    const content = await fs.readFile(filePath, 'utf-8')

    const { data, content: mdxContent } = matter(content)

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      mood: data.mood,
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: mdxContent,
      createdAt: data.date,
      updatedAt: data.date
    }
  } catch (error) {
    console.error(`Error getting entry by slug ${slug}:`, error)
    return null
  }
}

export async function getEntriesByDateRange(startDate: string, endDate: string): Promise<JournalEntry[]> {
  try {
    const allEntries = await getJournalEntries()

    return allEntries.filter(entry => {
      const entryDate = new Date(entry.date)
      const start = new Date(startDate)
      const end = new Date(endDate)

      return entryDate >= start && entryDate <= end
    })
  } catch (error) {
    console.error('Error getting entries by date range:', error)
    return []
  }
}

export async function getEntriesByMood(mood: string): Promise<JournalEntry[]> {
  try {
    const allEntries = await getJournalEntries()

    return allEntries.filter(entry =>
      entry.mood.toLowerCase() === mood.toLowerCase()
    )
  } catch (error) {
    console.error(`Error getting entries by mood ${mood}:`, error)
    return []
  }
}

export async function getMoods(): Promise<string[]> {
  try {
    const allEntries = await getJournalEntries()

    const validMoods = allEntries
      .map(entry => entry.mood)
      .filter(mood => mood && typeof mood === 'string')

    const uniqueMoods = [...new Set(validMoods)]
    return uniqueMoods.sort()
  } catch (error) {
    console.error('Error getting moods:', error)
    return []
  }
}

export async function searchEntries(query: string): Promise<JournalEntry[]> {
  try {
    const allEntries = await getJournalEntries()
    const lowercaseQuery = query.toLowerCase()

    return allEntries.filter(entry =>
      entry.title.toLowerCase().includes(lowercaseQuery) ||
      entry.content.toLowerCase().includes(lowercaseQuery) ||
      (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))) ||
      entry.mood.toLowerCase().includes(lowercaseQuery)
    )
  } catch (error) {
    console.error('Error searching entries:', error)
    return []
  }
}