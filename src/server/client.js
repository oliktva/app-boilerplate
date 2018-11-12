import React from 'react';
import {hydrate} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import routes from 'src/shared/routes';
import reducers from 'src/shared/reducers/reducers';

import App from 'src/client/app';

const target = document.querySelector('#root');

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(combineReducers(reducers), preloadedState);

hydrate(
  <Provider store={store} >
    <App>
      <BrowserRouter>
        { routes }
      </BrowserRouter>
    </App>
  </Provider>,
  target
);
