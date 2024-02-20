import React, {useState} from 'react';
import * as Switch from 'react-router-dom';
import uuid from '@/utils/uuid';

import './App.scss';

export default class App extends React.PureComponent {

  componentDidMount() {
    const ismac = /macintosh|mac os x/i.test(navigator.userAgent);
    if(ismac) {
      document.body.setAttribute('ismac', '1');
    }
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  // render() {
  //   return (
  //     <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
  //       <Switch>
  //         {this.props.children}
  //       </Switch>
  //     </ConfigProvider>
  //   );
  // }
  
  render() {
    return (
      <div className='container'>
        this.props.children
      </div>
    );
  }

}

if(!window.shortid) {
  window.shortid = uuid;
}

