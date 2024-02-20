"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them.
process.on("unhandledRejection", err => {
	throw err;
});

import chalk from "chalk";
import webpack from "webpack";
import WebPackDevServer from "webpack-dev-server";
const config = require('./config/webpack.config.dev').default;

// @ts-ignore
import packageJson from "../package.json";

const compiler = webpack(config);

// @ts-ignore
const devServer = new WebPackDevServer(compiler, config.devServer);

// @ts-ignore
const devServerConfig = config.devServer;

console.log()
console.log(chalk.green(`feed-scripts version: ${packageJson.version}`));
// @ts-ignore
console.log(chalk.green(`webpack version: ${webpack.version}`));
console.log();

devServer.listen(devServerConfig.port, devServerConfig.host, err => {
	if (err) {
		return console.log(err);
	}
	console.log(chalk.cyan("Starting the development server...\n"));
	console.log(`Listening at http://${devServerConfig.host}:${devServerConfig.port}/`);
});
