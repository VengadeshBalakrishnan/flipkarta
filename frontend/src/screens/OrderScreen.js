import React, { useEffect, useLayoutEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { removeFromCart } from "../actions/cartActions";
import { detailsOrder, payOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

export default function OrderScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const orderPay = useSelector((state) => state.orderPay);
  const { error: errorPay, success: successPay } = orderPay;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const userDetails = useSelector((state) => state.userSignin);
  const {userInfo} = userDetails;

  useEffect(() => {
    //const addPayPalScript = async () => {
    //   const { data } = await Axios.get("/api/config/paypal");
    //   const script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.src = "payPal config id need to add";
    //  };
    dispatch({ type: ORDER_PAY_RESET });
    dispatch(detailsOrder(id));
  }, [dispatch, id]);
  

  const successPaymentHandler = () => {    
    let paymentData = {
      id: order._id,
      email_address: userInfo.email,
      status: "Completed",
      update_time: Date().toLocaleString(),
    };
    alert("Payment Done");
    dispatch(payOrder(order, paymentData));
    navigate(`/orders/${id}`);   
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1> Order : {order._id} </h1>

      <div className="row top">
        <div className="col-2 ">
          <ul>
            <li>
              <div className="card card-body">
                <h2> Shipping </h2>
                <p>
                  <strong>Name:</strong>
                  {order.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Deliver</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2> Payment </h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2> Order Items </h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} * $ {item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li className="row">
                <div> Items</div>
                <div> $ {order.itemsPrice.toFixed(2)} </div>
              </li>
              <li className="row">
                <div> Shipping</div>
                <div>$ {order.shippingPrice.toFixed(2)}</div>
              </li>
              <li className="row">
                <div> Tax</div>
                <div>$ {order.taxPrice.toFixed(2)}</div>
              </li>
              <li className="row">
                <div>
                  {" "}
                  <strong> Order Total </strong>
                </div>
                <div>
                  <strong> $ {order.totalPrice.toFixed(2)}</strong>
                </div>
              </li>
            </ul>{" "}
            {!order.isPaid && (
              <div>
                <ul>
                  <li>
                    {/* <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    >
                      {" "}
                    </PayPalButton> */}
                    <button
                      className="primary block"
                      onClick={successPaymentHandler}
                    >
                      <strong> Pay Now... </strong>
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div>
              {/* <button className="primary block" onClick = {successPaymentHandler}> <strong> Cash (COD)</strong></button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
