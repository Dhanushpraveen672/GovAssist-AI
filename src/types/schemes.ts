export interface Scheme {
  id: string;
  title: string;
  department?: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Farmers' | 'Women' | 'Students' | 'Seniors' | 'Healthcare' | 'Housing' | 'MSME' | 'Disability';
  targetGroup: string;
  sponsoringBody: 'Central' | 'State';
  state?: string; // State name if state scheme
  incomeGroup?: 'Below ₹1L' | '₹1L - ₹2.5L' | '₹2.5L - ₹6L' | 'EWS / BPL' | 'All Income Groups';
  deadline?: string;
  processingTime?: string; // e.g. "15 to 30 Working Days"
  benefits: string[];
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    gender?: 'All' | 'Female' | 'Male';
    maxAnnualIncome?: number; // In INR
    occupations?: string[];
    categories?: string[];
    bplOnly?: boolean;
    disabilityOnly?: boolean;
    studentOnly?: boolean;
    farmerOnly?: boolean;
    customRules?: string[];
  };
  requiredDocuments: string[];
  officialPortalUrl: string;
  tags: string[];
}

export interface CitizenProfile {
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  state?: string;
  annualIncome?: number; // INR
  occupation?: string;
  category?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  isDisability?: boolean;
  familySize?: number;
  landOwnership?: 'None' | 'Small (< 2 Acres)' | 'Marginal (2 - 5 Acres)' | 'Large (> 5 Acres)';
  isBpl?: boolean;
  isStudent?: boolean;
  isFarmer?: boolean;
}

export interface EligibilityResult {
  scheme: Scheme;
  matchScore: number; // 0 to 100
  status: 'Eligible' | 'Partially Eligible' | 'Ineligible';
  matchedCriteria: string[];
  unmetCriteria: string[];
  customGuidance: string;
}
