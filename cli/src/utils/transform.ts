import { transformSync } from "@swc/core";
import type {
  Options
} from "@swc/core";
import type {TransformOptions, TRANSFORM_RESULT} from "jiti/dist/types";

export default function transform(opts: TransformOptions): TRANSFORM_RESULT {
  const _opts: Options = {
    filename: "",
    cwd: "/",
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
