"""
Generate ATS-friendly resume (PDF + DOCX) from portfolio-aligned content.
Run: python scripts/build-resume.py
"""

from __future__ import annotations

import re
from pathlib import Path
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor
from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
RESUME_PDF = DOCS / "daphne-chepkirui-resume.pdf"

# Titles and links only (skills body stays black)
BLUE = (37, 99, 235)  # #2563eb
BLUE_HEX = "#2563eb"
BLACK = (15, 23, 42)  # #0f172a
BLACK_HEX = "#0f172a"

CONTACT = {
    "name": "DAPHNE CHEPKIRUI",
    "title": "Frontend Software Engineer",
    "location": "Nairobi, Kenya",
    "email": "chepkiruidaphne91@gmail.com",
    "phone": "+254111620160",
    "phone_display": "+254 111 620 160",
    "github": [
        ("Chepkirui091", "https://github.com/Chepkirui091"),
        ("DMT-Daph", "https://github.com/DMT-Daph"),
    ],
}

SUMMARY = (
    "Frontend engineer with 3+ years building web and mobile apps in React, Next.js, "
    "React Native, JavaScript, and TypeScript. Recent work includes KISRS (healthcare), "
    "insurance admin and agents portals, e-Sahal (fintech), Upeo CBC (edtech), and a "
    "carbon credits reporting platform. Strong UI/UX skills (design systems, accessibility, "
    "responsive layout) and solid frontend performance habits (code splitting, lazy loading, Web Vitals). "
    "Regular work with RBAC, dashboards, and backend teams."
)

SKILLS = {
    "Languages": "JavaScript, TypeScript, HTML5, CSS3",
    "Frameworks and Libraries": (
        "React, Next.js, React Native, Material UI, Tailwind CSS, Redux, "
        "shadcn/ui, Styled Components"
    ),
    "Tools and Platforms": "Git, GitHub, Docker, Webpack, npm, pnpm, Vercel, Figma",
    "UI/UX and Quality": (
        "Design Systems, Responsive Design, WCAG Accessibility, Jest, "
        "React Testing Library, Cypress, Web Vitals, Code Splitting"
    ),
}

EXPERIENCE = [
    {
        "role": "Frontend Developer",
        "company": "Dynamic Mobility Technology",
        "period": "February 2024 - Present",
        "location": "Kenya",
        "bullets": [
            "Lead frontend for KISRS (Kenya Integrated Sample Referral System): RBAC workflows, real-time referral dashboards, and UAT release (https://uat.isrs.co.ke/).",
            "Built enterprise insurance admin portal (2025-2026): agents, commissions, claims journey, digital store, and operational reporting.",
            "Built insurance agents portal (2025-2026): bookings, customer management, policy workflows, and agent copilot UI.",
            "Contributed to e-Sahal fintech mobile app (2024-2025, React Native): wallet, transactions, authentication, and onboarding.",
            "Led frontend for carbon credits platform (2026): feasibility workflows, reporting dashboards, and field data collection UI.",
            "Improved performance via lazy loading, optimized state management, and route-level code splitting in Next.js codebases.",
        ],
    },
    {
        "role": "Freelance Frontend Developer",
        "company": "Upeo",
        "period": "Freelance (2026)",
        "location": "Kenya",
        "bullets": [
            "Built Upeo CBC student portal: curriculum content, progress tracking, and learner workflows.",
            "Built responsive interfaces and API integrations for enrollment and student-facing experiences.",
        ],
    },
    {
        "role": "Frontend Developer",
        "company": "Tenzi Limited",
        "period": "May 2024 - January 2025",
        "location": "Kenya",
        "bullets": [
            "Built Tenzi-MRP for procurement, production planning, and inventory management (product discontinued).",
            "Built Tenzi-POS with offline-first IndexedDB sync, RBAC, and checkout UI (product discontinued).",
        ],
    },
    {
        "role": "Frontend Developer",
        "company": "CityRight Limited",
        "period": "October 2023 - January 2024",
        "location": "Kenya",
        "bullets": [
            "Built accessible interfaces and integrated REST APIs for e-commerce and marketing sites.",
            "Optimized frontend performance and maintained sites with team coding standards.",
        ],
    },
    {
        "role": "Frontend Developer",
        "company": "Computer Engineering Forum",
        "period": "April 2023 - July 2023",
        "location": "Remote",
        "bullets": [
            "Supported e-commerce builds, performance tuning, and design collaboration.",
        ],
    },
    {
        "role": "Data Analyst",
        "company": "AMREC",
        "period": "May 2023 - August 2023",
        "location": "Kenya",
        "bullets": [
            "Fixed data issues and built reports and charts for internal teams.",
        ],
    },
]

PORTFOLIO_URL = "https://portfolio-omega-umber-28.vercel.app/"

PROJECTS = [
    (
        "Portfolio Website (2025-2026)",
        "Personal project. Next.js, TypeScript, Tailwind CSS, Framer Motion.",
        f"Personal portfolio with curated projects, UI previews, testimonials, and resume download. Live: {PORTFOLIO_URL}",
    ),
    (
        "KISRS - Kenya Integrated Sample Referral System (2025-2026)",
        "Lead frontend developer. React, Next.js, JavaScript, MUI, RBAC.",
        "Healthcare referral management with secure dashboards and role-based workflows. Live UAT: https://uat.isrs.co.ke/",
    ),
    (
        "Insurance Admin Portal (2025-2026)",
        "Frontend engineer. Next.js, React, MUI, Redux, RBAC.",
        "Enterprise insurance operations: agents, claims, commissions, and reporting. Live demo on request (NDA).",
    ),
    (
        "Insurance Agents Portal (2025-2026)",
        "Frontend engineer. React, Next.js, TypeScript, MUI.",
        "Agent workspace for bookings, customers, and policy workflows. Live demo on request (NDA).",
    ),
    (
        "e-Sahal Mobile Fintech (2024-2025)",
        "React Native engineer. React Native, TypeScript.",
        "Wallet, send-money, transactions, and authentication for Ethiopian market. Live demo on request (NDA).",
    ),
    (
        "Carbon Credits Platform - CarbonFlow (2026)",
        "Frontend engineer. React, Next.js.",
        "Sustainability reporting, feasibility studies, and AI-assisted recommendations. Live: http://carbonflow.sublimematrix.co.ke:3131/auth/login",
    ),
    (
        "Data Aggregation Platform (2025)",
        "Personal project. Next.js, TypeScript, MUI, Tailwind CSS.",
        "Analytics dashboards and pipeline views. Live: https://data-aggregation-firm.vercel.app/",
    ),
    (
        "School Management System (2025)",
        "Personal project. Next.js, TypeScript, MUI.",
        "Admin console for teachers, subjects, attendance, and exams. Live: https://school-management-system-gamma-nine.vercel.app/admin",
    ),
    (
        "Habit Flow (2025)",
        "Personal project. Next.js, TypeScript, Tailwind CSS.",
        "Personal habit tracking with streaks, reminders, and analytics.",
    ),
    (
        "Tenzi-POS / Tenzi-MRP (2024, discontinued)",
        "Frontend engineer. React, TypeScript, IndexedDB.",
        "Offline-first POS and MRP systems. Products discontinued; no live environment.",
    ),
]

EDUCATION = [
    ("Bachelor of Science in Computer Science", "Laikipia University, graduated 2023"),
]

VOLUNTEER = [
    (
        "Mentor, Technovation (remote), December 2022 - April 2023",
        "Mentored high-school students on product ideas and team projects.",
    ),
    (
        "Mentor, Google Developer Groups, Laikipia University and Kisumu",
        "Helped developers with frontend basics and study sessions.",
    ),
]

REFERENCES = [
    "Dennis Njoroge - HR, Dynamic Mobility Technology - 0701 824 145",
    "John Kariuki - Developer, CityRight Limited - 0789 122 989",
    "Alex Kibet - DOS, Laikipia University - 0717 470 102",
    "Frank Ouma - Lead, AMREC Kisumu - 0745 026 157",
]

NDA_NOTE = (
    "Some enterprise work is under NDA. Email chepkiruidaphne91@gmail.com or call +254 111 620 160 "
    "to arrange a demo of the projects that fit your role."
)

URL_RE = re.compile(
    r"(https?://[^\s\)\],]+|(?:uat\.)?isrs\.co\.ke/?|(?:[\w-]+\.)?vercel\.app[^\s\)]*|github\.com/[\w-]+|carbonflow\.sublimematrix\.co\.ke[^\s\)]*)",
    re.IGNORECASE,
)


def normalize_url(raw: str) -> str:
    url = raw.rstrip(".,;)")
    if url.startswith("http"):
        return url
    if "github.com" in url:
        return f"https://{url}"
    return f"https://{url}"


def text_to_html(text: str) -> str:
    """Turn plain text into HTML with clickable links."""
    escaped = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )

    def repl(match: re.Match[str]) -> str:
        raw = match.group(0)
        href = normalize_url(raw)
        label = raw.rstrip(".,;)")
        return f'<a href="{href}" color="{BLUE_HEX}"><u>{label}</u></a>'

    return URL_RE.sub(repl, escaped)


def email_to_html(email: str) -> str:
    return f'<a href="mailto:{email}" color="{BLUE_HEX}"><u>{email}</u></a>'


def write_markdown(path: Path) -> None:
    gh = " | ".join(f"[{label}]({url})" for label, url in CONTACT["github"])
    lines = [
        f"# {CONTACT['name'].title()}",
        f"**{CONTACT['title']}** | {CONTACT['location']}",
        f"[{CONTACT['email']}](mailto:{CONTACT['email']}) | {CONTACT['phone_display']} | {gh}",
        "",
        "## Professional Summary",
        SUMMARY,
        "",
        "## Technical Skills",
    ]
    for title, items in SKILLS.items():
        lines.append(f"**{title}:** {items}")
    lines.extend(["", "## Professional Experience"])
    for job in EXPERIENCE:
        lines.append(
            f"### {job['role']} | {job['company']} | {job['location']} | {job['period']}"
        )
        for b in job["bullets"]:
            lines.append(f"- {b}")
    lines.extend(["", "## Selected Projects"])
    for title, role, desc in PROJECTS:
        lines.append(f"### {title}")
        lines.append(f"*{role}*")
        lines.append(desc)
    lines.extend(["", "## Portfolio and Live Demos", NDA_NOTE])
    lines.extend(["", "## Education"])
    for deg, school in EDUCATION:
        lines.append(f"**{deg}** - {school}")
    lines.extend(["", "## Volunteer and Community"])
    for header, detail in VOLUNTEER:
        lines.append(f"**{header}**")
        lines.append(detail)
    lines.extend(["", "## References"])
    lines.extend([f"- {r}" for r in REFERENCES])
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


class ResumePDF(FPDF):
    def __init__(self) -> None:
        super().__init__()
        self.set_auto_page_break(auto=True, margin=14)
        self.set_margins(14, 14, 14)

    @property
    def content_width(self) -> float:
        return self.w - self.l_margin - self.r_margin

    def section_heading(self, text: str) -> None:
        if self.get_y() > 250:
            self.add_page()
        self.ln(4)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(*BLUE)
        self.cell(self.content_width, 7, text, new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(*BLUE)
        self.set_line_width(0.4)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(5)
        self.set_text_color(*BLACK)

    def write_html_block(self, html: str, size: int = 10) -> None:
        self.set_font("Helvetica", size=size)
        self.write_html(html)

    def body_text(self, text: str, bold: bool = False) -> None:
        prefix = "<b>" if bold else ""
        suffix = "</b>" if bold else ""
        self.write_html_block(f"<p>{prefix}{text_to_html(text)}{suffix}</p>")

    def bullet(self, text: str) -> None:
        self.write_html_block(f"<p style='margin-left:8px'>- {text_to_html(text)}</p>")


def write_pdf(path: Path) -> None:
    pdf = ResumePDF()
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(*BLUE)
    pdf.cell(0, 10, CONTACT["name"], new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*BLACK)
    pdf.cell(0, 6, f"{CONTACT['title']} | UI/UX Focus", new_x="LMARGIN", new_y="NEXT")

    gh_links = " &nbsp;|&nbsp; ".join(
        f'<a href="{url}" color="{BLUE_HEX}"><u>github.com/{label}</u></a>'
        for label, url in CONTACT["github"]
    )
    contact_html = (
        f"<p>{CONTACT['location']} &nbsp;|&nbsp; "
        f"{email_to_html(CONTACT['email'])} &nbsp;|&nbsp; "
        f'<a href="tel:{CONTACT["phone"]}" color="{BLUE_HEX}"><u>{CONTACT["phone_display"]}</u></a> '
        f"&nbsp;|&nbsp; {gh_links}</p>"
    )
    pdf.set_font("Helvetica", "", 10)
    pdf.write_html(contact_html)
    pdf.ln(2)

    pdf.section_heading("PROFESSIONAL SUMMARY")
    pdf.body_text(SUMMARY)

    pdf.section_heading("TECHNICAL SKILLS")
    for title, items in SKILLS.items():
        pdf.write_html_block(
            f'<p><font color="{BLACK_HEX}"><b>{title}:</b></font> '
            f'<font color="{BLACK_HEX}">{items}</font></p>'
        )

    pdf.section_heading("PROFESSIONAL EXPERIENCE")
    for job in EXPERIENCE:
        pdf.write_html_block(
            f'<p><b>{job["role"]}</b> | {job["company"]} | {job["location"]} | <i>{job["period"]}</i></p>'
        )
        for bullet in job["bullets"]:
            pdf.bullet(bullet)
        pdf.ln(1)

    pdf.section_heading("SELECTED PROJECTS")
    for title, role, desc in PROJECTS:
        pdf.write_html_block(f"<p><b>{text_to_html(title)}</b></p>")
        pdf.body_text(role)
        pdf.body_text(desc)
        pdf.ln(1)

    pdf.section_heading("PORTFOLIO AND LIVE DEMOS")
    pdf.body_text(NDA_NOTE)

    pdf.section_heading("EDUCATION")
    for deg, school in EDUCATION:
        pdf.body_text(f"{deg} | {school}")

    pdf.section_heading("VOLUNTEER AND COMMUNITY")
    for header, detail in VOLUNTEER:
        pdf.body_text(header, bold=True)
        pdf.body_text(detail)

    pdf.section_heading("REFERENCES")
    for ref in REFERENCES:
        pdf.bullet(ref)

    pdf.output(str(path))


def add_hyperlink(paragraph, text: str, url: str) -> None:
    part = paragraph.part
    r_id = part.relate_to(url, RT.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)
    run = OxmlElement("w:r")
    r_pr = OxmlElement("w:rPr")
    color = OxmlElement("w:color")
    color.set(qn("w:val"), "2563EB")
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    r_pr.append(color)
    r_pr.append(underline)
    run.append(r_pr)
    text_elem = OxmlElement("w:t")
    text_elem.text = text
    run.append(text_elem)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def add_linked_paragraph(doc: Document, text: str, style: str | None = None) -> None:
    p = doc.add_paragraph(style=style) if style else doc.add_paragraph()
    last = 0
    for match in URL_RE.finditer(text):
        if match.start() > last:
            p.add_run(text[last : match.start()])
        raw = match.group(0)
        label = raw.rstrip(".,;)")
        add_hyperlink(p, label, normalize_url(raw))
        last = match.end()
    if last < len(text):
        p.add_run(text[last:])
    if last == 0:
        p.add_run(text)


def add_section_heading(doc: Document, heading: str) -> None:
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(heading)
    run.bold = True
    run.font.size = Pt(12)
    run.font.color.rgb = RGBColor(*BLUE)


def write_docx(path: Path) -> None:
    doc = Document()
    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(10.5)
    style.font.color.rgb = RGBColor(*BLACK)

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title.add_run(CONTACT["name"].title())
    run.bold = True
    run.font.size = Pt(20)
    run.font.color.rgb = RGBColor(*BLUE)

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = sub.add_run(f"{CONTACT['title']} | UI/UX Focus")
    r.font.size = Pt(11)

    contact = doc.add_paragraph()
    contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    contact.add_run(f"{CONTACT['location']} | ")
    add_hyperlink(contact, CONTACT["email"], f"mailto:{CONTACT['email']}")
    contact.add_run(" | ")
    add_hyperlink(contact, CONTACT["phone_display"], f"tel:{CONTACT['phone']}")
    for i, (label, url) in enumerate(CONTACT["github"]):
        contact.add_run(" | ")
        add_hyperlink(contact, f"github.com/{label}", url)

    add_section_heading(doc, "PROFESSIONAL SUMMARY")
    doc.add_paragraph(SUMMARY)

    add_section_heading(doc, "TECHNICAL SKILLS")
    for skill_title, items in SKILLS.items():
        p = doc.add_paragraph()
        r = p.add_run(f"{skill_title}: ")
        r.bold = True
        r.font.color.rgb = RGBColor(*BLACK)
        r2 = p.add_run(items)
        r2.font.color.rgb = RGBColor(*BLACK)

    add_section_heading(doc, "PROFESSIONAL EXPERIENCE")
    for job in EXPERIENCE:
        p = doc.add_paragraph()
        r = p.add_run(
            f"{job['role']} | {job['company']} | {job['location']} | {job['period']}"
        )
        r.bold = True
        for bullet in job["bullets"]:
            add_linked_paragraph(doc, bullet, style="List Bullet")

    add_section_heading(doc, "SELECTED PROJECTS")
    for proj_title, role, desc in PROJECTS:
        p = doc.add_paragraph()
        p.add_run(proj_title).bold = True
        doc.add_paragraph(role)
        add_linked_paragraph(doc, desc)

    add_section_heading(doc, "PORTFOLIO AND LIVE DEMOS")
    p = doc.add_paragraph()
    p.add_run(NDA_NOTE.split("chepkiruidaphne91@gmail.com")[0])
    add_hyperlink(p, CONTACT["email"], f"mailto:{CONTACT['email']}")
    rest = NDA_NOTE.split("chepkiruidaphne91@gmail.com", 1)[1]
    before_phone, _, after_phone = rest.partition("+254 111 620 160")
    p.add_run(before_phone)
    add_hyperlink(p, CONTACT["phone_display"], f"tel:{CONTACT['phone']}")
    p.add_run(after_phone)

    add_section_heading(doc, "EDUCATION")
    for deg, school in EDUCATION:
        doc.add_paragraph(f"{deg} | {school}")

    add_section_heading(doc, "VOLUNTEER AND COMMUNITY")
    for header, detail in VOLUNTEER:
        p = doc.add_paragraph()
        p.add_run(header).bold = True
        doc.add_paragraph(detail)

    add_section_heading(doc, "REFERENCES")
    for ref in REFERENCES:
        doc.add_paragraph(ref, style="List Bullet")

    doc.save(str(path))


def main() -> None:
    DOCS.mkdir(exist_ok=True)

    md_path = DOCS / "daphne-chepkirui-resume.md"
    docx_path = DOCS / "daphne-chepkirui-resume.docx"

    write_markdown(md_path)
    write_docx(docx_path)
    write_pdf(RESUME_PDF)

    print(f"Wrote {md_path}")
    print(f"Wrote {docx_path}")
    print(f"Wrote {RESUME_PDF}")


if __name__ == "__main__":
    main()
