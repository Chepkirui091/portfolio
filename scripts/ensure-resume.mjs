import { spawnSync } from "child_process";
import { existsSync } from "fs";

const out = "public/Daphne_Chepkirui_Resume.pdf";

function run(bin) {
  return spawnSync(bin, ["scripts/build-resume.py"], {
    stdio: "inherit",
    shell: true,
  });
}

let result = run("python");
if (result.status !== 0) {
  result = run("python3");
}

if (result.status !== 0 || !existsSync(out)) {
  console.warn(
    "Resume PDF was not generated. Header download will 404 until you run npm run resume locally. Generated CVs stay gitignored."
  );
}
