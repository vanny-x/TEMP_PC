/**
 *  Date    : 2019/11/9
 *  Author  : Weilin
 *  Declare : 对createRouter进行封装，集成 breadcrumb 和 indexRoute 等功能
 */
import React, { useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import createRouter from '@/components/feed-route';
import Utils from '@/utils/utils';

/**
 * location change hook
 * @param callback
 */
function useLocationChange(callback) {
  const location = useLocation();
  useEffect(() => {
    callback(location);
  }, [location]);

  return location;
}

function useQuery() {
  const location = useLocation();
  return Utils.params2json(location.search.slice(1));
}

/**
 * 创建主路由的PageHome
 * @param MainPage
 * @returns {function(): function(*): *}
 */
function createMainRouter(MainPage) {
  return () => (props) => {
    return props.children || (MainPage ? <MainPage /> : null);
  };
}

/**
 * 重定向到默认子路由
 * @param {ComponentProps} props
 * @param {string} path 路径
 * @param {function} callback
 */
function useDefaultChild(props, path, callback) {
  const history = useHistory();

  useEffect(() => {
    if(!props.children) {
      history.replace(path);
    }
    callback && callback();
  }, [window.location.pathname]);

}

export {
  useLocationChange,
  useLocation,
  useParams,
  useQuery,
  useHistory,
  createRouter,
  createMainRouter,
  useDefaultChild
};
