export const site = {
  name: "Daphne Chepkirui",
  title: "Full-Stack Software Developer",
  tagline:
    "Building modern web and mobile applications with React, Next.js, NestJS, Django, PostgreSQL, and AI-assisted development workflows",
  location: "Nairobi, Kenya",
  email: "chepkiruidaphne91@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_DIGITS ?? "",
  linkedin: "https://www.linkedin.com/in/daphne-chepkirui-382178313",
  linkedinLabel: "daphne-chepkirui",
  github: [
    { label: "Professional GitHub", url: "https://github.com/DMT-Daph" },
    { label: "Personal GitHub", url: "https://github.com/Chepkirui091" },
  ],
  portfolioUrl: "https://portfolio-omega-umber-28.vercel.app/",
  resumePath: "/Daphne_Chepkirui_Resume.pdf",
  resumeFilename: "Daphne_Chepkirui_Resume.pdf",
  confidentialNote:
    "Some enterprise work is under NDA. I can show live demos on request for everything except discontinued Tenzi products.",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#featured", label: "Featured" },
  { href: "#showcase", label: "UI" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "References" },
  { href: "#contact", label: "Contact" },
];
