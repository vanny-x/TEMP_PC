#!/usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
const child_process = require("cross-spawn");

process.on('unhandledRejection', err => {
  throw err;
});

const args = process.argv.slice(2);

const scriptIndex = args.findIndex( x => x === 'start' || x === 'build' || x ===  'init');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

switch(script) {
  case 'init':
  case 'start':
  case 'build': {
    const result = child_process.spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve('../lib/' + script))
        .concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit'}
    );

    if(result.signal) {
      if(['SIGKILL', 'SIGTERM'].indexOf(result.signal > -1)) {
        console.log('Build Failed')
      }
      process.exit(1);
    }
    process.exit(result.status);
    break;
  }
  default:
    console.log('Unkonwn script "' + script + '".');
    break;
}
