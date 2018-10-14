import React from 'react';
import {
  Route, BrowserRouter
} from 'react-router-dom';

import App from 'src/app';

import IndexPage from 'src/client/pages/index-page';
import AboutPage from 'src/client/pages/about-page';

export default (
  <BrowserRouter>
    <App>
      <Route exact path="/" component={IndexPage} />
      <Route path="/about" component={AboutPage} />
    </App>
  </BrowserRouter>
);
