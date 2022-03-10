import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import  thunk  from "redux-thunk";
import { productListReducer, productDetailReducer } from "./reducers/productReducers";

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
