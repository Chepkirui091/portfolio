"""
Generate cover letter DOCX (matches resume styling).
Run: python scripts/build-cover-letter.py
"""

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUT = DOCS / "daphne-chepkirui-cover-letter.docx"

BLUE = RGBColor(37, 99, 235)
BLACK = RGBColor(15, 23, 42)
PORTFOLIO = "https://portfolio-omega-umber-28.vercel.app/"


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


def main() -> None:
    doc = Document()
    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(11)
    style.font.color.rgb = BLACK

    name = doc.add_paragraph()
    name.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r = name.add_run("Daphne Chepkirui")
    r.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = BLUE

    contact = doc.add_paragraph()
    contact.add_run("Nairobi, Kenya\n")
    p = doc.add_paragraph()
    add_hyperlink(p, "chepkiruidaphne91@gmail.com", "mailto:chepkiruidaphne91@gmail.com")
    p.add_run(" | +254 111 620 160\nPortfolio: ")
    add_hyperlink(p, "portfolio-omega-umber-28.vercel.app", PORTFOLIO)

    doc.add_paragraph()

    doc.add_paragraph("[Date]")
    doc.add_paragraph()
    doc.add_paragraph("[Hiring Manager Name]")
    doc.add_paragraph("[Company Name]")
    doc.add_paragraph("[Company Address or Remote]")
    doc.add_paragraph()

    doc.add_paragraph("Dear [Hiring Manager Name / Hiring Team],")
    doc.add_paragraph()

    paragraphs = [
        (
            "I am writing to apply for the [Job Title] role at [Company Name]. "
            "I am a frontend engineer based in Nairobi with 3+ years building production web "
            "and mobile products in React, Next.js, React Native, and TypeScript. Your team's "
            "focus on [one specific thing from the job post] lines up closely with the work I "
            "have been doing, and I would like to bring that experience to [Company Name]."
        ),
        (
            "At Dynamic Mobility Technology, I lead frontend work on KISRS, a healthcare referral "
            "platform used by hospitals and laboratories across Kenya. That meant role-based workflows "
            "for clinicians and lab staff, real-time referral dashboards, and close work with backend "
            "engineers to ship a stable UAT release. I have also built insurance admin and agents portals "
            "(claims, commissions, bookings, and reporting), contributed to e-Sahal (a React Native fintech "
            "wallet), and led UI for a carbon credits reporting platform. Across these projects I am used "
            "to RBAC, dense admin interfaces, and shipping under NDA when needed."
        ),
        (
            "Before that, I built offline-first POS and MRP systems at Tenzi Limited, freelance CBC student "
            "tooling for Upeo, and several personal projects that are live on Vercel. I care about how "
            "products feel, not just whether they compile: responsive layout, accessibility, design systems, "
            "and performance habits like code splitting and lazy loading are part of my normal workflow."
        ),
    ]

    for text in paragraphs:
        doc.add_paragraph(text)

    closing = doc.add_paragraph()
    closing.add_run(
        "I would welcome a conversation about how I can help [Company Name] with "
        "[specific team goal from the posting]. My portfolio at "
    )
    add_hyperlink(closing, "portfolio-omega-umber-28.vercel.app", PORTFOLIO)
    closing.add_run(
        " includes project breakdowns and UI previews, and I am happy to walk through "
        "enterprise work in a live demo if that would be useful."
    )

    doc.add_paragraph()
    doc.add_paragraph("Thank you for your time and consideration.")
    doc.add_paragraph()
    doc.add_paragraph("Sincerely,")
    sig = doc.add_paragraph()
    r = sig.add_run("Daphne Chepkirui")
    r.bold = True

    DOCS.mkdir(exist_ok=True)
    doc.save(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
