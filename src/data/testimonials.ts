export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  date?: string;
  project?: string;
  /** Original wording when the feedback was not in English */
  originalQuote?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I use the wallet at the highest level. Transfers and day-to-day use are smooth.",
    originalQuote:
      "Noolasha Nimaan Wallet isticmaalin Heer magaadho sxb",
    name: "Cladiif Maxamed",
    role: "e-Sahal user",
    date: "October 15, 2025",
    project: "e-Sahal",
  },
  {
    quote: "e-Sahal is the best wallet. MoneyGram works great for me.",
    originalQuote: "Esahal is best wallet Money Garam",
    name: "Maahir Maxamed",
    role: "e-Sahal user",
    date: "June 17, 2025",
    project: "e-Sahal",
  },
  {
    quote:
      "Daphne owned the referral dashboards end to end. RBAC was clear for clinicians and lab staff, and she handled backend coordination without slowing delivery.",
    name: "Backend developer",
    role: "Dynamic Mobility Technology, KISRS team",
    date: "2025",
    project: "KISRS",
  },
  {
    quote:
      "She turned our CBC requirements into a student portal we could actually ship. Responsive layouts, clean handoffs, and she was easy to work with on feedback rounds.",
    name: "Project contact",
    role: "Upeo, freelance client",
    date: "2026",
    project: "Upeo CBC Portal",
  },
  {
    quote:
      "Strong on complex admin UI: claims flows, tables, and permissions. Code reviews were thorough and the dashboards held up under real operations load.",
    name: "Engineering lead",
    role: "Insurance platform (NDA)",
    date: "2025-2026",
    project: "Insurance Admin Portal",
  },
];

export const referencesNote =
  "Named references available on request. Contact section for details.";
