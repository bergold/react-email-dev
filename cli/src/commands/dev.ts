// import { downloadClient, REACT_EMAIL_ROOT } from '../utils';
// import fs from 'fs';
// import shell from 'shelljs';
// import { setupServer } from '../utils/run-server';

import { createServer } from "../server/server";

interface Opts {
  dir: string;
  publicDir: string;
  port: string;
}

export const dev = async ({ dir, publicDir, port }: Opts) => {
  console.log("dev", dir, publicDir, port);
  console.log("")

  createServer({
    port: Number(port),
    public: publicDir,
    emailsDir: dir,
  });
  // try {
  //   if (!fs.existsSync(dir)) {
  //     throw new Error(`Missing ${dir} folder`);
  //   }

  //   if (fs.existsSync(REACT_EMAIL_ROOT)) {
  //     await setupServer('dev', dir, port);
  //     return;
  //   }

  //   await downloadClient();

  //   await setupServer('dev', dir, port);
  // } catch (error) {
  //   console.log(error);
  //   shell.exit(1);
  // }
};
