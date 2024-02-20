/*
 * @Author: Paco
 * @Date: 2018-11-26 21:44:18
 * @LastEditTIme: Paco
 * @Description:
 */

import createStore from './createStore';
import prefixNamespace from './prefixNameSpace';
import getReducer from './getReducer';
import { combineReducers } from 'redux';
import invariant from 'invariant';

export function create({ initReducers, getMiddleWares }) {
  const app = {
    _models: [],
    _store: null,
    model,
    start,
    _actions: {},
    _getActions: () => {
      return app._actions;
    }
  };

  /**
   *  Start the app.
   *
   * TODO: For Better HMR
   */
  function start() {
    const reducers = { ...initReducers };
    const actions = {};

    //explain the reducers
    for(const m of app._models) {
      reducers[m.namespace] = getReducer(m.state, m.reducers);
    }

    //create store
    //TODO: inside or outside middleWares
    const store = (app._store = createStore({
      reducers: createReducer(),
      getMiddleWares
    }));

    //Extend Store For Dynamic Reducer
    store.asyncReducers = {};

    //Extend Store for Dynamic Actions
    app.asyncActions = {};

    //Cache the actions For Global Context
    for(const m of app._models) {
      if(m.actions) {
        actions[`${m.namespace}Actions`] = m.actions;
      }
    }

    //set global actions
    app._actions = actions;

    // Setup app.model and app.unmodel
    app.model = injectModel.bind(app, createReducer);

    /**
     * Create global reducer for redux.
     */
    function createReducer() {
      return combineReducers({
        ...reducers,
        ...(app._store ? app._store.asyncReducers : {})
      });
    }

  }

  /**
   * Register model before app is started.
   * @param {models} models
   */
  function model(models) {
    invariant(
      models instanceof Array,
      `[app.model] model ${models} should be in array`
    );

    const prefixedModel = models.map(item => {
      return prefixNamespace({ ...item });
    });

    app._models.push(...prefixedModel);
    return prefixedModel;
  }

  /**
   * Inject model after app is started.
   */
  function injectModel(createReducer, m) {
    m = model(m);

    const store = app._store;

    m.forEach(item => {
      store.asyncReducers[item.namespace] = getReducer(
        item.state,
        item.reducers
      );
    });

    m.forEach(item => {
      app._actions[`${item.namespace}Actions`] = item.actions;
    });

    store.replaceReducer(createReducer());
    app._replaceActions && app._replaceActions();
    return app;
  }

  //TODO For HMR And Dynamic Load Models
  // function replaceModel(createReducer, reducers, m) {}

  return app;
}
