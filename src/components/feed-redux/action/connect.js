/*
 * @Author: Paco
 * @Date: 2018-11-27 20:31:53
 * @LastEditTIme: Paco
 * @Description:
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Context from './Context';

function actionConnect(
  mapStateToProps, 
  mapDispatchToProps, 
  mergeProps,
  opts
) {
  //Component Cache
  let Component = null;

  //mapDispatch proxy
  const mapDispatch = function(actions, dispatch) {
    const wrappedActions = {};
    for (let action in actions) {
      wrappedActions[action] = bindActionCreators(
        actions[action],
        dispatch
      );
    }
    return wrappedActions;
  };

  return component => props => (
    <Context.Consumer>
      {value => {
        let actions = null;
        if (typeof mapDispatchToProps === 'function') {
          actions = mapDispatchToProps(value);
        }
        !Component && (Component = connect(
          mapStateToProps,
          actions ? dispatch => mapDispatch(actions, dispatch) : null,
          mergeProps,
          opts
        )(component));
        return <Component {...props} />;
      }}
    </Context.Consumer>
  );
}

export default actionConnect;
