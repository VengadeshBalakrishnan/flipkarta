import React from "react";

export default function OfferOrder(props) {
  const { order, key } = props;

  const orderItemList = () => {
      // :: Based on Click need to show
  };
  return (
    <div>
      <div key={key} className="orderChild">
        <img className="orderImg" src={order.url} alt="Offer" />
        <div className="caption" onMouseOver={orderItemList}>
          {order.name}
        </div>
      </div>
    </div>
  );
}
