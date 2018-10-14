import React, { Component, Fragment } from 'react';

import Header from 'src/client/blocks/header';
import Main from 'src/client/blocks/main';

export default class IndexBox extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Main heading="Index" />
      </Fragment>
    );
  }
}
