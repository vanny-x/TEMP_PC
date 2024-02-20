/**
 *  Date    : 2018/3/9
 *  Author  : DCG, PRO_FE, PACO
 *  Declare : build.js
 *
 */

"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

process.on("unhandledRejection", err => {
	throw err;
});

import webpack from "webpack";
import chalk from "chalk";
import fs from "fs-extra";

import formatMessage from './utils/formatMessage';
const config = require("./config/webpack.config.prod").default;

// @ts-ignore
import packageJson from "../package.json";

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(config.output.path);

console.log(chalk.green(`feed-scripts version: ${packageJson.version}`));
console.log(chalk.green(`webpack version: ${webpack.version}`));
console.log();

console.log("Creating an optimized production build...");
let compiler = webpack(config);

compiler.run(handler);

function handler(err, stats) {
	if (err || stats.hasErrors()) {
		fs.emptyDirSync(config.output.path);
		formatMessage(err, stats);
	} else {
		console.log(
			`Complied Successfully in ${chalk.green(
				stats.endTime - stats.startTime
			)}ms`
		);
		console.log(`The build dir at ${chalk.green(`/${config.output.path}`)}`);
	}
}

