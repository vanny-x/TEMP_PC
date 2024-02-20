/*
 * @Author: Paco
 * @Date: 2018-11-26 16:21:35
 * @LastEditTIme: Paco
 * @Description:  Feed Index
 */

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import invariant from "invariant";
import * as history from 'history';
import * as thunk from "redux-thunk";
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

import * as core from "./core";
import ActionProvider from "./action/ActionProvider";
import promiseMiddleWare from "./middleWares/promiseMiddleware";
import loadingPlugin from './middleWares/loadingPlugin';

import connect from "./action/connect";

const { createBrowserHistory } = history;

export { connect };

export default (opts = {}) => {
  const { history: historyOptions = {}} = opts;
  const history = createBrowserHistory(historyOptions);

  const createOptions = {
    initReducers: {
      router: connectRouter(history)
    },
    getMiddleWares() {
      return [routerMiddleware(history), thunk, promiseMiddleWare(loadingPlugin)];
    }
  };

  const app = core.create(createOptions);

  const oldAppStart = app.start;

  app.history = history;
  app.router = router;
  app.start = start;
  app.attach = attach;

  function router(router) {
    invariant(
      typeof router === "function",
      `[app.router] router should be function, but got ${typeof router}`
    );
    app._router = router;
    return app;
  }

  function start() {
    invariant(
      app._router,
      `[app.start] router must be registered before app.start()`
    );

    if (!app._store) {
      oldAppStart.call(app);
    }
    return app;
  }

  function attach(container) {
    invariant(
      container && container.nodeName,
      `[app.start] container ${container} not found`
    );
    ReactDom.render(React.createElement(getProvider(app, history)), container);
    return app;
  }

  return app;
};

function getProvider(app, history) {
  return function Main() {
    return (
      <Provider store={app._store}>
        <ActionProvider app={app}>
          <ConnectedRouter history={history}>
            <Route path="/" component={app._router} />
          </ConnectedRouter>
        </ActionProvider>
      </Provider>
    );
  };
}
