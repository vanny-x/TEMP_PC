/**
 *  Date    : 2018/3/9
 *  Author  : DCG, PRO_FE, PACO
 *  Declare : formatWebpackMessages
 *
 */

'use strict';

// WARNING: this code is untranspiled and is used in browser too.
// Please make sure any changes are in ES5 or contribute a Babel compile step.

const friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatWebpackMessages(json) {
  const formattedErrors = json.errors.map(function(message) {
    let msg = [message.message,message.moduleName +''+message.loc, message.moduleIdentifier, ]
    return msg.join('\n');
  });
  let formattedWarnings = json.warnings.map(function(message) {
    let msg = [message.message,message.moduleName +''+message.loc, message.moduleIdentifier, ]
    return msg.join('\n');
  });
  let result = {
    errors: formattedErrors,
    warnings: formattedWarnings,
  };
  if (result.errors.some(isLikelyASyntaxError)) {
    // If there are any syntax errors, show just them.
    // This prevents a confusing ESLint parsing error
    // preceding a much more useful Babel syntax error.
    result.errors = result.errors.filter(isLikelyASyntaxError);
  }
  return result;
}

export default formatWebpackMessages;
