import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { signout } from "./actions/userActions";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from './screens/OrderHistoryScreen'

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Flipkarta
            </Link>
          </div>
          <div>
            {cartItems.length > 0 ? (
              <>
                <Link to={`/cart/${cartItems._id}`}>
                  {" "}
                  Cart
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  {" "}
                  Cart
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </>
            )}
            <div className="dropdown">
              {userInfo ? (
                <>
                  <Link to="#">
                    {" "}
                    {userInfo.name} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orderhistory"> Order History </Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/offer"> Offer zone </Link>
                      <li>
                        <Link to="/#" onClick={signOutHandler}>
                          {" "}
                          SignOut{" "}
                        </Link>
                      </li>
                    </li>
                  </ul>
                </>
              ) : (
                <Link to="/signin">
                  <>
                    <Link to="#">
                      {" "}
                      Login <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/signin"> Sign In </Link>
                      </li>
                      <li>
                        <Link to="/signin"> Orders </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/signin"> Offer zone </Link>
                      </li>
                    </ul>
                  </>
                </Link>
              )}
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/product/:id" exact element={<ProductScreen />} />
            <Route path="/shipping" exact element={<ShippingAddressScreen />} />
            <Route path="/signin" exact element={<SigninScreen />} />
            <Route path="/register" exact element={<RegisterScreen />} />
            <Route path="/payment" exact element={<PaymentMethodScreen />} />
            <Route path="/placeorder" exact element={<PlaceOrderScreen />} />
            <Route path="/orders/:id" exact element={<OrderScreen />} />
            <Route path="/cart/:id" exact element={<CartScreen />} />
            <Route path="/orderhistory" exact element={<OrderHistoryScreen />} />
          </Routes>
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
