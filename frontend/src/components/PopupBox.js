import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { payOrder } from "../actions/orderActions";

export default function PopupBox(props) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = params;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const userDetails = useSelector((state) => state.userSignin);
  const {userInfo} = userDetails;

  const paymentHandler = () => {    
    let paymentData = {
      id: order._id,
      email_address: userInfo.email,
      status: "Completed",
      update_time: Date().toLocaleString(),
    };   
    dispatch(payOrder(order, paymentData));
    navigate(`/orders/${id}`);
  };

  return (
    <Popup 
    trigger={<button className="primary block"> Pay Now </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Payment Gateway </div>
        <div className="content">
          {' '}
            Payment Gateway
        </div>
        <div className="actions">
          <Popup 
            trigger={<button className="button" hidden> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="successButton"
            onClick={paymentHandler}
            
          >Payment Success </button>
          <button
            className="errorButton"
            onClick={paymentHandler
            }
          >
            Payment Fail           
          </button>
          <button
            className="warningButton"
            onClick={paymentHandler}           
          >
            Payment Pending
          </button>
        </div>
      </div>
    )}
  </Popup>
  );
}
