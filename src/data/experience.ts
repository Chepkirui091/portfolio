export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Dynamic Mobility Technology",
    period: "Feb 2024 - Present",
    location: "Kenya",
    highlights: [
      "Lead frontend for KISRS healthcare referral platform with RBAC and real-time dashboards.",
      "Enterprise insurance admin portals, agents portal, calculators, and operational reporting.",
      "React Native fintech (e-Sahal): wallets, transactions, and authentication flows.",
      "Carbon-credits sustainability dashboards with ABPL.",
    ],
  },
  {
    role: "Freelance Frontend Developer",
    company: "Upeo",
    period: "Freelance",
    location: "Kenya",
    highlights: [
      "Built a CBC (Competency-Based Curriculum) student portal for learners and curriculum workflows.",
      "Responsive UI, API integration, and UX aligned to Kenya's CBC model.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Tenzi Limited",
    period: "May 2024 - Jan 2025",
    location: "Kenya",
    highlights: [
      "Architected Tenzi-MRP for procurement, inventory, and production planning.",
      "Shipped Tenzi-POS with offline-first IndexedDB sync and RBAC.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "CityRight Limited",
    period: "Oct 2023 - Jan 2024",
    location: "Kenya",
    highlights: [
      "Accessible interfaces, API integrations, and e-commerce performance optimization.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Computer Engineering Forum",
    period: "Apr 2023 - Jul 2023",
    location: "Remote",
    highlights: [
      "E-commerce builds, performance tuning, and design collaboration.",
    ],
  },
  {
    role: "Data Analyst",
    company: "AMREC",
    period: "May 2023 - Aug 2023",
    location: "Kenya",
    highlights: [
      "Data quality checks, automated reports, and charts for internal teams.",
    ],
  },
];
