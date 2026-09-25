import { SCHEMES, Scheme } from '../data/schemes';
import { CitizenProfile } from '../../src/types/schemes';

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  schemeId?: string;
  documentList?: string[];
  officialUrl?: string;
}

export function handleGovBotChat(
  schemeId?: string,
  userMessage?: string,
  lang: string = 'en',
  profile?: CitizenProfile
) {
  const messageLower = (userMessage || '').toLowerCase();
  let targetScheme: Scheme | undefined = undefined;

  if (schemeId) {
    targetScheme = SCHEMES.find(s => s.id === schemeId);
  }

  if (!targetScheme && messageLower) {
    targetScheme = SCHEMES.find(s =>
      messageLower.includes(s.id) ||
      messageLower.includes(s.title.toLowerCase()) ||
      s.tags.some(t => messageLower.includes(t))
    );
  }

  let responseText = "";
  let documentList: string[] | undefined = undefined;
  let officialUrl: string | undefined = undefined;

  // Language greeting prefixes
  const greetings: Record<string, string> = {
    en: "Hello! I am **GovBot**, your AI Welfare Assistant.",
    hi: "नमस्ते! मैं **GovBot** हूँ, आपका AI सरकारी सहायता मित्र।",
    ta: "வணக்கம்! நான் **GovBot** AI உதவி உதவியாளன்.",
    te: "నమస్కారం! నేను మీ **GovBot** AI సహాయకుడిని.",
    mr: "नमस्कार! मी आपला **GovBot** AI मदतनीस आहे.",
    bn: "নমস্কার! আমি **GovBot** আপনার AI সহায়ক।"
  };

  const prefix = greetings[lang] || greetings['en'];

  // Contextual awareness snippet from citizen profile
  let profileContextMsg = "";
  if (profile) {
    profileContextMsg = `\n\n*(Using your saved profile: ${profile.age || 28} years, ${profile.occupation || 'Citizen'}, ${profile.state || 'India'}, Land: ${profile.landOwnership || 'None'})*`;
  }

  if (targetScheme) {
    officialUrl = targetScheme.officialPortalUrl;
    documentList = targetScheme.requiredDocuments;

    if (messageLower.includes('document') || messageLower.includes('paper') || messageLower.includes('proof') || messageLower.includes('காகிதம்') || messageLower.includes('दस्तावेज़')) {
      responseText = `${prefix} For **${targetScheme.title}**, you need the following **${targetScheme.requiredDocuments.length} mandatory documents**:

` + targetScheme.requiredDocuments.map(d => `• ${d}`).join('\n') + `

Estimated processing duration: **${targetScheme.processingTime || '15 to 30 Working Days'}**. You can track document readiness directly in your Document Vault.`;
    } else if (messageLower.includes('apply') || messageLower.includes('how') || messageLower.includes('process') || messageLower.includes('விண்ணப்பிக்க') || messageLower.includes('आवेदन')) {
      responseText = `${prefix} Here is the step-by-step application process for **${targetScheme.title}**:

1. **Verify Eligibility**: Age ${targetScheme.eligibilityCriteria.minAge || 18}+, Income limit: ${targetScheme.incomeGroup || 'Standard'}.
2. **Gather Documents**: Prepare ${targetScheme.requiredDocuments.slice(0, 2).join(', ')}.
3. **Official Portal**: Visit [${targetScheme.officialPortalUrl}](${targetScheme.officialPortalUrl}) or your nearest CSC e-Sevai Center.
4. **Processing Time**: ${targetScheme.processingTime || '15-30 Working Days'}.`;
    } else {
      responseText = `${prefix} **${targetScheme.title}** (${targetScheme.department}):

${targetScheme.fullDescription}

**Key Benefits**:
` + targetScheme.benefits.map(b => `• ${b}`).join('\n') + `

Target Beneficiary: **${targetScheme.targetGroup}** (Processing Time: **${targetScheme.processingTime || '15-30 Days'}**).`;
    }
  } else {
    // General Q&A Handling
    if (messageLower.includes('farmer') || messageLower.includes('kisan') || messageLower.includes('விவசாயி')) {
      responseText = `${prefix} We have 2 prime schemes for farmers:
1. **PM-KISAN**: ₹6,000 annual direct cash transfer in 3 installments.
2. **PM-KUSUM**: Up to 90% solar irrigation pump subsidy.

Would you like to check your eligibility for these farmer schemes?`;
    } else if (messageLower.includes('women') || messageLower.includes('girl') || messageLower.includes('மகளிர்')) {
      responseText = `${prefix} Prime schemes for women & girl children:
1. **Sukanya Samriddhi Yojana**: 8.2% tax-free savings for girl child education.
2. **Kalaignar Magalir Urimai Thogai** (Tamil Nadu): ₹1,000 monthly grant for women heads.
3. **Ladli Behna Yojana** (MP): ₹1,250 monthly transfer for women.
4. **PM Matru Vandana**: ₹5,000 maternity nutrition grant.`;
    } else if (messageLower.includes('scholarship') || messageLower.includes('student') || messageLower.includes('மாணவர்')) {
      responseText = `${prefix} Top Student Scholarships:
1. **Post-Matric Scholarship**: 100% tuition reimbursement + monthly stipend for SC/ST/OBC students.
2. **Kanyashree Prakalpa**: ₹25,000 education grant for girl students.`;
    } else {
      responseText = `${prefix} How can I assist you today? You can ask me questions like:
• *"What documents do I need for PM-KISAN?"*
• *"How do I apply for Ayushman Bharat health card?"*
• *"Show schemes for women in Tamil Nadu."*
• *"What is the processing time for PM MUDRA Loan?"*`;
    }
  }

  return {
    text: responseText + profileContextMsg,
    documentList,
    officialUrl,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
