import { createStore, applyMiddleware, compose } from 'redux';

export default ({
  reducers, //reducers
  initState = window.__initState__ || {}, //initState
  getMiddleWares //middleWares
}) => {
  let composeEnhancers = compose;
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable no-underscore-dangle */
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */
  }

  return createStore(
    reducers,
    initState,
    composeEnhancers(applyMiddleware(...getMiddleWares()))
  );
};
