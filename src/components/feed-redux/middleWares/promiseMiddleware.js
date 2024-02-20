/*
 * @Author: Paco
 * @Date: 2018-11-28 16:38:52
 * @LastEditTIme: Paco
 * @Description:
 */

export default (...plugins) => ({ dispatch }) => next => action => {
  const { promise, data, success, error, type, model, ...rest } = action;

  if(promise) {
    //for plugins before promise
    if(plugins.length > 0) {
      plugins.forEach(plugin => {
        plugin.before(action, next);
      });
    }

    return promise
      .then((json = {}) => {
        if(model && typeof model === 'function') {
          json = model(json);
        }
        if(type) {
          //define data to dispatch
          let dispatchData;

          if(data) {
            if(typeof data === 'function') {
              dispatchData = data(json);
            } else {
              dispatchData = data;
            }
          } else {
            dispatchData = json;
          }

          //dispatch
          next({
            type,
            data: dispatchData,
            ...rest
          });
        }

        if(typeof success === 'function') {
          success(json, dispatch);
        }

        //success for plugins after promise
        if(plugins.length > 0) {
          plugins.forEach(plugin => {
            plugin.after(action, next, true);
          });
        }

        //return data for promise chain
        return json;
      })
      .catch(err => {
        //fail for plugins after promise
        if(plugins.length > 0) {
          plugins.forEach(plugin => {
            plugin.after(action, next, false);
          });
        }

        if(typeof error === 'function') {
          error(err, dispatch);
        } else {
          return Promise.reject(err);
        }
      });
  } else {
    return next(action);
  }
};
