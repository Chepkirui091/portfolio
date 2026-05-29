import { readFile } from "fs/promises";
import path from "path";

const RESUME_FILE = "daphne-chepkirui-resume.pdf";

export async function GET() {
  const filePath = path.join(process.cwd(), "docs", RESUME_FILE);

  try {
    const file = await readFile(filePath);

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
