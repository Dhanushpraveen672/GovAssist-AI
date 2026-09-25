import { Scheme } from '../../src/types/schemes';

export type { Scheme };

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    department: "Ministry of Agriculture & Farmers Welfare",
    shortDescription: "Direct income support of ₹6,000 per year for landholding farmer families across India.",
    fullDescription: "PM-KISAN is a Central Sector scheme providing direct financial income support of ₹6,000 per year in 3 equal installments of ₹2,000 directly into the bank accounts of small and marginal landholding farmer families.",
    category: "Farmers",
    targetGroup: "Small & Marginal Farmers",
    sponsoringBody: "Central",
    incomeGroup: "All Income Groups",
    deadline: "Open All Year (Rolling Registration)",
    processingTime: "7 to 15 Working Days",
    benefits: [
      "₹6,000 annual direct benefit transfer in 3 equal installments of ₹2,000",
      "Direct bank deposit with e-KYC digital integration",
      "Zero middleman fee"
    ],
    eligibilityCriteria: {
      minAge: 18,
      gender: "All",
      farmerOnly: true,
      customRules: [
        "Must hold cultivable land registered in citizen or family name",
        "Institutional landholders and high income taxpayers excluded"
      ]
    },
    requiredDocuments: [
      "Aadhaar Card linked with Mobile Number",
      "Land Ownership Records (7/12 / Khatauni / Pattadar Passbook)",
      "Savings Bank Account Passbook (Aadhaar Seeded)",
      "e-KYC Verification Certificate"
    ],
    officialPortalUrl: "https://pmkisan.gov.in",
    tags: ["farmer", "agriculture", "kisan", "direct benefit", "financial assistance", "pm kisan", "crop support", "tamil nadu"]
  },
  {
    id: "ayushman-bharat",
    title: "Ayushman Bharat - PM-JAY (Health Insurance)",
    department: "Ministry of Health and Family Welfare",
    shortDescription: "Free cashless health insurance coverage up to ₹5 Lakh per family per year for hospital care.",
    fullDescription: "Ayushman Bharat PM-JAY provides health assurance cover of ₹5 Lakhs per family per year for secondary and tertiary hospitalization across empaneled public and private hospitals across India.",
    category: "Healthcare",
    targetGroup: "Low-income & Vulnerable Families",
    sponsoringBody: "Central",
    incomeGroup: "EWS / BPL",
    deadline: "Open All Year",
    processingTime: "Instant (Same Day e-KYC Card Generation)",
    benefits: [
      "Cashless medical treatment cover up to ₹500,000 per family per year",
      "Covers 1,900+ medical procedures, surgeries, and pre-existing conditions",
      "Nationwide hospital portability"
    ],
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      gender: "All",
      maxAnnualIncome: 300000,
      bplOnly: true,
      customRules: [
        "Listed under SECC 2011 database or holding active BPL / Antyodaya Ration Card",
        "Families without adult earning member"
      ]
    },
    requiredDocuments: [
      "Aadhaar Card of all family members",
      "Ration Card (BPL / Priority Household)",
      "Mobile Number linked with Aadhaar"
    ],
    officialPortalUrl: "https://pmjay.gov.in",
    tags: ["health", "healthcare", "medical insurance", "ayushman bharat", "free hospital treatment", "bpl", "cashless cover"]
  },
  {
    id: "pm-awas-yojana",
    title: "PM Awas Yojana (Pradhan Mantri Housing Scheme)",
    department: "Ministry of Housing and Urban Affairs",
    shortDescription: "Financial assistance up to ₹2.67 Lakh subsidy for constructing or buying a pucca house.",
    fullDescription: "Pradhan Mantri Awas Yojana provides credit-linked interest subsidy and direct grants to Economically Weaker Sections (EWS), LIG, and rural homeless families to build or buy a pucca home.",
    category: "Housing",
    targetGroup: "EWS, Low-income & Homeless Rural Families",
    sponsoringBody: "Central",
    incomeGroup: "Below ₹1L",
    deadline: "31st December 2026",
    processingTime: "30 to 45 Working Days",
    benefits: [
      "Up to ₹2.67 Lakh interest subsidy on home loans",
      "Direct grant of ₹1.20 Lakh to ₹1.30 Lakh for rural house construction",
      "Toilet construction grant under Swachh Bharat Mission integration"
    ],
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 70,
      gender: "All",
      maxAnnualIncome: 600000,
      customRules: [
        "Family must not own a pucca house anywhere in India",
        "Female ownership or co-ownership mandatory for urban component"
      ]
    },
    requiredDocuments: [
      "Aadhaar Card",
      "Income Certificate from Tehsildar / Competent Authority",
      "Affidavit of not owning a pucca house",
      "Bank Account details",
      "Land Record documents (for rural self-construction)"
    ],
    officialPortalUrl: "https://pmaymis.gov.in",
    tags: ["housing", "home loan subsidy", "pucca house", "pmay", "ews", "rural housing", "shelter"]
  },
  {
    id: "sukanya-samriddhi",
    title: "Sukanya Samriddhi Yojana (Girl Child Savings)",
    department: "Ministry of Finance / India Post",
    shortDescription: "High-interest government savings scheme for girl child's higher education and marriage.",
    fullDescription: "Sukanya Samriddhi Yojana is a small savings scheme offering a tax-free interest rate of 8.2% p.a. to build a dedicated financial fund for the girl child's higher studies.",
    category: "Women",
    targetGroup: "Parents / Legal Guardians of Girl Child",
    sponsoringBody: "Central",
    incomeGroup: "All Income Groups",
    deadline: "Open All Year",
    processingTime: "1 to 3 Working Days",
    benefits: [
      "8.2% p.a. highest government compounding interest rate",
      "EEE Tax exemption under Section 80C and Section 10(11)",
      "Partial withdrawal permitted after girl turns 18"
    ],
    eligibilityCriteria: {
      maxAge: 10,
      gender: "Female",
      customRules: [
        "Account opened by guardian for girl child under age 10",
        "Maximum 2 girl child accounts per family"
      ]
    },
    requiredDocuments: [
      "Birth Certificate of Girl Child",
      "Aadhaar Card & PAN of Parent/Guardian",
      "Passport size photos"
    ],
    officialPortalUrl: "https://www.indiapost.gov.in",
    tags: ["girl child", "women", "sukanya samriddhi", "savings", "education", "beti bachao", "tax free"]
  },
  {
    id: "post-matric-scholarship",
    title: "Post-Matric Scholarship for SC / ST / OBC Students",
    department: "Ministry of Social Justice and Empowerment",
    shortDescription: "100% tuition fee reimbursement and monthly maintenance stipend for higher studies.",
    fullDescription: "Provides 100% tuition fee waivers and maintenance allowances for SC, ST, and OBC students pursuing post-secondary education (Class 11 to PhD).",
    category: "Students",
    targetGroup: "SC / ST / OBC Higher Education Students",
    sponsoringBody: "Central",
    incomeGroup: "₹1L - ₹2.5L",
    deadline: "31st October 2026",
    processingTime: "15 to 30 Working Days",
    benefits: [
      "100% tuition fee and course fee reimbursement",
      "Monthly maintenance stipend up to ₹13,500/year",
      "Disability allowance for special needs scholars"
    ],
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 35,
      gender: "All",
      maxAnnualIncome: 250000,
      studentOnly: true,
      categories: ["SC", "ST", "OBC"],
      customRules: ["Must be enrolled in recognized post-matric course"]
    },
    requiredDocuments: [
      "Caste Certificate",
      "Valid Income Certificate",
      "Mark sheets of previous qualifying exams",
      "College Admission Fee Receipt & Student ID Card"
    ],
    officialPortalUrl: "https://scholarships.gov.in",
    tags: ["scholarship", "students", "education", "sc st obc", "tuition fee waiver", "higher education"]
  },
  {
    id: "pm-mudra-yojana",
    title: "Pradhan Mantri MUDRA Yojana (Micro Business Loans)",
    department: "Ministry of Finance",
    shortDescription: "Collateral-free business loan up to ₹10 Lakh for micro enterprises and small traders.",
    fullDescription: "PMMY offers collateral-free loans to micro-enterprises under Shishu (up to ₹50,000), Kishore (₹50k-₹5L), and Tarun (₹5L-₹10L) to boost entrepreneurship.",
    category: "MSME",
    targetGroup: "Small Business Owners & Micro Entrepreneurs",
    sponsoringBody: "Central",
    incomeGroup: "All Income Groups",
    deadline: "Open All Year",
    processingTime: "7 to 14 Working Days",
    benefits: [
      "Zero collateral or third party guarantee needed",
      "Low interest rate starting at 8.4% p.a.",
      "MUDRA debit card provided for flexible working capital"
    ],
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: "All",
      occupations: ["Self Employed", "Business Owner", "Artisan", "Trader"],
      customRules: ["Non-farm income generating business plan required"]
    },
    requiredDocuments: [
      "Business Proposal / Project Report",
      "Aadhaar & PAN Card",
      "Udyam MSME Registration Certificate",
      "Bank Account Statement for 6 months"
    ],
    officialPortalUrl: "https://www.mudra.org.in",
    tags: ["business loan", "mudra", "msme", "collateral free loan", "startup", "trader"]
  },
  {
    id: "pm-kusum",
    title: "PM-KUSUM (Solar Agriculture Pump Subsidy)",
    department: "Ministry of New and Renewable Energy",
    shortDescription: "Up to 90% subsidy for farmers to install standalone solar pumps for crop irrigation.",
    fullDescription: "PM-KUSUM provides 60% combined central/state subsidy plus 30% bank loan to install off-grid solar pumps, reducing electricity dependency.",
    category: "Farmers",
    targetGroup: "Farmers & Agricultural Cooperatives",
    sponsoringBody: "Central",
    incomeGroup: "All Income Groups",
    deadline: "31st March 2027",
    processingTime: "20 to 30 Working Days",
    benefits: [
      "60% direct subsidy + 30% bank loan (Farmer pays only 10%)",
      "Uninterrupted daytime solar electricity for irrigation",
      "Earn passive income by selling excess power to grid"
    ],
    eligibilityCriteria: {
      minAge: 18,
      gender: "All",
      farmerOnly: true,
      customRules: ["Must own agricultural land or possess valid lease"]
    },
    requiredDocuments: [
      "Land Ownership Document (7/12 or Jamabandi)",
      "Aadhaar Card",
      "Bank Account Passbook",
      "Electricity Bill Copy"
    ],
    officialPortalUrl: "https://pmkusum.mnre.gov.in",
    tags: ["farmer", "solar pump", "pm kusum", "irrigation subsidy", "tamil nadu", "solar energy"]
  },
  {
    id: "magalir-urimai",
    title: "Kalaignar Magalir Urimai Thogai (Women Monthly Rights Grant)",
    department: "Department of Social Welfare, Govt of Tamil Nadu",
    shortDescription: "Monthly direct grant of ₹1,000 for women heads of eligible households in Tamil Nadu.",
    fullDescription: "A flagship Tamil Nadu state scheme providing direct monthly financial assistance of ₹1,000 to women heads of family to enhance economic independence and livelihood security.",
    category: "Women",
    targetGroup: "Women Heads of Household in Tamil Nadu",
    sponsoringBody: "State",
    state: "Tamil Nadu",
    incomeGroup: "₹1L - ₹2.5L",
    deadline: "Open All Year",
    processingTime: "10 to 20 Working Days",
    benefits: [
      "₹1,000 monthly direct bank transfer (₹12,000 annually)",
      "Direct deposit into woman beneficiary's bank account",
      "Empowers 1.15 Crore women across Tamil Nadu"
    ],
    eligibilityCriteria: {
      minAge: 21,
      gender: "Female",
      maxAnnualIncome: 250000,
      customRules: [
        "Must be a resident of Tamil Nadu",
        "Annual household electricity consumption under 3,600 units",
        "Family landholding under 5 acres wetland or 10 acres dryland"
      ]
    },
    requiredDocuments: [
      "Smart Family Ration Card (Tamil Nadu)",
      "Aadhaar Card of Woman Head",
      "Bank Passbook linked with Aadhaar",
      "Electricity Meter Number / Bill"
    ],
    officialPortalUrl: "https://kmut.tn.gov.in",
    tags: ["women", "tamil nadu", "magalir urimai", "monthly pension", "financial support", "state scheme"]
  },
  {
    id: "ladli-behna",
    title: "Mukhyamantri Ladli Behna Yojana",
    department: "Department of Women & Child Development, Madhya Pradesh",
    shortDescription: "Monthly financial aid of ₹1,250 for married women in Madhya Pradesh.",
    fullDescription: "Provides ₹1,250 every month directly to married, widowed, divorced, or abandoned women aged 21 to 60 belonging to low and middle income families in Madhya Pradesh.",
    category: "Women",
    targetGroup: "Women Residents of Madhya Pradesh",
    sponsoringBody: "State",
    state: "Madhya Pradesh",
    incomeGroup: "₹1L - ₹2.5L",
    deadline: "Open All Year",
    processingTime: "15 Working Days",
    benefits: [
      "₹1,250 per month direct transfer to woman's bank account",
      "₹15,000 annual financial security support",
      "Direct DBT transfer on 10th of every month"
    ],
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 60,
      gender: "Female",
      maxAnnualIncome: 250000,
      customRules: ["Must be a permanent resident of Madhya Pradesh"]
    },
    requiredDocuments: [
      "Samagra Family ID & Member ID",
      "Aadhaar Card",
      "Mobile Number linked with Aadhaar",
      "Active Bank Account with DBT enabled"
    ],
    officialPortalUrl: "https://cmladlibehna.mp.gov.in",
    tags: ["women", "madhya pradesh", "ladli behna", "monthly grant", "state scheme"]
  },
  {
    id: "kanyashree-prakalpa",
    title: "Kanyashree Prakalpa (Girl Child Higher Education Incentive)",
    department: "Department of Women & Child Development, West Bengal",
    shortDescription: "Annual scholarship of ₹1,000 and one-time grant of ₹25,000 for unmarried girls in West Bengal.",
    fullDescription: "Kanyashree Prakalpa aims to improve the status and wellbeing of girls by incentivizing higher education and delaying early marriage through direct financial scholarships.",
    category: "Women",
    targetGroup: "Unmarried Girl Students aged 13-19 in West Bengal",
    sponsoringBody: "State",
    state: "West Bengal",
    incomeGroup: "₹1L - ₹2.5L",
    deadline: "30th November 2026",
    processingTime: "15 to 30 Working Days",
    benefits: [
      "K1: Annual scholarship of ₹1,000 for girls aged 13-18 enrolled in Class 8-12",
      "K2: One-time grant of ₹25,000 upon reaching age 18 if continuing education",
      "Decreases school dropout rates significantly"
    ],
    eligibilityCriteria: {
      minAge: 13,
      maxAge: 19,
      gender: "Female",
      studentOnly: true,
      maxAnnualIncome: 120000,
      customRules: ["Must be an unmarried student in a recognized West Bengal school/college"]
    },
    requiredDocuments: [
      "Birth Certificate",
      "Declaration of Unmarried Status",
      "School Enrollment Certificate",
      "Bank Account details in girl's name"
    ],
    officialPortalUrl: "https://wbkanyashree.gov.in",
    tags: ["women", "girl child", "west bengal", "kanyashree", "education grant", "scholarship"]
  },
  {
    id: "divyangjan-swavalamban",
    title: "Divyangjan Self Employment Loan Scheme",
    department: "National Handicapped Finance and Development Corporation (NHFDC)",
    shortDescription: "Concessional loans up to ₹25 Lakh at 4% to 5% interest rate for persons with disabilities.",
    fullDescription: "Provides low-interest microfinance loans to persons with disabilities (40% or more disability) to set up self-employment ventures, small businesses, or pursue vocational training.",
    category: "Disability",
    targetGroup: "Persons with Disabilities (Divyangjan)",
    sponsoringBody: "Central",
    incomeGroup: "All Income Groups",
    deadline: "Open All Year",
    processingTime: "14 to 21 Working Days",
    benefits: [
      "Concessional interest rate of 4% to 5% p.a. on loans up to ₹25 Lakh",
      "100% repayment moratorium up to 6 months",
      "Special rebate of 1% for female applicants with disability"
    ],
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: "All",
      disabilityOnly: true,
      customRules: ["Must possess valid Disability Certificate showing 40% or more disability"]
    },
    requiredDocuments: [
      "UDID Disability Certificate (40%+ disability)",
      "Aadhaar Card & PAN Card",
      "Business Proposal / Feasibility Report",
      "Bank Account Passbook"
    ],
    officialPortalUrl: "https://nhfdc.nic.in",
    tags: ["disability", "divyangjan", "nhfdc", "concessional loan", "self employment", "handicapped loan"]
  },
  {
    id: "pm-svanidhi",
    title: "PM SVANidhi (Street Vendor Micro Credit Scheme)",
    department: "Ministry of Housing and Urban Affairs",
    shortDescription: "Collateral-free working capital loan up to ₹50,000 with 7% interest subsidy for street hawkers.",
    fullDescription: "PM SVANidhi provides micro credit loans to urban street vendors to restart their livelihoods post-pandemic with guaranteed interest subsidies and digital cash-back rewards.",
    category: "MSME",
    targetGroup: "Urban Street Vendors & Hawkers",
    sponsoringBody: "Central",
    incomeGroup: "EWS / BPL",
    deadline: "31st December 2026",
    processingTime: "3 to 7 Working Days",
    benefits: [
      "1st Tranche loan ₹10,000, 2nd Tranche ₹20,000, 3rd Tranche ₹50,000",
      "7% annual interest subsidy deposited directly into bank account",
      "Digital transaction cashback up to ₹1,200/year"
    ],
    eligibilityCriteria: {
      minAge: 18,
      gender: "All",
      occupations: ["Street Vendor", "Hawker", "Trader"],
      customRules: ["Must possess Certificate of Vending or ID Card issued by Urban Local Body"]
    },
    requiredDocuments: [
      "Certificate of Vending / ULB Vendor ID",
      "Aadhaar Card",
      "Bank Passbook details"
    ],
    officialPortalUrl: "https://pmsvanidhi.mohua.gov.in",
    tags: ["street vendor", "hawker", "svanidhi", "micro credit", "business loan", "urban poor"]
  },
  {
    id: "pm-vishwakarma",
    title: "PM Vishwakarma Scheme (Artisan Skill & Credit)",
    department: "Ministry of Micro, Small and Medium Enterprises",
    shortDescription: "Skill training, ₹15,000 toolkit grant, and 5% interest loans for traditional artisans.",
    fullDescription: "End-to-end holistic support for traditional artisans across 18 trades (carpenters, potters, blacksmiths, tailors, weavers) including ₹15,000 toolkit vouchers and ₹3 Lakh 5% interest loans.",
    category: "MSME",
    targetGroup: "Traditional Artisans & Craftspeople (18 Trades)",
    sponsoringBody: "Central",
    incomeGroup: "All Income Groups",
    deadline: "Open All Year",
    processingTime: "10 to 15 Working Days",
    benefits: [
      "PM Vishwakarma Certificate & ID Card recognition",
      "Basic skill training with ₹500/day stipend",
      "₹15,000 e-Voucher for modern toolkits",
      "Collateral-free loan up to ₹3 Lakh at 5% interest"
    ],
    eligibilityCriteria: {
      minAge: 18,
      gender: "All",
      occupations: ["Artisan", "Craftsman", "Tailor", "Carpenter", "Blacksmith", "Barber", "Weaver"],
      customRules: ["Engaged in traditional family-based trade; 1 member per family"]
    },
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Account Passbook",
      "Ration Card",
      "Active Mobile Number"
    ],
    officialPortalUrl: "https://pmvishwakarma.gov.in",
    tags: ["artisan", "vishwakarma", "craftsman", "skill training", "toolkit voucher", "artisan loan"]
  },
  {
    id: "ignaps-pension",
    title: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    department: "Ministry of Rural Development / NSAP",
    shortDescription: "Monthly direct pension for senior citizens from Below Poverty Line (BPL) families.",
    fullDescription: "Non-contributory monthly pension providing financial dignity to destitute senior citizens aged 60 and above belonging to BPL households.",
    category: "Seniors",
    targetGroup: "Elderly Citizens (Age 60+) from BPL Households",
    sponsoringBody: "Central",
    incomeGroup: "EWS / BPL",
    deadline: "Open All Year",
    processingTime: "15 to 30 Working Days",
    benefits: [
      "₹500/month pension for age 60-79 years (enhanced by State top-ups)",
      "₹1,000/month pension for age 80 years and above",
      "Direct bank/post office transfer"
    ],
    eligibilityCriteria: {
      minAge: 60,
      gender: "All",
      bplOnly: true,
      customRules: ["Listed below poverty line (BPL)"]
    },
    requiredDocuments: [
      "Proof of Age (Aadhaar / Birth Certificate)",
      "BPL Ration Card / Tehsildar BPL Certificate",
      "Bank Account details"
    ],
    officialPortalUrl: "https://nsap.nic.in",
    tags: ["senior citizens", "old age pension", "ignaps", "bpl pension", "monthly pension"]
  },
  {
    id: "pm-matru-vandana",
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    department: "Ministry of Women and Child Development",
    shortDescription: "₹5,000 financial assistance for pregnant women and lactating mothers.",
    fullDescription: "PMMVY provides cash incentives to pregnant women for the first child to compensate for wage loss during pregnancy and ensure adequate nutrition.",
    category: "Women",
    targetGroup: "Pregnant & Lactating Mothers",
    sponsoringBody: "Central",
    incomeGroup: "Below ₹1L",
    deadline: "Open All Year",
    processingTime: "7 to 14 Working Days",
    benefits: [
      "₹5,000 cash incentive in 3 direct installments",
      "Encourages institutional delivery and infant immunization",
      "Additional ₹1,000 under Janani Suraksha Yojana"
    ],
    eligibilityCriteria: {
      minAge: 19,
      maxAge: 45,
      gender: "Female",
      customRules: ["Pregnant mother for first live child"]
    },
    requiredDocuments: [
      "Mother & Child Protection (MCP) Card",
      "Aadhaar Card of Mother and Husband",
      "Bank Account Passbook"
    ],
    officialPortalUrl: "https://pmmvy.wcd.gov.in",
    tags: ["women", "pregnant mother", "pmmvy", "maternity benefit", "nutrition grant"]
  }
];

export const getSchemes = (): Scheme[] => {
  return SCHEMES;
};

export const addScheme = (newScheme: Scheme): Scheme => {
  SCHEMES.unshift(newScheme);
  return newScheme;
};

export const updateScheme = (id: string, updatedFields: Partial<Scheme>): Scheme | null => {
  const index = SCHEMES.findIndex(s => s.id === id);
  if (index === -1) return null;
  SCHEMES[index] = { ...SCHEMES[index], ...updatedFields };
  return SCHEMES[index];
};

export const deleteScheme = (id: string): boolean => {
  const index = SCHEMES.findIndex(s => s.id === id);
  if (index === -1) return false;
  SCHEMES.splice(index, 1);
  return true;
};

