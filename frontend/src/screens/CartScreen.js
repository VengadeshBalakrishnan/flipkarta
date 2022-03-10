import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function CartScreen(props) {
  const { id } = useParams();
  const location = useLocation();
  const qty = location.state.qty || 1;
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : Product Id: {id} qty: {qty}{" "}
      </p>
    </div>
  );
}
