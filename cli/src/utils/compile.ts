import { readFile } from "node:fs/promises";
import _jiti from "jiti";
import { render } from "@react-email/render";
import { createElement } from "react";
import transform from "./transform";

const jiti = _jiti(__filename, {
  extensions: [".js", ".mjs", ".cjs", ".jsx", ".ts", ".mts", ".cts", ".tsx", ".json"], // @see: https://github.com/unjs/jiti/issues/138
  cache: false, // TODO: enable cache, but store in local folder
  transform
});

export async function compileEmail(file: {
  slug: string;
  fullPath: string;
  relativePath: string;
}) {
  process.stdout.write(`Compiling ${file.relativePath}...`);
  const now = Date.now();

  try {

    const Email = jiti(file.fullPath);

    if (Email.__JITI_ERROR__) {
      throw Email.__JITI_ERROR__;
    }

    if (!Email.default) {
      throw new Error(`No default export found in ${file.relativePath}`);
    }

    const markup = render(createElement(Email.default, {}), { pretty: true });
    const plainText = render(createElement(Email.default, {}), { plainText: true });
    const reactMarkup = await readFile(file.fullPath, { encoding: "utf-8" });

    process.stdout.write(`done in ${Date.now() - now}ms\n`);
    return { markup, plainText, reactMarkup };
  } catch (error) {
    process.stdout.write(`errored after ${Date.now() - now}ms\n`);
    throw error;
  }
}
