
// @ts-ignore
import Config from 'webpack-chain';
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import  MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { configBabel } from './babel';
import postcssLoaderOptions from './postcss';
import paths from './paths';
const appConfig = require(paths.appConfig);

const themeVariables = appConfig.theme ? require(appConfig.theme) : {};

const config = new Config();

config.target('web');

config
    .entry('app')
    .add(paths.appIndexJs);

config.output
    .path(paths.appDist)
    .filename('[name]-[contenthash:8].js')
    .chunkFilename('[name]-[contenthash:8].chunk.js')
    .publicPath('/')

config.module
    .rule('less')
    .test(/\.less$/)
    .when(process.env.NODE_ENV === 'production', function (rule) {
        rule.use('extra')
            .loader(MiniCssExtractPlugin.loader)
    })
    .when(process.env.NODE_ENV !== 'production', function (rule) {
        rule.use('style')
            .loader('style-loader')
    })
    .use('css')
    .loader('css-loader')
    .end()
    .use('less')
    .loader('less-loader')
    .options({
        lessOptions: {
            modifyVars: themeVariables,
            javascriptEnabled: true
        }
    })

config.module
    .rule('scss')
    .test(/\.scss$/)
    .when(process.env.NODE_ENV === 'production', function (rule) {
        rule.use('extra')
            .loader(MiniCssExtractPlugin.loader)
    })
    .when(process.env.NODE_ENV !== 'production', function (rule) {
        rule.use('style')
            .loader('style-loader')
    })
    .use('css')
    .loader('css-loader')
    .end()
    .use('post-css')
    .loader('postcss-loader')
    .options(postcssLoaderOptions)
    .end()
    .use('sass')
    .loader('sass-loader')
    .options({
        implementation: require('sass')
    })

config.module
    .rule('css')
    .test(/\.css$/)
    .when(process.env.NODE_ENV === 'production', function (rule) {
        rule.use('extra')
            .loader(MiniCssExtractPlugin.loader)
    })
    .when(process.env.NODE_ENV !== 'production', function (rule) {
        rule.use('style')
            .loader('style-loader')
    })
    .use('css')
    .loader('css-loader')
    .end()

config.module
    .rule('js')
    .test(/\.(js|jsx|ts|tsx)$/)
    .exclude
    .add(paths.appNodeModules)
    .end()
    .include
    .add(paths.appSrc)
    .end()
    .use('babel')
    .loader('babel-loader')
    .options(configBabel())

config.module
    .rule('image')
    .test( /\.(jpe?g|png|gif)$/i)
    .use('file')
    .loader('file-loader')
    .options( {
        name: "assets/images/[name].[hash:8].[ext]"
    })

config.module
    .rule('file')
    .test('/\\.(ttf|eot|svg|woff|woff2)(\\?.*)?$/')
    .use('file')
    .loader('file-loader')
    .options({
        name: "assets/fonts/[name].[ext]"
    })


config.plugin('clean')
    .use(CleanWebpackPlugin)

config.plugin('html-webpack')
    .use(HtmlWebpackPlugin, [{
        filename: "index.html",
        title: appConfig.title || appConfig.name || '',
        template: paths.appHtml,
        favicon: paths.appIco
    }])


config.resolve
    .modules
    .add('node_modules')
    .add(paths.appNodeModules)
    .end()
    .extensions
    .add('.js')
    .add('.ts')
    .add('.tsx')
    .add('.json')
    .end()
    .alias
    .set('@', paths.appSrc)



export default config;
