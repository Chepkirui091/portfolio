import { projectCover, projectScreenshots } from "@/lib/images";

export type ProjectCategory =
  | "all"
  | "healthcare"
  | "fintech"
  | "insurance"
  | "edtech"
  | "enterprise"
  | "personal";

export type UiScreenshot = {
  src: string;
  alt: string;
  caption: string;
  device?: "mobile" | "desktop";
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, "all">;
  stack: string[];
  description: string;
  problem: string;
  role: string;
  highlights: string[];
  confidential: boolean;
  liveUrl?: string;
  uatUrl?: string;
  repoUrl?: string;
  liveDemoOnRequest?: boolean;
  discontinued?: boolean;
  year?: string;
  featured?: boolean;
  coverImage: string;
  coverAlt: string;
  uiScreenshots: UiScreenshot[];
};

function shots(id: string, labels: string[]): UiScreenshot[] {
  return projectScreenshots(id, labels);
}

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "healthcare", label: "Healthcare" },
  { id: "insurance", label: "Insurance" },
  { id: "fintech", label: "Fintech" },
  { id: "edtech", label: "EdTech" },
  { id: "enterprise", label: "Enterprise" },
  { id: "personal", label: "Personal" },
];

export const projects: Project[] = [
  {
    id: "isrs",
    title: "KISRS",
    subtitle: "Kenya Integrated Sample Referral System",
    category: "healthcare",
    stack: ["Next.js", "TypeScript", "JavaScript", "MUI", "RBAC"],
    description:
      "Healthcare platform enabling hospitals and laboratories to manage digital test referrals, tracking, and inter-facility coordination.",
    problem:
      "Hospitals and laboratories needed a unified way to coordinate test referrals, track samples, and manage roles across facilities.",
    role: "Software engineer. Shipped referral workflows, RBAC dashboards, facility views, and the UAT release with the backend team.",
    highlights: [
      "Role-based workflows for clinicians, lab staff, and admins",
      "Real-time referral dashboards",
      "Secure healthcare data handling with backend integration",
    ],
    confidential: false,
    liveUrl: "https://uat.isrs.co.ke/",
    year: "2025-2026",
    featured: true,
    coverImage: projectCover("isrs"),
    coverAlt: "KISRS healthcare referral dashboard",
    uiScreenshots: shots("isrs", [
      "Referral pipeline overview",
      "Lab coordination workspace",
      "Role-based admin console",
    ]),
  },
  {
    id: "beautilink",
    title: "BeautiLink",
    subtitle: "Beauty & wellness marketplace",
    category: "enterprise",
    stack: ["Next.js", "NestJS", "Expo", "React Native", "TypeScript"],
    description:
      "A multi-platform marketplace connecting customers, beauty professionals, and businesses, with booking, discovery, and business management in one ecosystem.",
    problem:
      "A multi-platform marketplace connecting customers, beauty professionals, and businesses.",
    role: "Founder and full-stack engineer. Designed and built the admin platform, NestJS API layer, and Expo mobile experience.",
    highlights: [
      "Admin platform for business operations",
      "NestJS API shared by web and mobile",
      "Expo app: shop, booking, and chat",
    ],
    confidential: false,
    liveUrl: "https://beautilink-admin-portal.vercel.app/",
    liveDemoOnRequest: true,
    year: "2026",
    featured: true,
    coverImage: projectCover("beautilink"),
    coverAlt: "BeautiLink admin dashboard and mobile app",
    uiScreenshots: shots("beautilink", [
      "Admin operations dashboard",
      "Mobile home dashboard",
      "Shop and bookings",
    ]),
  },
  {
    id: "insurance-admin",
    title: "Insurance Admin Portal",
    subtitle: "Enterprise operations console",
    category: "insurance",
    stack: ["Next.js", "React", "MUI", "Redux", "RBAC"],
    description:
      "Full-stack admin portal for insurance operations: agents, commissions, digital store, claims journey, product onboarding, and reporting.",
    problem:
      "Insurance operations teams needed one secure console to manage agents, claims, commissions, and partner reporting.",
    role: "Software engineer. Built admin dashboards, claims journey UI, Redux flows, and RBAC across ops modules.",
    highlights: [
      "Agent management & commission settings",
      "Digital store applications & underwriting",
      "Claims workflow builder and runtime",
      "Partner management & user roles",
    ],
    confidential: true,
    liveUrl: "http://134.209.70.221:3050/",
    year: "2025-2026",
    featured: true,
    coverImage: projectCover("insurance-admin"),
    coverAlt: "Insurance admin operations dashboard",
    uiScreenshots: shots("insurance-admin", [
      "Operations home dashboard",
      "Claims journey builder",
      "Agent & commission management",
      "Reporting & analytics views",
    ]),
  },
  {
    id: "agents-portal",
    title: "Insurance Agents Portal",
    subtitle: "Agent workspace & bookings",
    category: "insurance",
    stack: ["React", "Next.js", "TypeScript", "MUI"],
    description:
      "Agent-facing portal for bookings, customer management, policy workflows, and operational dashboards with secure RBAC.",
    problem:
      "Insurance agents needed a dedicated workspace for bookings, customers, and policy tools outside the admin console.",
    role: "Software engineer. Built agent dashboards, booking flows, customer screens, and copilot UI.",
    highlights: [
      "Agent workspace with bookings and customer views",
      "Policy calculators and guided workflows",
      "Reporting for partners and internal teams",
    ],
    confidential: true,
    liveUrl: "http://134.209.70.221:3151/",
    year: "2025-2026",
    coverImage: projectCover("agents-portal"),
    coverAlt: "Insurance agents portal dashboard",
    uiScreenshots: shots("agents-portal", [
      "Agent workspace",
      "Bookings overview",
      "Customer management",
    ]),
  },
  {
    id: "e-sahal",
    title: "e-Sahal",
    subtitle: "Mobile fintech application",
    category: "fintech",
    stack: ["Expo", "React Native", "TypeScript"],
    description:
      "Fintech mobile app for the Ethiopian market: wallet, transactions, authentication, and user dashboards.",
    problem:
      "Users in the Ethiopian market needed a reliable mobile wallet for balances, transfers, and secure onboarding.",
    role: "Software engineer. Built wallet, send-money, transaction history, and auth flows on Expo React Native.",
    highlights: [
      "Wallet & transaction flows",
      "Authentication and onboarding",
      "Admin platforms for compliance monitoring",
    ],
    confidential: true,
    liveDemoOnRequest: true,
    year: "2024-2025",
    featured: true,
    coverImage: projectCover("e-sahal"),
    coverAlt: "e-Sahal mobile fintech app screens",
    uiScreenshots: shots("e-sahal", [
      "Wallet home & balance",
      "Send money flow",
      "Transaction history",
      "Onboarding & KYC screens",
    ]),
  },
  {
    id: "upeo-cbc",
    title: "Upeo CBC Portal",
    subtitle: "Student learning platform",
    category: "edtech",
    stack: ["React", "Next.js", "TypeScript", "Responsive UI"],
    description:
      "Competency-Based Curriculum portal for students: curriculum-aligned content, progress tracking, and learner workflows.",
    problem:
      "Learners and educators needed a CBC-aligned portal for curriculum content, progress, and accessible student workflows.",
    role: "Software engineer. Built responsive learner UI, auth, and API-backed student flows in Next.js.",
    highlights: [
      "CBC-aligned student experience",
      "Content delivery & progress tracking",
      "Accessible, mobile-friendly interfaces",
    ],
    confidential: true,
    liveDemoOnRequest: true,
    year: "2026",
    coverImage: projectCover("upeo-cbc"),
    coverAlt: "Upeo CBC student learning portal",
    uiScreenshots: shots("upeo-cbc", [
      "Student dashboard",
      "Lesson & progress tracker",
      "Mobile-responsive learner view",
    ]),
  },
  {
    id: "tenzi-pos",
    title: "Tenzi-POS",
    subtitle: "Offline-first point of sale (discontinued)",
    category: "enterprise",
    stack: ["React", "TypeScript", "IndexedDB"],
    description:
      "Scalable POS with real-time sales, inventory sync, and uninterrupted operation during network outages. Product discontinued.",
    problem:
      "Retail teams needed checkout and inventory that kept working through network outages and high transaction volume.",
    role: "Software engineer. Built offline-first POS UI, IndexedDB sync, and cashier/manager views.",
    highlights: [
      "Offline-first with automatic reconnect sync",
      "RBAC for cashiers, managers, and admins",
      "High-volume transaction optimization",
    ],
    confidential: true,
    discontinued: true,
    year: "2024",
    coverImage: projectCover("tenzi-pos"),
    coverAlt: "Tenzi POS checkout interface",
    uiScreenshots: shots("tenzi-pos", ["Point of sale interface"]),
  },
  {
    id: "tenzi-mrp",
    title: "Tenzi-MRP",
    subtitle: "Material requirements planning (discontinued)",
    category: "enterprise",
    stack: ["React", "TypeScript"],
    description:
      "MRP system for procurement, production planning, inventory management, and operational reporting. Product discontinued.",
    problem:
      "Operations teams needed procurement, production planning, and inventory visibility in one planning system.",
    role: "Software engineer. Built procurement and inventory dashboards, planning boards, and reporting UI.",
    highlights: [
      "Procurement & inventory dashboards",
      "Production planning workflows",
      "Reporting for operations teams",
    ],
    confidential: true,
    discontinued: true,
    year: "2024",
    coverImage: projectCover("tenzi-mrp"),
    coverAlt: "Tenzi MRP planning dashboard",
    uiScreenshots: shots("tenzi-mrp", [
      "Material requirements planning dashboard",
    ]),
  },
  {
    id: "carbon",
    title: "Carbon Credits Platform",
    subtitle: "Sustainability reporting",
    category: "enterprise",
    stack: ["Next.js", "TypeScript", "NestJS"],
    description:
      "Carbon credits reporting with feasibility studies, field data, and dashboards (ABPL collaboration).",
    problem:
      "Teams needed feasibility studies, gate criteria, field data, and AI-assisted recommendations for carbon projects.",
    role: "Software engineer. Built reporting dashboards, embedded forms, and feasibility workflow screens.",
    highlights: [
      "Reporting dashboards",
      "Reporting for project teams and partners",
    ],
    confidential: true,
    liveUrl: "http://carbonflow.sublimematrix.co.ke:3131/auth/login",
    year: "2026",
    featured: true,
    coverImage: projectCover("carbon"),
    coverAlt: "Carbon credits sustainability dashboard",
    uiScreenshots: shots("carbon", [
      "Credits overview dashboard",
      "Stakeholder reporting view",
    ]),
  },
  {
    id: "data-agg",
    title: "Data Aggregation Platform",
    subtitle: "Analytics & data views",
    category: "personal",
    stack: ["Next.js", "TypeScript", "MUI", "Tailwind"],
    description:
      "Personal analytics app with dashboards, auth, and pipeline views in Next.js.",
    problem:
      "Teams exploring analytics need clear patterns for dashboards, auth, and pipeline views in a modern Next.js stack.",
    role: "Personal project. Built the full UI, routing, and components for data aggregation flows.",
    highlights: ["Dashboard layouts", "Type-safe Next.js app structure"],
    confidential: false,
    liveUrl: "https://data-aggregation-firm.vercel.app/",
    year: "2025",
    coverImage: projectCover("data-agg"),
    coverAlt: "Data aggregation analytics UI",
    uiScreenshots: shots("data-agg", [
      "Main analytics dashboard",
      "Data table & filters",
      "Detail drill-down panel",
    ]),
  },
  {
    id: "school",
    title: "School Management System",
    subtitle: "Admin & operations",
    category: "personal",
    stack: ["Next.js", "TypeScript", "MUI"],
    description:
      "School administration demo with admin workflows and management interfaces.",
    problem:
      "School admins needed one place to manage teachers, subjects, attendance, and exams without scattered spreadsheets.",
    role: "Personal project. Built the admin console, CRUD screens, and school ops UI.",
    highlights: ["Admin console patterns", "CRUD and role-based views"],
    confidential: false,
    liveUrl:
      "https://school-management-system-gamma-nine.vercel.app/admin",
    year: "2025",
    coverImage: projectCover("school"),
    coverAlt: "School management admin console",
    uiScreenshots: shots("school", [
      "Admin home overview",
      "Teachers management",
      "Subjects & curriculum",
      "Attendance tracking",
      "Exams & grading",
    ]),
  },
  {
    id: "habit-flow",
    title: "Habit Flow",
    subtitle: "Habits, projects, and activity tracking",
    category: "personal",
    stack: ["Next.js", "TypeScript", "Tailwind", "REST API"],
    description:
      "A personal activity tracker I use to log habits and learning work. The Next.js app fetches habits, project roadmaps, check-ins, streaks, and analytics from a backend API so progress is saved and I can see what I completed, skipped, or missed over time. Learning projects split each day into a checklist with unlocks as I go.",
    problem:
      "I needed one place to track daily habits and longer learning projects, with history that lives on a backend instead of only in the browser.",
    role: "Personal project. Built the Next.js UI and wired it to a backend API for habits, project progress, reminders, analytics, and settings.",
    highlights: [
      "API-backed habits, streaks, and activity history",
      "Learning projects with daily checklists and unlocks",
      "Reminders, heatmaps, and progress analytics",
    ],
    confidential: false,
    liveUrl: "https://didactic-eureka-psi.vercel.app/",
    year: "2025-2026",
    coverImage: projectCover("habit-flow"),
    coverAlt: "Habit Flow home dashboard",
    uiScreenshots: shots("habit-flow", [
      "Home dashboard",
      "Habits list",
      "Learning projects",
      "Project day roadmap",
      "Project check-in and progress",
      "Progress analytics",
    ]),
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
