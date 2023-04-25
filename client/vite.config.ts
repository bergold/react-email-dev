import * as fs from "node:fs/promises"
import { ViteDevServer, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
})

function mockApiPlugin() {
  return {
    name: 'mock-api-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api", async (req, res) => {
        if (req.url == "/emails") {
          const data = await fs.readFile("./mock-data/emails.json", "utf-8");
          res.statusCode = 200;
          res.end(data);
          return;
        }

        if (req.url == "/email/notion-magic-link") {
          const data = await fs.readFile(
            "./mock-data/notion-magic-link.json",
            "utf-8"
          );
          res.statusCode = 200;
          res.end(data);
          return;
        }

        res.statusCode = 404;
        res.end('NOT FOUND');
      })
    },
  }
}
