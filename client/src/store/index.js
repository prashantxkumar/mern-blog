import { applyMiddleware } from "redux";
import { createStore } from "redux";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { PostReducer, FetchPosts, FetchPost, UpdatePost, UpdateImage } from "./reducers/PostReducer";

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
});

const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;