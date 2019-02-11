import { createStore, combineReducers, applyMiddleware, compose, Store as ReduxStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import reducers from 'src/shared/reducers/reducers';

import { Store } from 'src/shared/types/store';

export let history: History = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

export default function storeCreator(): ReduxStore<Store.All> {
  const combinedReducer = combineReducers<Store.All>(reducers);

  const composedEnhancers = compose(
    applyMiddleware(...middleware)
  );

  return createStore<Store.All, any,any,any>(
    connectRouter(history)(combinedReducer),
    composedEnhancers
  );
}
