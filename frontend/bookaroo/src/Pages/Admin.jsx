import React, { useEffect, useState } from "react";
import "../assets/admin.css";
import api_url from '../../public/Uri';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);


  useEffect(() => {
    fetch(`${api_url}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">📦 Bookaroo Orders Dashboard</h2>

      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">No orders yet !</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
  <tr>
    <th>#</th>
    <th>Order ID</th>
    <th>Phone</th>
    <th>Email</th>
    <th>Date</th>
    <th>Books</th>
  </tr>
</thead>
<tbody>
  {orders.map((order, i) => (
    <tr key={order._id}>
      <td>{i + 1}</td>
      <td>{order._id}</td>
      <td>{order.phone}</td>
      <td>{order.email}</td>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>
        <button
          className="view-btn"
          onClick={() => setSelectedOrder(order)}
        >
          View Orders
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
          {selectedOrder && (
  <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Order Summary</h2>
      <p><strong>Phone:</strong> {selectedOrder.phone}</p>
      <p><strong>Email:</strong> {selectedOrder.email}</p>
      <table className="order-items-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedOrder.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Amount: ₹{selectedOrder.totalAmount}</h3>
      <button className="close-btn" onClick={() => setSelectedOrder(null)}>x</button>
    </div>
  </div>
)}

        </div>
      )}
    </div>
  );
}
