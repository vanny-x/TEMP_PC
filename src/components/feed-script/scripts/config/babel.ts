import paths from './paths';
const feedConfig = require(paths.appConfig);

const babelLoaderOptions = {
    presets: [
        require.resolve('@babel/preset-typescript'),
        require.resolve('@babel/preset-react'),
        [
            require.resolve('@babel/preset-env'),
            {
                useBuiltIns: "usage",
                corejs: '3'
            }
        ]
    ],
    plugins: [
        require.resolve("@babel/plugin-syntax-dynamic-import"),
        require.resolve("@babel/plugin-proposal-function-bind"),
        require.resolve("@babel/plugin-proposal-export-default-from"),
        [require.resolve("@babel/plugin-proposal-decorators"), {legacy: true}],
        [require.resolve("@babel/plugin-transform-runtime"), {corejs: {
                version: 3
            }}],
        require.resolve("@babel/plugin-proposal-class-properties"),
        require.resolve("@babel/plugin-proposal-optional-chaining")
    ]
};

/**
 * 配置babel参数
 * @param importList
 */
export function addBabelImportPlugin(importList) {
   if(importList instanceof Array) {
      importList.forEach(v => {
          babelLoaderOptions.plugins.push([require.resolve("babel-plugin-import"), v, v.libraryName])
      })
   }
   return babelLoaderOptions;
}

/**
 * 配置babel
 */
export function configBabel() {
  const {babel = {} } = feedConfig;
  return addBabelImportPlugin(babel.dynamicImport || []);
}

export default babelLoaderOptions;
