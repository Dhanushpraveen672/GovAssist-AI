import { SCHEMES, Scheme } from '../data/schemes';

function tokenize(text: string): string[] {
  const stopwords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by',
    'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'from', 'up', 'down', 'of', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
    'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
    'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will',
    'just', 'don', 'should', 'now', 'i', 'am', 'is', 'are', 'was', 'were', 'looking',
    'need', 'want', 'get', 'help', 'my', 'me', 'please', 'give', 'scheme', 'schemes'
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopwords.has(word));
}

function getTermFrequency(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {};
  tokens.forEach(token => {
    tf[token] = (tf[token] || 0) + 1;
  });
  return tf;
}

interface IndexedSchemeDoc {
  scheme: Scheme;
  tokens: string[];
  tf: Record<string, number>;
  magnitude: number;
}

let indexedDocsCache: IndexedSchemeDoc[] | null = null;

function getIndexedDocs(): IndexedSchemeDoc[] {
  if (indexedDocsCache) return indexedDocsCache;

  indexedDocsCache = SCHEMES.map(scheme => {
    const combinedText = [
      scheme.title,
      scheme.shortDescription,
      scheme.fullDescription,
      scheme.category,
      scheme.targetGroup,
      scheme.tags.join(' '),
      scheme.benefits.join(' '),
      scheme.eligibilityCriteria.occupations?.join(' ') || '',
      scheme.eligibilityCriteria.categories?.join(' ') || '',
    ].join(' ');

    const tokens = tokenize(combinedText);
    const tf = getTermFrequency(tokens);

    let sumSq = 0;
    Object.values(tf).forEach(val => {
      sumSq += val * val;
    });
    const magnitude = Math.sqrt(sumSq);

    return {
      scheme,
      tokens,
      tf,
      magnitude
    };
  });

  return indexedDocsCache;
}

export function searchSchemesVector(query: string, categoryFilter?: string): { scheme: Scheme; score: number; relevance: string }[] {
  if (!query || query.trim() === '') {
    let results = SCHEMES;
    if (categoryFilter && categoryFilter !== 'All') {
      results = results.filter(s => s.category.toLowerCase() === categoryFilter.toLowerCase());
    }
    return results.map(scheme => ({ scheme, score: 1.0, relevance: 'Exact Match' }));
  }

  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return SCHEMES.map(scheme => ({ scheme, score: 1.0, relevance: 'Direct' }));
  }

  const queryTf = getTermFrequency(queryTokens);
  let querySumSq = 0;
  Object.values(queryTf).forEach(val => {
    querySumSq += val * val;
  });
  const queryMagnitude = Math.sqrt(querySumSq);

  const indexedDocs = getIndexedDocs();

  const scoredResults = indexedDocs.map(doc => {
    let dotProduct = 0;
    Object.entries(queryTf).forEach(([token, count]) => {
      if (doc.tf[token]) {
        let weight = 1.0;
        if (doc.scheme.tags.some(t => t.includes(token))) weight = 2.5;
        if (doc.scheme.title.toLowerCase().includes(token)) weight = 3.0;
        if (doc.scheme.category.toLowerCase().includes(token)) weight = 2.0;

        dotProduct += count * doc.tf[token] * weight;
      }
    });

    const cosineSimilarity = (queryMagnitude && doc.magnitude)
      ? dotProduct / (queryMagnitude * doc.magnitude)
      : 0;

    return {
      scheme: doc.scheme,
      score: Math.min(Math.round(cosineSimilarity * 100) / 100, 1.0)
    };
  });

  let filtered = scoredResults;
  if (categoryFilter && categoryFilter !== 'All') {
    filtered = filtered.filter(item => item.scheme.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  filtered.sort((a, b) => b.score - a.score);

  return filtered.map(item => ({
    scheme: item.scheme,
    score: item.score > 0 ? Math.min(Math.max(item.score * 1.5, 0.4), 0.98) : 0.2,
    relevance: item.score > 0.4 ? 'High Vector Similarity' : (item.score > 0.1 ? 'Moderate Match' : 'General Match')
  }));
}
