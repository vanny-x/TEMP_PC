import React, { Component } from 'react';

import Context from './Context';

class ActionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: props.app._getActions()
    };

    props.app._replaceActions = () => {
      this.setState({
        action: props.app._getActions()
      });
    };
  }

  render() {
    return (
      <Context.Provider value={this.state.action}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ActionProvider;
