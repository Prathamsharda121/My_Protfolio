/**
 * Single source of truth for all site content.
 * Edit values here to update the portfolio — components read from this file.
 */

export const profile = {
  name: "Pratham Sharda",
  firstName: "Pratham",
  lastName: "Sharda",
  initials: "PS",
  // Rotating words shown under the name in the hero.
  roles: [
    "Junior Program Manager",
    "AI & Automation Builder",
    "Data Analyst",
    "Full-Stack Problem Solver",
  ],
  headline: "I build AI-powered internal tools & data systems.",
  subheadline:
    "Junior Program Manager at Fitelo — turning messy operations into clean, automated products. I ship CRMs, AI panels and analytics that teams actually use.",
  location: "India",
  currentCompany: "Fitelo",
  currentRole: "Junior Program Manager",
  photo: "/pratham-photo.jpg",
  resume: "/Pratham-Sharda-Resume.pdf",
} as const;

export const contact = {
  email: "prathamsharda986@gmail.com",
  phone: "+91 98163 74871",
  phoneHref: "+919816374871",
  linkedin: "https://www.linkedin.com/in/pratham-sharda-21040234a",
  github: "https://github.com/Prathamsharda121",
} as const;

export const stats = [
  { value: "9.08", suffix: "/10", label: "MCA CGPA" },
  { value: "6", suffix: "+", label: "Products shipped" },
  { value: "10", suffix: "+", label: "Tools & platforms" },
  { value: "3", suffix: "", label: "Certifications" },
] as const;

export const about = {
  paragraphs: [
    "I'm an MCA graduate and a builder at heart. At Fitelo I work as a Junior Program Manager, where my job is equal parts product, data and engineering — I find where operations break and I ship tools that fix them.",
    "I've built a Quality-team CRM that turns client emails and WhatsApp queries into structured tickets, AI panels powered by Claude and strong prompt engineering, and analytics stacks that give teams real numbers to act on. I move comfortably from a Supabase schema to a Metabase dashboard to a Gupshup WhatsApp template.",
    "I'm obsessed with clean systems, thoughtful automation and using AI the right way. If it can be measured, automated or made 10x simpler, that's the problem I want.",
  ],
  focus: [
    "AI product & automation",
    "Data analytics & dashboards",
    "Internal tools & CRMs",
    "Program & delivery management",
  ],
} as const;

export type SkillGroup = {
  title: string;
  accent: "cyan" | "violet" | "blue";
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & LLM",
    accent: "violet",
    skills: [
      "Claude",
      "Prompt Engineering",
      "LangChain",
      "RAG Systems",
      "GenAI Tools",
      "Machine Learning",
      "AI Agents & Panels",
    ],
  },
  {
    title: "Data & Analytics",
    accent: "cyan",
    skills: [
      "Python",
      "SQL",
      "Advanced Excel",
      "Google Sheets",
      "App Script",
      "Power BI",
      "Looker Studio",
      "Metabase",
    ],
  },
  {
    title: "Web & Backend",
    accent: "blue",
    skills: ["Next.js", "React", "Flask", "TypeScript", "HTML", "CSS", "REST APIs"],
  },
  {
    title: "Infra & Platforms",
    accent: "cyan",
    skills: ["Vercel", "Neon", "Supabase", "AWS", "GitLab", "Prod DB & Servers"],
  },
  {
    title: "Growth & Ops Tooling",
    accent: "violet",
    skills: ["MoEngage", "Gupshup (WhatsApp)", "Admin Panels", "CRM Systems", "Analytics"],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Fitelo",
    role: "Junior Program Manager",
    period: "Present",
    current: true,
    summary:
      "Own the build of internal products, AI panels and analytics that power day-to-day operations across teams.",
    highlights: [
      "Designed and shipped a Quality-team CRM that converts client emails and WhatsApp queries into structured tickets, routed to Relationship Managers for resolution.",
      "Built AI panels and internal tools powered by Claude and careful prompt engineering to automate repetitive workflows.",
      "Ran production stacks across Vercel, Neon, Supabase, AWS and GitLab — from database to deployment.",
      "Integrated MoEngage, Gupshup WhatsApp templates and Metabase to close the loop between messaging, data and action.",
    ],
    stack: ["Next.js", "Supabase", "Neon", "Claude", "AWS", "Gupshup", "Metabase", "MoEngage"],
  },
  {
    company: "Nureca Limited",
    role: "Data Analyst",
    period: "Previous",
    summary:
      "Automated reporting and internal workflows using Google App Script, Sheets and advanced Excel.",
    highlights: [
      "Developed App Script automations and trackers that streamlined recurring team workflows.",
      "Worked across Google Sheets and advanced Excel to model and clean operational data.",
    ],
    stack: ["App Script", "Google Sheets", "Advanced Excel", "Data Analysis"],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  featured?: boolean;
  category: string;
};

export const projects: Project[] = [
  {
    title: "Quality CRM & Ticketing System",
    tagline: "Email + WhatsApp → tickets → resolution",
    description:
      "A CRM for the Quality team where clients raise queries over email and WhatsApp. Each query is captured, de-duplicated and turned into a trackable ticket that Relationship Managers pick up and resolve — with full status history and analytics.",
    tags: ["Next.js", "Supabase", "Gupshup", "Vercel", "AWS"],
    category: "Product",
    featured: true,
  },
  {
    title: "AI Panels & Internal Tools",
    tagline: "Claude-powered automation panels",
    description:
      "A suite of admin panels with built-in AI features — powered by Claude and strong prompt engineering — that automate content, triage and repetitive decisions across internal teams.",
    tags: ["Claude", "Prompt Engineering", "Next.js", "Neon"],
    category: "AI",
    featured: true,
  },
  {
    title: "Analytics & Dashboards Stack",
    tagline: "Metabase · Power BI · MoEngage",
    description:
      "End-to-end analytics: production data surfaced through Metabase and Power BI dashboards, with MoEngage campaign tracking — giving teams live, decision-ready numbers.",
    tags: ["Metabase", "Power BI", "MoEngage", "SQL"],
    category: "Data",
    featured: true,
  },
  {
    title: "RAG Chatbot",
    tagline: "Document-grounded Q&A with LangChain",
    description:
      "An AI chatbot built with LangChain that retrieves relevant context from documents and answers user questions accurately, grounded in source material.",
    tags: ["LangChain", "Python", "RAG", "GenAI"],
    category: "AI",
  },
  {
    title: "Stocks Power BI Dashboard",
    tagline: "Live-updating market dashboard",
    description:
      "Transformed raw Excel stock data into a live, auto-refreshing Power BI dashboard with interactive visuals for tracking performance over time.",
    tags: ["Power BI", "Excel", "Data Modeling"],
    category: "Data",
  },
  {
    title: "House Price Prediction",
    tagline: "Random Forest regression model",
    description:
      "A predictive ML model using Random Forest to estimate housing prices from key property attributes, with feature engineering and evaluation.",
    tags: ["Python", "Machine Learning", "Random Forest"],
    category: "AI",
  },
];

export type EducationItem = {
  degree: string;
  field: string;
  institute: string;
  period: string;
  score: string;
};

export const education: EducationItem[] = [
  {
    degree: "M.C.A.",
    field: "Master of Computer Applications",
    institute: "CGC — Landran",
    period: "2024 — 2026",
    score: "CGPA 9.08",
  },
  {
    degree: "B.C.A.",
    field: "Bachelor of Computer Applications",
    institute: "Maharaja Agrasen University",
    period: "2021 — 2024",
    score: "CGPA 6.84",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [
  { title: "Python Essentials", issuer: "CISCO", date: "Apr 2025" },
  { title: "Data Analysis & Power BI", issuer: "Office Masters", date: "Mar 2025" },
  { title: "AI Developer Internship — GenAI Tools", issuer: "GenAI Program", date: "Jul 2025" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
