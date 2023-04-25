import { transformSync } from "@swc/core";
import type {
  Options,
  Config
} from "@swc/core";
// @see: https://github.com/unjs/jiti/issues/132
import type { TransformOptions, TRANSFORM_RESULT } from "jiti/dist/types";

export default function transform(opts: TransformOptions): TRANSFORM_RESULT {
  const _defaultConfig: Config = {
    module: {
      type: 'commonjs',
      ignoreDynamic: true,
    },
    env: {
      targets: {
        node: process.versions.node
      }
    },
    jsc: {
      loose: true,
      externalHelpers: false,
      parser: {
        syntax: 'typescript',
        dynamicImport: true,
        tsx: opts.filename?.endsWith('.tsx') ?? false,
      },
      transform: {
        react: {
          runtime: "automatic"
        },
      },
    },
  }

  const _opts: Options = {
    filename: opts.filename,
    ..._defaultConfig,
  };

  try {
    return {
      code: transformSync(opts.source, _opts)?.code || "",
    };
  } catch (error: any) {
    return {
      error,
      code:
        "exports.__JITI_ERROR__ = " +
        JSON.stringify({
          filename: opts.filename,
          line: error.loc?.line || 0,
          column: error.loc?.column || 0,
          code: error.code
            ?.replace("BABEL_", "")
            .replace("PARSE_ERROR", "ParseError"),
          message: error.message?.replace("/: ", "").replace(/\(.+\)\s*$/, ""),
        }),
    };
  }
}
