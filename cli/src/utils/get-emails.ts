import { resolve } from "node:path";
import { glob } from "glob";

export async function getEmails(dir: string) {
  const ignored = ["node_modules", ".git", ".sl", ".svn", ".hg"];

  const files = await glob("**/*.@(js|jsx|ts|tsx)", {
    cwd: resolve(process.cwd(), dir),
    nodir: true,
    withFileTypes: true,
    ignore: ignored.map((i) => `**/${i}/**`),
  });

  return files.map(f => ({
    slug: f.relative().toLowerCase().normalize("NFKD").replace(/\.(js|jsx|ts|tsx)$/, ""),
    fullPath: f.fullpath(),
    relativePath: f.relative(),
  }));
}
