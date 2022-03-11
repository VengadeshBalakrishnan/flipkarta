import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
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
            <Link to="/cart"> Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
             </Link>
            <Link to="/signin"> Sign In </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/cart/:id" exact element={<CartScreen />} />
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/product/:id" exact element={<ProductScreen />} />
          </Routes>
        </main>
        <footer className="row center">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
