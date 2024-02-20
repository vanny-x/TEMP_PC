/**
 *  Date    : 2020/11/25
 *  Author  : Paco
 *  Declare : Feed Based React And Redux
 */
import React from 'react';
import ReactDom from 'react-dom';
import invariant from 'invariant';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import FeedRedux from '@/components/feed-redux';

class Feed {
  constructor() {
    this._router = null;
    this._history = null;
    this._container = null;
    this._reduxContainer = null;
  }

  /**
   * 设置应用的路由组件
   * @param router
   * @returns {Feed}
   */
  useRouter(router) {
    invariant(
        typeof router === 'function',
        `[app.router] router should be function, but got ${typeof router}`
    );
    this._router = router;
    return this;
  }

  /**
   * 初始化router
   * @param options
   * @private
   */
  useHistory(options) {
    this._history = createBrowserHistory(options);
    return this;
  }

  /**
   * 设置redux
   * @param model 数据参数
   * @param options redux配置
   */
  useRedux = (model = [], options) => {
    if(!this._reduxContainer) {
      this._redux = new FeedRedux(model, {
        initReducer: {
          router: connectRouter(this._history)
        },
        middlewares: [routerMiddleware(this._history)]
      });
    }
    return this;
  };

  /**
   * 获取绑定的action
   * @param selectAction
   * @returns {*}
   */
  useActions(selectAction) {
    return this._redux.createBindActions(selectAction);
  }

  /**
   * 获取绑定的selector
   * @param selector
   * @returns {*}
   */
  useSelector(selector) {
    return this._redux.useSelector(selector);
  }

  /**
   * 检查初始化内容
   */
  checkInit() {
    invariant(
        this._redux && this._redux,
        `[app.checkInit]  models not found, You should setRedux first`
    );

    invariant(
        this._router && this._router,
        `[app.checkInit]  router not found, You should setRouter first`
    );

    invariant(
        this._container && this._container.nodeName,
        `[app.attatch] container ${this._container} not found`
    );
  }

  /**
   * 初始化项目
   * @param container
   * @returns {Feed}
   */
  attach(container) {
    this._container = container;

    // 检查
    this.checkInit();

    // 渲染界面
    ReactDom.render(React.createElement(this.renderNode()), container);
    return this;
  }

  /**
   * 动态添加redux
   * @param model
   */
  addModel(model) {
    this._redux.addModel(model);
  }

  /**
   * 初始化dom界面
   * @returns {function(): *}
   */
  renderNode = () => {
    const ReduxContainer = this._redux.getProvider();
    const history = this._history;
    const router = this._router;
    return function Main() {
      return (
          <ReduxContainer>
            <ConnectedRouter history={history}>
              <Route path="/" component={router} />
            </ConnectedRouter>
          </ReduxContainer>
      );
    };
  }
}

export default new Feed();

export {
  Feed
};