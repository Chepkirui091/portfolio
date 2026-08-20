import { readFile } from "fs/promises";
import path from "path";

const RESUME_FILE = "Daphne_Chepkirui_Resume.pdf";

export async function GET() {
  const publicPath = path.join(process.cwd(), "public", RESUME_FILE);
  const docsPath = path.join(process.cwd(), "docs", "daphne-chepkirui-resume.pdf");

  try {
    const file = await readFile(publicPath).catch(() => readFile(docsPath));

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${RESUME_FILE}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return new Response("Resume not found. Run npm run resume to generate it.", {
      status: 404,
    });
  }
}
