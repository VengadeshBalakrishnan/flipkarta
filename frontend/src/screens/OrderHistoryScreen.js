import React from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen() {
  const listOrders = useSelector((state) => state.listOrders);
  const { loading, error, orders } = listOrders;

  return (
    <div>
      <h1> Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox></MessageBox>
      ) : (
        <table className="table">
          <thead>
            <th> ID</th>
            <th> DATE</th>
            <th> TOTAL</th>
            <th> PAID</th>
            <th> DELIVERED</th>
            <th> ACTIONS</th>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td> {order._id}</td>
                <td> {order.createdAt}</td>
                <td> {order.totalPrice}</td>
                <td> {order.isPaid ? order.paidAt.substring(0 , 10) : 'No'}</td>
                <td> {order.isDelivered ? order.deliveredAt.substring(0 , 20) : 'No'}</td>
                <td>
                     <button type="button" className="small" onClick={() => {}}> </button></td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
