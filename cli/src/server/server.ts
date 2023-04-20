import path from "node:path"
import express from "express";
import { apiRouter } from "./api";

export interface ServerOptions {
  port?: number;
  /**
   * Public path (relative to current working directory)
   * @default "public"
   */
  public?: string
  emailsDir: string
}

export function createServer(opts: ServerOptions) {
  const { port = 3000 } = opts;

  const app = express();

  const publicDir = path.resolve(process.cwd(), opts.public ?? "public");
  const clientDir = path.resolve(__dirname, "../../dist/client");
  const indexFile = path.join(clientDir, "index.html");
  
  app.use(express.static(clientDir));
  app.use(express.static(publicDir));

  app.use("/api", apiRouter(opts.emailsDir));
  app.get('*', (_, res) => res.sendFile(indexFile));

  app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
  });
}
