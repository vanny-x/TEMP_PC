/*
 * @Author: Paco
 * @Date: 2018-11-26 15:16:40
 * @LastEditTIme: Paco
 * @Description: getReducer
 */

export default (initialState, handlers) => {
  return (state, action = {}) => {
    if (state === undefined) {
      state = initialState;
    }
    const typeAyy = action.type ? action.type.split('/') : [];
    const type =
      typeAyy.length > 2 ? typeAyy.slice(0, 2).join('/') : action.type;
    const handler = type ? handlers[type] : undefined;
    if (!handler) {
      return state;
    }
    return handler(state, action);
  };
};
