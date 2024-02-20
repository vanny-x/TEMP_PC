import paths from './paths';
const appConfig = require(paths.appConfig);

const postcssLoaderOptions = {
  postcssOptions: {
    plugins: [
      [
        require.resolve("postcss-preset-env"),
        {
          stage: 0
        },
      ],
    ],
  }
}

const  defaultConfig = {
  unitToConvert: 'px',
  viewportWidth: 750,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
}

if(appConfig.postcss && appConfig.postcss.px2vw) {
  postcssLoaderOptions.postcssOptions.plugins.push(require("postcss-px-to-viewport")(Object.assign(defaultConfig, appConfig.postcss.px2vw)));
}


export default postcssLoaderOptions;
