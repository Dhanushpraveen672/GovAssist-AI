import { SCHEMES, Scheme } from '../data/schemes';
import { CitizenProfile, EligibilityResult } from '../../src/types/schemes';

export type { CitizenProfile, EligibilityResult };

export function evaluateEligibility(profile: CitizenProfile): EligibilityResult[] {
  return SCHEMES.map(scheme => {
    const rules = scheme.eligibilityCriteria;
    const matched: string[] = [];
    const unmet: string[] = [];
    let scorePoints = 100;

    // 1. State Jurisdiction Check
    if (scheme.sponsoringBody === 'State' && scheme.state) {
      if (profile.state) {
        if (profile.state.toLowerCase() === scheme.state.toLowerCase()) {
          matched.push(`Resident of ${scheme.state} state matched`);
        } else {
          unmet.push(`State scheme restricted to ${scheme.state} residents`);
          scorePoints -= 45;
        }
      }
    } else {
      matched.push(`Central Government Scheme - Open for all Indian States`);
    }

    // 2. Age Check
    if (rules.minAge !== undefined || rules.maxAge !== undefined) {
      if (profile.age !== undefined) {
        const minOk = rules.minAge === undefined || profile.age >= rules.minAge;
        const maxOk = rules.maxAge === undefined || profile.age <= rules.maxAge;
        if (minOk && maxOk) {
          matched.push(`Age ${profile.age} meets requirement (${rules.minAge || 0} to ${rules.maxAge || '100+'} years)`);
        } else {
          unmet.push(`Age ${profile.age} outside allowed range (${rules.minAge || 0} - ${rules.maxAge || '100+'})`);
          scorePoints -= 35;
        }
      }
    }

    // 3. Gender Check
    if (rules.gender && rules.gender !== 'All') {
      if (profile.gender) {
        if (profile.gender === rules.gender) {
          matched.push(`Gender requirement (${rules.gender}) matched`);
        } else {
          unmet.push(`Scheme specifically targeted for ${rules.gender} applicants`);
          scorePoints -= 40;
        }
      }
    }

    // 4. Income Check
    if (rules.maxAnnualIncome !== undefined) {
      if (profile.annualIncome !== undefined) {
        if (profile.annualIncome <= rules.maxAnnualIncome) {
          matched.push(`Annual income ₹${profile.annualIncome.toLocaleString('en-IN')} is within maximum limit of ₹${rules.maxAnnualIncome.toLocaleString('en-IN')}`);
        } else {
          unmet.push(`Annual income ₹${profile.annualIncome.toLocaleString('en-IN')} exceeds limit of ₹${rules.maxAnnualIncome.toLocaleString('en-IN')}`);
          scorePoints -= 45;
        }
      }
    }

    // 5. Disability Check
    if (rules.disabilityOnly) {
      if (profile.isDisability) {
        matched.push(`Disability Certificate (Divyangjan 40%+) verified`);
      } else {
        unmet.push(`Requires Divyangjan Disability Certificate (40%+ disability)`);
        scorePoints -= 50;
      }
    }

    // 6. Social Category Check (SC/ST/OBC)
    if (rules.categories && rules.categories.length > 0) {
      if (profile.category) {
        if (rules.categories.includes(profile.category)) {
          matched.push(`Category (${profile.category}) qualifies for reservation benefits`);
        } else {
          unmet.push(`Restricted to ${rules.categories.join(' / ')} social categories`);
          scorePoints -= 35;
        }
      }
    }

    // 7. Farmer & Land Ownership Check
    if (rules.farmerOnly) {
      const hasLand = profile.landOwnership && profile.landOwnership !== 'None';
      if (profile.isFarmer || profile.occupation === 'Farmer' || hasLand) {
        matched.push(`Landholding / Farmer status verified (${profile.landOwnership || 'Cultivable Land'})`);
      } else {
        unmet.push(`Requires cultivable agricultural landholding ownership`);
        scorePoints -= 35;
      }
    }

    // 8. BPL Household Check
    if (rules.bplOnly) {
      if (profile.isBpl) {
        matched.push(`BPL / Priority Ration Card verified`);
      } else {
        unmet.push(`Requires Below Poverty Line (BPL) ration card verification`);
        scorePoints -= 30;
      }
    }

    // 9. Student Status Check
    if (rules.studentOnly) {
      if (profile.isStudent || profile.occupation === 'Student') {
        matched.push(`Enrolled student status verified`);
      } else {
        unmet.push(`Requires active student enrollment in recognized institution`);
        scorePoints -= 35;
      }
    }

    const finalScore = Math.max(Math.min(scorePoints, 100), 10);

    let status: EligibilityResult['status'] = 'Eligible';
    if (finalScore >= 80) status = 'Eligible';
    else if (finalScore >= 50) status = 'Partially Eligible';
    else status = 'Ineligible';

    const customGuidance = unmet.length === 0
      ? "You fulfill all qualification criteria for this scheme!"
      : `Action required: ${unmet.slice(0, 2).join(' and ')}.`;

    return {
      scheme,
      matchScore: finalScore,
      status,
      matchedCriteria: matched,
      unmetCriteria: unmet,
      customGuidance
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
