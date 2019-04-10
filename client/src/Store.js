import rootReducer from './reducers/reducer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
};

export default configureStore;
