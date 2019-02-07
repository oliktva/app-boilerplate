import React from 'react';
import path from 'path';
import fs from 'fs';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import reducers from 'src/shared/reducers/reducers';
import routes from 'src/shared/routes';

import App from 'src/client/app';

const app = express();
const port = 3030;

//Serve static files
app.use(express.static('build', { index: false }));

// This is fired every time the server side receives a request
app.use('/', handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(combineReducers(reducers), preloadedState);

  // Render the component to a string
  const content = renderToString(
    <Provider store={store} >
      <App>
        <StaticRouter location={req.url} context={{}}>
          {routes}
        </StaticRouter>
      </App>
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  const indexFile = path.resolve('build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${content}</div><script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${
  JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}
        </script>`
      )
    );
  });
}

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`)
});
