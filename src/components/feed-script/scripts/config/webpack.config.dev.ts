import {DefinePlugin, HotModuleReplacementPlugin} from "webpack";

import config from './webpack.config.base';
import configAnalysis from "./configAnalysis";

// 新增入口
config
    .devtool('eval-source-map')
    .mode('development')


config.plugin('define')
    .use(DefinePlugin, [{
        "process.env": {
            NODE_ENV: JSON.stringify("development")
        }
    }])

// 添加热更新配置
config.plugin('hot')
    .use(HotModuleReplacementPlugin)


// 添加服务器配置
config.devServer
    .host('0.0.0.0')
    .compress(true)
    .historyApiFallback(true)
    .hot(true)
    .useLocalIp(true)
    .disableHostCheck(true)
    // .quiet(true)
    .inline(true)
    .open(true)
    .overlay(true)
    .end()

// 配置解析
configAnalysis(config);

export default config.toConfig();
