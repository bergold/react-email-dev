import { Router } from "express"
import { getEmails } from "../utils/get-emails";
import { compileEmail } from "../utils/compile";

export function apiRouter(emailsDir: string) {
  const api = Router();

  // api.get("/events", (_, res) => {
  //   res.setHeader('Cache-Control', 'no-cache');
  //   res.setHeader('Content-Type', 'text/event-stream');
  //   res.setHeader('Connection', 'keep-alive');
  //   res.flushHeaders();

  //   let counter = 1;
  //   let interval = setInterval(() => {
  //     counter++;
  //     if (counter >= 10) {
  //         clearInterval(interval);
  //         res.end(); // terminates SSE session
  //         return;
  //     }
  //     res.write(`data: ${JSON.stringify({num: counter})}\n\n`);
  //   }, 1000);

  //   res.on('close', () => {
  //     console.log('client dropped me');
  //     clearInterval(interval);
  //     res.end();
  //   });
  // });

  api.get("/emails", async (_, res) => {
    const files = await getEmails(emailsDir);
    res.json({ emails: files.map((f) => f.slug) });
  });

  // api.get("/email/:slug.txt", (req, res) => {
  //   res.send(`# Hi (${req.params.slug})`);
  // });

  // api.get("/email/:slug.jsx", (req, res) => {
  //   res.send(`<Hi slug="${req.params.slug}" />`);
  // });

  api.get("/email/:slug.html", async (req, res) => {
    const files = await getEmails(emailsDir);
    const file = files.find((f) => f.slug === req.params.slug);
    if (!file) {
      res.status(404).send("Not found");
      return;
    }

    const data = await compileEmail(file);

    res.setHeader("Content-Type", "text/html");
    res.send(data.markup);
  });

  api.get("/email/:slug", async (req, res) => {
    const files = await getEmails(emailsDir);
    const file = files.find((f) => f.slug === req.params.slug);
    if (!file) {
      res.status(404).send("Not found");
      return;
    }

    try {
      const data = await compileEmail(file);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  });

  return api;
}
