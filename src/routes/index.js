import { createRouter } from '@/components/feed-route';

import App from './App';

export default createRouter({
  getComponent: () => App,
  onEnter: async (nextState, history, cb) => {
    cb();
  },
  getChildRoutes: () => [
    // {
    //   path: '/home',  // 首页
    //   component: require('./Home')
    // }
  ]
});
