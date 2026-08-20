export const siteImages = {
  avatar: "/profile/smiling.jpg",
  heroAccent: "/profile/laptop-code.jpg",
};

export type ProjectShot = {
  src: string;
  caption: string;
  device?: "mobile" | "desktop";
};

export type ProjectAsset = {
  cover: string;
  shots: ProjectShot[];
  desktop?: string;
  mobile?: string;
};

/** Each project id maps only to images under its own public folder. */
export const projectAssets: Record<string, ProjectAsset> = {
  // public/static/isrs/
  isrs: {
    cover: "/static/isrs/kisrs-landing-page.png",
    shots: [
      {
        src: "/static/isrs/kisrs-landing-page.png",
        caption: "Referral pipeline overview",
      },
      {
        src: "/static/isrs/kisrs-facilities-page.png",
        caption: "Lab coordination workspace",
      },
      {
        src: "/static/isrs/kisrs-facility-details.png",
        caption: "Facility referral details",
      },
      {
        src: "/static/isrs/kirsrs-roles.png",
        caption: "Role-based admin console",
      },
      {
        src: "/static/isrs/kisrs-landing-extension.png",
        caption: "Landing page extension",
      },
    ],
  },

  // public/static/admin/
  "insurance-admin": {
    cover: "/static/admin/dashboard.png",
    shots: [
      { src: "/static/admin/dashboard.png", caption: "Operations home dashboard" },
      { src: "/static/admin/login.png", caption: "Secure admin login" },
      { src: "/static/admin/leads.png", caption: "Leads management" },
      { src: "/static/admin/agents.png", caption: "Agent & commission management" },
      { src: "/static/admin/copilot.png", caption: "AI copilot assistant" },
    ],
  },

  // public/static/agents-portal/
  "agents-portal": {
    cover: "/static/agents-portal/dashboard.png",
    shots: [
      { src: "/static/agents-portal/dashboard.png", caption: "Agent workspace" },
      { src: "/static/agents-portal/bookings.png", caption: "Bookings overview" },
      {
        src: "/static/agents-portal/booking-details.png",
        caption: "Booking detail view",
      },
      { src: "/static/agents-portal/customers.png", caption: "Customer management" },
      { src: "/static/agents-portal/copilot.png", caption: "Agent copilot" },
    ],
  },

  // public/static/sahal/
  "e-sahal": {
    cover: "/static/sahal/sahal-dashboard.webp",
    shots: [
      { src: "/static/sahal/sahal-dashboard.webp", caption: "Wallet home & balance", device: "mobile" },
      { src: "/static/sahal/sahal-login.webp", caption: "Authentication & onboarding", device: "mobile" },
      { src: "/static/sahal/sahal-send-money.webp", caption: "Send money flow", device: "mobile" },
      {
        src: "/static/sahal/sahal-transactions.webp",
        caption: "Transaction history",
        device: "mobile",
      },
      { src: "/static/sahal/sahal-settings.webp", caption: "Account settings", device: "mobile" },
    ],
  },

  // public/static/beautilink/
  beautilink: {
    cover: "/static/beautilink/admin/dashboard.png",
    desktop: "/static/beautilink/admin/dashboard.png",
    mobile: "/static/beautilink/mobile/dashboard.png",
    shots: [
      {
        src: "/static/beautilink/admin/dashboard.png",
        caption: "Admin operations dashboard",
        device: "desktop",
      },
      { src: "/static/beautilink/admin/login.png", caption: "Admin login", device: "desktop" },
      { src: "/static/beautilink/admin/settings.png", caption: "Admin settings", device: "desktop" },
      {
        src: "/static/beautilink/mobile/dashboard.png",
        caption: "Mobile home dashboard",
        device: "mobile",
      },
      {
        src: "/static/beautilink/mobile/dashboard-customer.png",
        caption: "Customer dashboard",
        device: "mobile",
      },
      { src: "/static/beautilink/mobile/shop.png", caption: "Shop and bookings", device: "mobile" },
      { src: "/static/beautilink/mobile/signup.png", caption: "Mobile signup", device: "mobile" },
      {
        src: "/static/beautilink/mobile/social-chat.png",
        caption: "Social chat",
        device: "mobile",
      },
    ],
  },

  // public/static/upeo-learners-portal/
  "upeo-cbc": {
    cover: "/static/upeo-learners-portal/login-page.png",
    shots: [
      {
        src: "/static/upeo-learners-portal/login-page.png",
        caption: "Student login & onboarding",
      },
    ],
  },

  // public/pos/
  "tenzi-pos": {
    cover: "/pos/pos.jpg",
    shots: [{ src: "/pos/pos.jpg", caption: "Point of sale interface" }],
  },

  // public/mrp/
  "tenzi-mrp": {
    cover: "/mrp/mrp.jpg",
    shots: [
      { src: "/mrp/mrp.jpg", caption: "Material requirements planning dashboard" },
    ],
  },

  // public/static/carbon-credits/
  carbon: {
    cover: "/static/carbon-credits/dashboard.png",
    shots: [
      {
        src: "/static/carbon-credits/dashboard.png",
        caption: "Credits overview dashboard",
      },
      {
        src: "/static/carbon-credits/deasibility.png",
        caption: "Feasibility assessment",
      },
      {
        src: "/static/carbon-credits/feasibility-study-details.png",
        caption: "Feasibility study details",
      },
      {
        src: "/static/carbon-credits/gate-criteria.png",
        caption: "Gate criteria review",
      },
      {
        src: "/static/carbon-credits/kobo-form-embed.png",
        caption: "Field data collection",
      },
      {
        src: "/static/carbon-credits/recommendations-using-ai.png",
        caption: "AI-powered recommendations",
      },
    ],
  },

  // public/datanest/
  "data-agg": {
    cover: "/datanest/hero-section.png",
    shots: [
      { src: "/datanest/hero-section.png", caption: "Main analytics dashboard" },
      { src: "/datanest/login-register.png", caption: "Authentication flows" },
      { src: "/datanest/pipelines.png", caption: "Data pipelines view" },
    ],
  },

  // public/school-management/
  school: {
    cover: "/school-management/landing.png",
    shots: [
      { src: "/school-management/landing.png", caption: "Admin home overview" },
      { src: "/school-management/teachers.png", caption: "Teachers management" },
      { src: "/school-management/subjects.png", caption: "Subjects & curriculum" },
      { src: "/school-management/attendance.png", caption: "Attendance tracking" },
      { src: "/school-management/exams.png", caption: "Exams & grading" },
    ],
  },

  // public/habit-flow/
  "habit-flow": {
    cover: "/habit-flow/landing.png",
    shots: [
      { src: "/habit-flow/landing.png", caption: "Home dashboard" },
      { src: "/habit-flow/habits-list.png", caption: "Habits list" },
      { src: "/habit-flow/projects-module.png", caption: "Learning projects" },
      { src: "/habit-flow/project-tasks.png", caption: "Project day roadmap" },
      { src: "/habit-flow/done-clicked.png", caption: "Project check-in and progress" },
      { src: "/habit-flow/analytics.png", caption: "Progress analytics" },
      { src: "/habit-flow/reminders.png", caption: "Reminders and notifications" },
      { src: "/habit-flow/settings.png", caption: "User settings" },
    ],
  },
};

export function isMobileShot(
  src: string,
  device?: "mobile" | "desktop"
): boolean {
  if (device === "mobile") return true;
  if (device === "desktop") return false;
  return /\/mobile\/|\/sahal\//i.test(src);
}

export function projectVisuals(id: string): {
  desktop?: string;
  mobile?: string;
} {
  const assets = projectAssets[id];
  if (!assets) return {};
  const desktopFromShots = assets.shots.find(
    (shot) => !isMobileShot(shot.src, shot.device)
  )?.src;
  const mobileFromShots = assets.shots.find((shot) =>
    isMobileShot(shot.src, shot.device)
  )?.src;
  return {
    desktop: assets.desktop ?? desktopFromShots,
    mobile: assets.mobile ?? mobileFromShots,
  };
}

export function projectCover(id: string): string {
  const assets = projectAssets[id];
  if (!assets) {
    throw new Error(`No image assets configured for project: ${id}`);
  }
  return assets.cover;
}

export function projectScreenshots(
  id: string,
  fallbackCaptions: string[]
): { src: string; alt: string; caption: string; device?: "mobile" | "desktop" }[] {
  const assets = projectAssets[id];
  if (assets?.shots.length) {
    return assets.shots.map((shot) => ({
      src: shot.src,
      alt: `${shot.caption} UI preview`,
      caption: shot.caption,
      device: shot.device,
    }));
  }
  const cover = projectCover(id);
  return fallbackCaptions.map((caption) => ({
    src: cover,
    alt: `${caption} UI preview`,
    caption,
  }));
}
