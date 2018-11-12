import React from 'react';
import {
  Switch, Route
} from 'react-router-dom';

import IndexPage from 'src/client/pages/index-page';
import AboutPage from 'src/client/pages/about-page';

export default (
  <Switch>
    <Route exact path="/" component={IndexPage} />
    <Route path="/about" component={AboutPage} />
  </Switch>
);
