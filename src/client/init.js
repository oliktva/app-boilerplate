import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import routes from 'src/shared/routes';
import store from 'src/shared/store/store';
import { history } from 'src/shared/store/store-creator';

import App from 'src/client/app';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <BrowserRouter>
          { routes }
        </BrowserRouter>
      </App>
    </ConnectedRouter>
  </Provider>,
  target
);
