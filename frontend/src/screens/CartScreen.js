import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const qty = location.state.qty || 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : Product Id: {id} qty: {qty}{" "}
      </p>
    </div>
  );
}
