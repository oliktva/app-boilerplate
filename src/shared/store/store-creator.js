import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

export let history;
if (typeof document !== 'undefined') {
  history = createHistory();
}

const middleware = [thunk, routerMiddleware(history)];

export default function storeCreator(reducers) {
  const combinedReducer = combineReducers(reducers);

  const composedEnhancers = compose(
    applyMiddleware(...middleware)
  );

  return createStore(
    connectRouter(history)(combinedReducer),
    composedEnhancers
  );
}
