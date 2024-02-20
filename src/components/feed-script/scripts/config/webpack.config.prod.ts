import {DefinePlugin} from "webpack";
import  TerserPlugin from 'terser-webpack-plugin'
import  CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import  MiniCssExtractPlugin from 'mini-css-extract-plugin'

import config from './webpack.config.base';
import configAnalysis, {feedConfig} from "./configAnalysis";

// 生产环境配置环境和sourceMap
config
    .devtool('source-map')
    .mode('production');

// TODO 公共CSS提取
// 添加MiniCss提取
// config.module
//     .rule("scss")
//     .test(/\.scss$/)
//     .use('extra')
//     .loader(MiniCssExtractPlugin.loader)
//     .after('css')
//     .end()
//     .use('style')
//     .clear();

// 添加MiniCss提取
// config.module
//     .rule("less")
//     .use('extra')
//     .loader(MiniCssExtractPlugin.loader)
//     .before('css')
    // .end()
    // .rule('style')
    // .clear();


// 添加生产优化
config.optimization
    .minimize(true)
    .minimizer('terser')
    .use(TerserPlugin, [{
        test: /\.js(\?.*)?$/i,
        parallel: true,
        extractComments: true,  // 抽离注释文件
        terserOptions: {
          compress: {
            drop_console: !feedConfig.debug
          }
        }
    }])
    .end()
    .minimizer('css')
    .use(CssMinimizerPlugin, [{
        cache: true,
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        }
    }])
    .end()
    .runtimeChunk({
        name: "webpack-runtime"
    })
    .splitChunks({
      chunks: 'async',
      minSize: 30000,
      maxSize: 800000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    })

// 添加生产插件
config
    .plugin('define')
    .use(DefinePlugin, [{
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }])  //添加环境变量插件
    .end()
    .plugin('mini-css')
    .use(MiniCssExtractPlugin, [{
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css"
    }])
    .end()   // 添加MiniCss插件
    .plugin('html-webpack')
    .tap((args) => {
        return [Object.assign(args[0], {
            env: 'production',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })]
    })

// 允许外部修改
configAnalysis(config);

export default config.toConfig();
