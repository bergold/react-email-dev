import { readFile } from "node:fs/promises";
import _jiti from "jiti";
import { render } from "@react-email/render";
import { createElement } from "react";
import transform from "./transform";

const jiti = _jiti(__filename, { transform });

export async function compileEmail(file: {
  slug: string;
  fullPath: string;
  relativePath: string;
}) {
  process.stdout.write(`Compiling ${file.relativePath}...`);
  const now = Date.now();

  const Email = jiti(file.fullPath).default;

  const markup = render(createElement(Email, {}), { pretty: true });
  const plainText = render(createElement(Email, {}), { plainText: true });
  const reactMarkup = await readFile(file.fullPath, { encoding: "utf-8" });

  process.stdout.write(`done in ${Date.now() - now}ms\n`);
  return { markup, plainText, reactMarkup };
}
