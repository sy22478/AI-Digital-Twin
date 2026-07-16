// Every value here traces to LinkedIn.md. Do not add a claim without a line there.

export const profile = {
  name: "Sonu Yadav",
  role: "AI/ML Engineer",
  location: "Austin, Texas",
  headline: "I studied the brain to understand intelligence. Now I build it.",
  subline: "Neuroscience wasn't a detour on the way to AI — it was the reason.",
  status: "Open to work. Austin, TX and remote.",
  linkedin: "https://www.linkedin.com/in/sonu-yadav-a61046245",
  github: "https://github.com/sy22478",
} as const;

export type Project = {
  name: string;
  tagline: string;
  repo: string;
  stack: readonly string[];
  points: readonly string[];
};

// Featured: the two that evidence agentic engineering. LinkedIn.md, "Notes and gaps".
export const featuredProjects: readonly Project[] = [
  {
    name: "HealthMate",
    tagline: "Agentic healthcare assistant",
    repo: "https://github.com/sy22478/HealthMate",
    stack: ["OpenAI Agent SDK", "LangChain", "Pinecone", "FastAPI", "PostgreSQL", "Redis", "Kubernetes"],
    points: [
      "Agentic health assistant combining function calling, intelligent routing, and RAG over Pinecone for context-aware medical decision support.",
      "Production system of 8 microservices, with JWT auth, RBAC, audit logging, and field-level AES-256 encryption for HIPAA and GDPR compliance.",
      "ML models for cardiovascular risk, diabetes prediction, and mental health screening, using feature engineering and time-series analysis to cut false positives.",
      "ETL pipelines aggregating Fitbit and Apple Health into a real-time Streamlit dashboard over WebSockets.",
    ],
  },
  {
    name: "Resume Tailor",
    tagline: "RAG agent that rewrites a resume against a job description",
    repo: "https://github.com/sy22478/resume-tailoring-ai-agent",
    stack: ["OpenAI Assistant API", "LangChain", "RAG", "Streamlit"],
    points: [
      "Retrieval-augmented agent that reads an uploaded resume and generates a version aligned to a specific job description.",
      "Document retrieval over user-supplied resumes, with a Streamlit interface for interacting with the agent.",
    ],
  },
];

export const otherProjects = [
  {
    name: "ReneWind",
    tagline: "Deep learning predictive maintenance for wind turbines",
    repo: "https://github.com/sy22478/ReneWind",
    note: "Seven TensorFlow/Keras models compared across 40+ sensor features and 20,000 samples, tuned against a 17:1 class imbalance. Business impact analysis weighed repair cost against replacement cost.",
  },
  {
    name: "Personal Loan Campaign",
    tagline: "Classification for campaign targeting",
    repo: "https://github.com/sy22478/Personal_Loan_Campaign",
    note: "84.56% recall and 92.65% precision on test data, on a 9.6% positive class, using a post-pruned decision tree with balanced class weights.",
  },
  {
    name: "Restaurant Turnover Prediction",
    tagline: "Hackathon ensemble, scored on RMSE",
    repo: "https://github.com/sy22478/Restaurant-Turnover-Prediction",
    note: "Weighted ensemble of LightGBM, XGBoost, and CatBoost, each tuned with Optuna, outperforming every individual model.",
  },
  {
    name: "EasyVisa",
    tagline: "Visa approval probability modelling",
    repo: "https://github.com/sy22478/EasyVisa",
    note: "Predictive pipeline over historical immigration data, with a dashboard for legal teams to analyse approval trends and case patterns.",
  },
  {
    name: "FoodHub",
    tagline: "Delivery order analysis",
    repo: "https://github.com/sy22478/Food-delivery-analysis",
    note: "EDA across 1,898 delivery orders surfacing peak ordering windows, top cuisines, and revenue drivers.",
  },
] as const;

export const experience = [
  {
    role: "ML Data Labeling Analyst V (AI Trainer)",
    org: "Tundra Technical Solutions, on assignment with Meta",
    meta: "Contract · Remote",
    period: "Jan 2026 — Present",
    current: true,
    points: [],
  },
  {
    role: "Clinical Laboratory Operator",
    org: "Natera",
    meta: "Full-time · Austin, TX",
    period: "Feb 2023 — Nov 2024",
    current: false,
    points: [
      "Processed 240–336 blood samples daily for non-invasive prenatal testing, hitting a 99% success rate on automated plasma isolation under CLIA and GCP compliance.",
      "Redesigned SOPs for DNA extraction and plasma isolation, cutting error rates by 90% and lifting team efficiency by 80%.",
    ],
  },
  {
    role: "Student Technological Assistant",
    org: "The University of Texas at Austin",
    meta: "Part-time · Austin, TX",
    period: "Jan 2022 — Dec 2022",
    current: false,
    points: [
      "Ran an LMS serving 500+ users across 30+ courses, and processed datasets of 10,000+ records into 10+ monthly reports.",
    ],
  },
  {
    role: "Undergraduate Research Assistant",
    org: "The University of Texas at Arlington",
    meta: "Internship · Arlington, TX",
    period: "Dec 2018 — Mar 2020",
    current: false,
    points: [
      "Characterised apoptosis-related caspase proteins by gel electrophoresis, PCR, chromatography, X-ray crystallography, and mass spectrometry, analysing 50+ samples weekly.",
      "Also served as Resident Assistant and Student Assistant at UT Arlington over the same period.",
    ],
  },
] as const;

export const education = [
  { school: "Lindsey Wilson University", award: "MS, Technology Management", period: "Jan 2026 — Present" },
  { school: "Westcliff University", award: "MS, Computer Science", period: "May 2025 — Dec 2025" },
  { school: "Texas McCombs School of Business, UT Austin", award: "Postgraduate, AI / Machine Learning", period: "Mar 2025 — Nov 2025", grade: "4.00" },
  { school: "The University of Texas at Austin", award: "BS, Neuroscience", period: "Jan 2021 — Dec 2022", grade: "3.63" },
  { school: "The University of Texas at Arlington", award: "BS, Biology", period: "Aug 2018 — Dec 2020", grade: "3.63" },
] as const;

// Eight certifications on the profile. Listed compactly per CLAUDE.md; the rest sit on LinkedIn.
export const certifications = [
  { name: "Advanced Software Engineering Job Simulation", issuer: "Forage · Walmart USA", year: "2026" },
  { name: "Agent Engineering Bootcamp v1", issuer: "Break Into Data", year: "2025" },
  { name: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI", year: "2025" },
  { name: "Data Analytics Job Simulation", issuer: "Forage · Deloitte Australia", year: "2025" },
] as const;

export const certificationsTotal = 8;

export const skills = [
  { group: "AI / ML", items: "Agent engineering, RAG, LangChain, OpenAI Agent API, TensorFlow, Keras, Scikit-Learn, LightGBM, XGBoost, CatBoost, Optuna, NLP, Computer Vision" },
  { group: "Data", items: "Python, NumPy, Pandas, Seaborn, Matplotlib, SQL, ETL, EDA, Statistical Modelling" },
  { group: "Engineering", items: "FastAPI, PostgreSQL, Redis, Kubernetes, Streamlit, Microservices, Java, Software Architecture" },
] as const;
