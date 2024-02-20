
export default {
  before: function before(action, next) {
    const { type, loading } = action;
    loading &&
      next({
        type: 'loading/start',
        data: type
      });
  },
  after: function after(action, next) {
    const { type, loading } = action;
    loading &&
      next({
        type: 'loading/end',
        data: type
      });
  }
};