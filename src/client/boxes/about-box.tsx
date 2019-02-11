import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from 'src/client/blocks/header';
import Main from 'src/client/blocks/main';

class AboutBox extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Main heading="About" />
      </Fragment>
    );
  }
}

const connectWrapper = connect((state) => ({
  test: state
}));

export default connectWrapper(AboutBox);
