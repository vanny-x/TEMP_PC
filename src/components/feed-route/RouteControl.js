/*
 * @Author: Paco
 * @Date: 2018-11-23 17:39:29
 * @LastEditTIme: Paco
 * @Description:
 */

import React from "react";
import * as queryString from '@/components/query-string';

class RouterControl extends React.PureComponent {
  constructor(props) {
    super(props);
    const { onEnter } = this.props;
    this.delayEnter = typeof onEnter == "function" && onEnter.length === 3; //判断是否需要添加回掉进入界面
    this.state = {
      shouldEnter: !this.delayEnter
    };
  }

  showChildren = () => {
    this.setState({
      shouldEnter: true
    });
  };

  componentWillMount() {
    const { onEnter } = this.props;
    if (typeof onEnter == "function") {
      const { location, match, history } = this.props;
      const nextState = {
        location,
        match,
        query: queryString.parse(location.search)
      };
      onEnter(nextState, history, this.showChildren);
    }
  }

  componentWillUnmount() {
    this.delayEnter = null;
  }

  render() {
    const { children } = this.props;
    const { shouldEnter } = this.state;
    return shouldEnter && children;
  }
}

export default RouterControl;
