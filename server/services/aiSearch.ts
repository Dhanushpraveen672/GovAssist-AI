import { SCHEMES, Scheme } from '../data/schemes';
import { searchSchemesVector } from './vectorSearch';

export interface AISearchResult {
  query: string;
  detectedState?: string;
  detectedCategory?: string;
  detectedIncomeGroup?: string;
  totalMatches: number;
  data: { scheme: Scheme; matchScore: number; relevance: string }[];
}

const KNOWN_STATES = [
  'Tamil Nadu', 'Madhya Pradesh', 'West Bengal', 'Andhra Pradesh',
  'Telangana', 'Karnataka', 'Kerala', 'Bihar', 'Uttar Pradesh',
  'Delhi', 'Punjab', 'Gujarat', 'Maharashtra'
];

const CATEGORY_MAP: Record<string, Scheme['category']> = {
  farmer: 'Farmers',
  farmers: 'Farmers',
  agriculture: 'Farmers',
  kisan: 'Farmers',
  crop: 'Farmers',
  woman: 'Women',
  women: 'Women',
  girl: 'Women',
  lady: 'Women',
  female: 'Women',
  student: 'Students',
  students: 'Students',
  scholarship: 'Students',
  college: 'Students',
  education: 'Students',
  health: 'Healthcare',
  healthcare: 'Healthcare',
  hospital: 'Healthcare',
  insurance: 'Healthcare',
  medical: 'Healthcare',
  house: 'Housing',
  housing: 'Housing',
  home: 'Housing',
  pucca: 'Housing',
  senior: 'Seniors',
  seniors: 'Seniors',
  pension: 'Seniors',
  old: 'Seniors',
  elderly: 'Seniors',
  business: 'MSME',
  msme: 'MSME',
  loan: 'MSME',
  vendor: 'MSME',
  artisan: 'MSME',
  disability: 'Disability',
  disabled: 'Disability',
  divyangjan: 'Disability',
  handicapped: 'Disability',
};

export function performAISearch(
  rawQuery: string,
  stateFilter: string = 'All',
  categoryFilter: string = 'All',
  incomeFilter: string = 'All'
): AISearchResult {
  const queryLower = (rawQuery || '').toLowerCase().trim();

  let detectedState: string | undefined = stateFilter !== 'All' ? stateFilter : undefined;
  let detectedCategory: string | undefined = categoryFilter !== 'All' ? categoryFilter : undefined;
  let detectedIncomeGroup: string | undefined = incomeFilter !== 'All' ? incomeFilter : undefined;

  // Natural Language Entity Extraction
  if (queryLower) {
    // 1. Detect State in Query
    for (const st of KNOWN_STATES) {
      if (queryLower.includes(st.toLowerCase())) {
        detectedState = st;
        break;
      }
    }

    // 2. Detect Category in Query
    const words = queryLower.split(/\s+/);
    for (const word of words) {
      if (CATEGORY_MAP[word]) {
        detectedCategory = CATEGORY_MAP[word];
        break;
      }
    }
  }

  // Perform Vector Search
  const vectorResults = searchSchemesVector(rawQuery, detectedCategory || 'All');

  // Filter by state if specified
  let finalResults = vectorResults;

  if (detectedState && detectedState !== 'All' && detectedState !== 'All India (Central)') {
    finalResults = finalResults.filter(item =>
      !item.scheme.state || item.scheme.state.toLowerCase() === detectedState!.toLowerCase() || item.scheme.sponsoringBody === 'Central'
    );
  }

  if (detectedIncomeGroup && detectedIncomeGroup !== 'All' && detectedIncomeGroup !== 'Any') {
    finalResults = finalResults.filter(item =>
      !item.scheme.incomeGroup || item.scheme.incomeGroup === detectedIncomeGroup || item.scheme.incomeGroup === 'All Income Groups'
    );
  }

  return {
    query: rawQuery,
    detectedState,
    detectedCategory,
    detectedIncomeGroup,
    totalMatches: finalResults.length,
    data: finalResults.map(item => ({
      scheme: item.scheme,
      matchScore: item.score ? Math.round(item.score * 100) : 85,
      relevance: item.relevance || 'Vector Match'
    }))
  };
}
