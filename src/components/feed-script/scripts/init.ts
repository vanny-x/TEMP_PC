/**
 *  Date    : 2018/3/1
 *  Author  : PACO
 *  Declare : init
 *
 *  init project
 */

"use strict";
const chalk = require("chalk");
const fs = require("fs-extra");
const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const ora = require("ora");
const rm = require("rimraf").sync;
const path = require('path');

// Makes the script crash on unhandled rejections instead of silently
process.on("unhandledRejection", err => {
  throw err;
});

process.on("exit", () => {
  console.log("Exit ...");
});

/**
 * Usage.
 */

program
  .usage("<template-name> [project-name]")
  .option("--tem <template>");

/**
 * Help.
 */
console.log();
program.on("--help", () => {
  console.log("  Examples:");
  console.log();
  console.log(
    chalk.gray("    # create a new project with an official template")
  );
  console.log("    $ vue init webpack my-project");
  console.log();
  console.log(
    chalk.gray("    # create a new project straight from a github template")
  );
  console.log();
});

/**
 * Help.
 */

function help() {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();

let template = program.args[0];
const root = path.resolve(name);
const appName = path.basename(root);

if (fs.existsSync(appName)) {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Target directory exists. Continue?",
        name: "ok"
      }
    ])
    .then(answers => {
      if (answers.ok) {
        run();
      }
    })
    .catch(console.log);
} else {
  run();
}

function run() {
  const OFFICIAL_TEMPLATE = "template_pc";
  downloadAndGenerate(getRepo(template || OFFICIAL_TEMPLATE))
}

/**
 * Get a official repo address
 * @param repo
 * @returns {string}
 */

function getRepo(repo) {
  return `ssh://git@gitlab-heals.chubanyun.me:12122/feed-templates/${repo}.git`;
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate(tmp) {
  const spinner = ora("downloading template");
  spinner.start();
  // Remove if local template exists
  if (fs.existsSync(tmp)) {
    rm(tmp);
  }
  download(template, tmp, { clone: true }, err => {
    spinner.stop();
    if (err)
      console.error(
        "Failed to download repo " + template + ": " + err.message.trim()
      );
  });

};
