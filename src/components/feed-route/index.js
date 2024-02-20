/*
 * @Author: Paco
 * @Date: 2018-11-23 17:15:54
 * @LastEditTIme: Paco
 * @Description:
 */
import React from 'react';
import { Route } from 'react-router-dom';
import * as queryString from '@/components/query-string';
import RouterControl from './RouteControl';
import configuration, { setConfig } from './configuration';

/**
 * 默认的Home组件
 *
 * @param children
 * @returns {*|null}
 */
function getDefaultComponent() {
  return function ({ children }) {
    return children || null;
  };
}

/**
 * 将search解析成query，赋值于query上，保持query指向同一份内存，避免触发不必要的渲染
 * @param query：search解析结果缓存
 * @param search：本次render的查询参数
 * @param prevSearch：上一次render的查询参数
 */
function parseQuery(query, search, prevSearch) {
  // search没有发生变化，直接返回上一次的解析结果
  if(search === prevSearch) {
    return query;
  }

  // 剔除query中原有的参数
  Object.keys(query).forEach(key => {
    if(query.hasOwnProperty(key)) {
      delete query[key];
    }
  });

  // 将新的search值进行解析并赋值在query上
  Object.assign(query, queryString.parse(search));
  return query;
}

export default function createR({
  getComponent = getDefaultComponent,
  childRoutes = [],
  getChildRoutes = () => [],
  onEnter
}) {
  const Component = getComponent();
  const dynamicRoutes = getChildRoutes();
  let children = [].concat(childRoutes);
  const { ErrorBoundary, combinePath } = configuration;

  if (dynamicRoutes instanceof Array && dynamicRoutes.length) {
    children = children.concat(dynamicRoutes);
  }

  let query = {};         // search解析结果缓存
  let prevSearch = '';    // 上一次render的查询参数

  return function RouterBase(props) {
    const { match, location } = props;
    const renderComponent = (
      <Component
        {...props}
        query={parseQuery(query, location.search, prevSearch)}
      >
        {!match.isExact &&
          children.map((childRoute, index) => {
            return (
              <Route
                path={combinePath(match.path, childRoute.path)}
                component={typeof childRoute.component === 'function' ? childRoute.component : createR(childRoute.component)}
                key={index}
              />
            );
          })}
      </Component>
    );

    // update prev search
    prevSearch = location.search;

    const renderRouter = typeof onEnter === 'function' ? (
      <RouterControl {...props} onEnter={onEnter}>
        {renderComponent}
      </RouterControl>
    ) : renderComponent;

    return ErrorBoundary ? (
      <ErrorBoundary>
        {renderRouter}
      </ErrorBoundary>
    ) : renderRouter;
  };
};

const createRouter = a => a;
export {
  setConfig,
  createRouter
};
