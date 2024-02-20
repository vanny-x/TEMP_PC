import combinePath from './combinePath';

const configuration = {
  //错误处理的组件
  ErrorBoundary: undefined,
  combinePath: combinePath
};

export default configuration;

export const setConfig = (config) => Object.assign(configuration, config);