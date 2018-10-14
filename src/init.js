import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import routes from 'src/shared/routes';
import store from 'src/shared/store/store';
import { history } from 'src/shared/store/store-creator';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  </Provider>,
  target
);
