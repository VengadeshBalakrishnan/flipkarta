import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import  thunk  from "redux-thunk";
import { listOrderMine } from "./actions/orderActions";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./reducers/orderReducer";
import { productListReducer, productDetailReducer } from "./reducers/productReducers";
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null
  },
  cart:{
    cartItems: localStorage.getItem('cartItems') 
    ?  JSON.parse(localStorage.getItem('cartItems'))
    : [],
    shippingAddress: localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
    paymentMethod: 'paypal'
  }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer, 
    orderPay: orderPayReducer,
    listOrders: listOrderMine
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
export default store;
