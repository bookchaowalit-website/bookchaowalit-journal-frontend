import { NextRequest, NextResponse } from 'next/server';
import { getJournalEntries, getEntryBySlug, getEntriesByDateRange, getEntriesByMood, getMoods, searchEntries } from '@/lib/mdx';

export async function POST(request: NextRequest) {
  let requestId: number | string = 0;

  try {
    const body = await request.json();
    const { method, params } = body;

    let result;

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: 'Journal API',
            version: '1.0.0',
            description: 'Personal journal and diary with mood tracking'
          }
        };
        break;

      case 'tools/list':
        result = {
          tools: [
            {
              name: 'get_entries',
              description: 'Get all journal entries with optional filtering',
              inputSchema: {
                type: 'object',
                properties: {
                  mood: {
                    type: 'string',
                    description: 'Filter by mood'
                  },
                  tag: {
                    type: 'string',
                    description: 'Filter by tag'
                  },
                  limit: {
                    type: 'number',
                    description: 'Limit results'
                  }
                }
              }
            },
            {
              name: 'get_entry_by_slug',
              description: 'Get a specific journal entry by slug',
              inputSchema: {
                type: 'object',
                properties: {
                  slug: {
                    type: 'string',
                    description: 'Entry slug'
                  }
                },
                required: ['slug']
              }
            },
            {
              name: 'get_entries_by_date',
              description: 'Get entries within a date range',
              inputSchema: {
                type: 'object',
                properties: {
                  startDate: {
                    type: 'string',
                    description: 'Start date (YYYY-MM-DD)'
                  },
                  endDate: {
                    type: 'string',
                    description: 'End date (YYYY-MM-DD)'
                  }
                },
                required: ['startDate', 'endDate']
              }
            },
            {
              name: 'get_moods',
              description: 'Get all unique moods',
              inputSchema: {
                type: 'object',
                properties: {}
              }
            },
            {
              name: 'search_entries',
              description: 'Search journal entries',
              inputSchema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'Search query'
                  }
                },
                required: ['query']
              }
            }
          ]
        };
        break;

      case 'tools/call':
        const toolName = params?.name;
        const args = params?.arguments;

        switch (toolName) {
          case 'get_entries':
            let entries = await getJournalEntries();

            if (args?.mood) {
              entries = entries.filter(entry => entry.mood.toLowerCase() === args.mood.toLowerCase());
            }

            if (args?.tag) {
              entries = entries.filter(entry =>
                entry.tags && entry.tags.includes(args.tag)
              );
            }

            if (args?.limit) {
              entries = entries.slice(0, args.limit);
            }

            result = entries.map(entry => ({
              slug: entry.slug,
              title: entry.title,
              date: entry.date,
              mood: entry.mood,
              tags: entry.tags || [],
              excerpt: entry.content?.substring(0, 150) + '...' || ''
            }));
            break;

          case 'get_entry_by_slug':
            const entry = await getEntryBySlug(args?.slug);
            result = entry || null;
            break;

          case 'get_entries_by_date':
            const dateEntries = await getEntriesByDateRange(args?.startDate, args?.endDate);
            result = dateEntries.map(entry => ({
              slug: entry.slug,
              title: entry.title,
              date: entry.date,
              mood: entry.mood,
              tags: entry.tags || []
            }));
            break;

          case 'get_moods':
            const moods = await getMoods();
            result = moods;
            break;

          case 'search_entries':
            const searchResults = await searchEntries(args?.query);
            result = searchResults.map(entry => ({
              slug: entry.slug,
              title: entry.title,
              date: entry.date,
              mood: entry.mood,
              tags: entry.tags || [],
              excerpt: entry.content?.substring(0, 150) + '...' || ''
            }));
            break;

          default:
            throw new Error(`Unknown tool: ${toolName}`);
        }
        break;

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId,
      result
    });

  } catch (error) {
    return NextResponse.json({
      jsonrpc: '2.0',
      id: requestId || 1,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: error
      }
    }, { status: 500 });
  }
}
