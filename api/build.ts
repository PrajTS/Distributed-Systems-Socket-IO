/**
 * Remove old files, copy front-end ones.
 */

import childProcess from "child_process";
import commandLineArgs from "command-line-args";
import fs from "fs-extra";
import Logger from "jet-logger";

// Setup logger
const logger = new Logger();
logger.timestamp = false;

(async () => {
  try {
    const options = commandLineArgs([
      {
        name: "env",
        alias: "e",
        defaultValue: "local",
        type: String,
      },
    ]);
    // Remove current build
    await remove("./dist/");
    // Copy production env file
    if (options.env !== "production") {
      await copy(
        `./src/pre-start/env/${options.env}.env`,
        `./dist/pre-start/env/${options.env}.env`
      );
    }
    // Copy back-end files
    await exec("tsc --build tsconfig.prod.json", "./");
  } catch (err) {
    logger.err(err);
  }
})();

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        logger.info(stdout);
      }
      if (!!stderr) {
        logger.warn(stderr);
      }
      return !!err ? rej(err) : res();
    });
  });
}