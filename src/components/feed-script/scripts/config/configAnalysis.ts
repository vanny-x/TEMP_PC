
import paths from './paths';
import Config from 'webpack-chain';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const feedConfig = require(paths.appConfig);

export {
    feedConfig
}

export default function configAnalysis(config: Config) {

    const {output, devServer, html, webpackChain, themePath, analysis } = feedConfig;

    if(devServer && config.get('mode') === 'development') {
        if(devServer.host) {
            config.devServer
                .host(devServer.host)
        }
        if(devServer.port) {
            config.devServer
                .port(devServer.port)
        }
        if(devServer.proxy) {
            config.devServer
                .proxy(devServer.proxy);
        }
    }

    if(output) {
        if(output.path) {
            config.output.path(paths.resolveApp(output.path))
        }
        if(output.publicPath) {
            config.output.publicPath(output.publicPath)
        }
    }

    if(html) {
        config.plugin('html-webpack')
            .tap((args) => {
                return [Object.assign(args[0], html)]
            })
    }

    if (themePath) {
        config.module
            .rule('sass')
            .use('sass-resource')
            .loader('sass-resources-loader')
            .after('sass')
            .options({
                resources: themePath
            })
    }

    if(webpackChain) {
        if(typeof webpackChain === 'function') {
            webpackChain(config);
        }
    }

    if(analysis) {
        config.plugin('analysis')
            .use(BundleAnalyzerPlugin);
    }
}
