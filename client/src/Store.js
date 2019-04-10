import rootReducer from './reducers/reducer';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
};

export default configureStore;
