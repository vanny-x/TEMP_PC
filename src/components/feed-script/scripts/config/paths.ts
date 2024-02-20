/**
 *  Date    : 2019/2/18
 *  Author  : PACO
 *  Declare : paths
 *
 *  main paths for project
 *
 */

'use strict';

import * as path from 'path';
import * as fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export default {
  //Index html for html-webpack-plugin
  appHtml: resolveApp('src/index.template.html'),
  //appIco
  appIco: resolveApp('src/favicon.ico'),
  //Package.json
  appPackageJson: resolveApp('package.json'),
  //Main entry
  appIndexJs: resolveApp('src/index'),
  //Main code
  appSrc: resolveApp('src'),
  //Yarn File
  yarnLockFile: resolveApp('yarn.lock'),
  //Node Modules
  appNodeModules: resolveApp('node_modules'),
  //App dist
  appDist: resolveApp('dist'),
  //App webpack config
  appConfig: resolveApp('feed.config.js'),

  resolveApp
};
