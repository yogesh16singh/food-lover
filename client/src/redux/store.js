import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { createLogger } from 'redux-logger';

// redux middlewares
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
    const logger = createLogger();
    // const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

export default store;