export interface EducationData {
  degree: string;
  specialization: string;
  institution: string;
  affiliatingUniversity: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  credentialCode?: string;
  tag: string;
}

export const education: EducationData = {
  degree: "Bachelor of Engineering (B.E.)",
  specialization: "Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
  institution: "R.L. Jalappa Institute of Technology",
  affiliatingUniversity: "Visvesvaraya Technological University (VTU)",
  period: "2022 – 2026",
  cgpa: "8.34",
  highlights: [
    "Specialized coursework in Deep Learning, NLP, Distributed Systems, and AI Mathematics.",
    "Consistently maintained high academic distinction with an overall CGPA of 8.34.",
    "Active participant and finalist in regional hackathons and AI engineering challenges."
  ]
};

export const certifications: CertificationItem[] = [
  {
    name: "Generative AI & Prompt Engineering",
    issuer: "NxtWave",
    year: "2025",
    tag: "GENAI_PROMPT"
  },
  {
    name: "Generative AI Model Workshop",
    issuer: "NxtWave",
    year: "2025",
    tag: "MODEL_WORKSHOP"
  },
  {
    name: "NPTEL Cloud Computing",
    issuer: "Indian Institute of Technology (IIT)",
    year: "2024",
    tag: "CLOUD_IIT"
  },
  {
    name: "Mobile App Development with AI",
    issuer: "RLJIT",
    year: "2024",
    tag: "AI_APP_DEV"
  },
  {
    name: "Fundamentals of Network Design",
    issuer: "Internet Society",
    year: "2024",
    tag: "NETWORK_DESIGN"
  },
  {
    name: "24-Hour Hackathon",
    issuer: "SJBIT",
    year: "2024",
    tag: "HACKATHON_FINISH"
  }
];
