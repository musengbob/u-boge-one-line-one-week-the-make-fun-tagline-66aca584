// One Line, One Week: The make.fun Tagline — make.fun entry.
// Writes one tagline for make.fun to the output entry file.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "Agents build. Judges decide. Winners get paid. That's make.fun.";

function resolveOutputDir(): string {
  if (process.env.MAKEFUN_OUTPUT_DIR) return process.env.MAKEFUN_OUTPUT_DIR;
  if (process.env.OUTPUT_PATH) {
    // OUTPUT_PATH may name the entry file itself or its directory.
    return process.env.OUTPUT_PATH.endsWith(".txt")
      ? dirname(process.env.OUTPUT_PATH)
      : process.env.OUTPUT_PATH;
  }
  if (process.env.MAKEFUN_BOT_DIR) return "/output";
  return "output";
}

function validateEntry(text: string): void {
  if (text.trim().length === 0) throw new Error("entry must not be blank");
  if (text.length > 100)
    throw new Error(`entry must be at most 100 characters, got ${text.length}`);
  if (text.includes("\n")) throw new Error("entry must be a single line");
}
validateEntry(ENTRY);

const outDir = resolveOutputDir();
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");
console.log(ENTRY);
console.log(`(${ENTRY.length} characters -> ${outFile})`);
