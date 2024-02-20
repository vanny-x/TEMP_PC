/**
 *  Date    : 2018/3/9
 *  Author  : DCG, PRO_FE, PACO
 *  Declare : formatMessage.js
 *
 */

'use strict';
import chalk from 'chalk';
import formatWebpackMessages from './formatWebpackMessages';

export default (err, stats) => {
  let messages;
  if (err) {
    if (!err.message) {
      console.log(err);
      return;
    }

    let errMessage = err.message;

    // Add additional information for postcss errors
    if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
      errMessage +=
          '\nCompileError: Begins at CSS selector ' +
          err['postcssNode'].selector;
    }

    messages = formatWebpackMessages({
      errors: [errMessage],
      warnings: [],
    });
  } else {
    messages = formatWebpackMessages(
        stats.toJson({ all: false, warnings: true, errors: true })
    );
  }

  // If errors exist, only show errors.
  if (messages.errors.length) {
    // Only keep the first error. Others are often indicative
    // of the same problem, but confuse the reader with noise.
    console.log(chalk.red('Compiled with errors.\n'));
    if (messages.errors.length > 1) {
      messages.errors.length = 1;
    }
    console.log(messages.errors.join('\n\n'));
  }

  // Show warnings if no errors were found.
  if (messages.warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(messages.warnings.join('\n\n'));

    // Teach some ESLint tricks.
    console.log(
      '\nSearch for the ' +
      chalk.underline(chalk.yellow('keywords')) +
      ' to learn more about each warning.'
    );
    console.log(
      'To ignore, add ' +
      chalk.cyan('// eslint-disable-next-line') +
      ' to the line before.\n'
    );
  }
}
