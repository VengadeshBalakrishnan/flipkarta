import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import  thunk  from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { productListReducer, productDetailReducer } from "./reducers/productReducers";

const initialState = {
  cart:{
    cartItems: localStorage.getItem('cartItems') 
    ?  JSON.parse(localStorage.getItem('cartItems'))
    : []
  }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
export default store;
