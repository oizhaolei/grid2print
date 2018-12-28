import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import api from '../middleware/api';

export default function configureStore(initialState) {
  const middleware = [thunk, api];
  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}