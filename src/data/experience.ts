export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Dynamic Mobility Technology",
    period: "Feb 2024 - Present",
    location: "Kenya",
    highlights: [
      "Shipped KISRS to UAT for hospitals and labs: RBAC, referral dashboards, and production Next.js UI.",
      "Founded BeautiLink and built it across the stack: Next.js admin, NestJS APIs, and Expo React Native (shop, chat, dashboards).",
      "Delivered insurance admin portal (http://134.209.70.221:3050/) and agents portal (http://134.209.70.221:3151/) covering claims, commissions, bookings, and reporting.",
      "Shipped e-Sahal wallet flows on Expo React Native: auth, send money, and transaction history.",
      "Built carbon credits reporting (CarbonFlow) with feasibility workflows and field data screens.",
    ],
  },
  {
    role: "Freelance Software Engineer",
    company: "Upeo",
    period: "Freelance",
    location: "Kenya",
    highlights: [
      "Built a CBC student portal for learners: curriculum content, progress tracking, and API-backed flows.",
      "Shipped a responsive Next.js experience aligned to Kenya's CBC model.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Tenzi Limited",
    period: "May 2024 - Jan 2025",
    location: "Kenya",
    highlights: [
      "Shipped Tenzi-MRP for procurement, inventory, and production planning.",
      "Shipped Tenzi-POS with offline-first IndexedDB sync so checkout kept working during outages.",
    ],
  },
  {
    role: "Software Engineer",
    company: "CityRight Limited",
    period: "Oct 2023 - Jan 2024",
    location: "Kenya",
    highlights: [
      "Accessible interfaces, API integrations, and e-commerce performance optimization.",
    ],
  },
  {
    role: "Software Engineer",
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
