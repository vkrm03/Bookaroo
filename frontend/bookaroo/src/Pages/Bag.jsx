import React, { useState } from 'react';
import axios from 'axios';
import '../assets/bag.css';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart({ cart, setCart }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    setCart(updatedCart);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    toast.success('Book removed from your bag.', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      transition: Slide,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const clearCart = () => {
    setCart([]);
    setPhone('');
    setEmail('');
    toast.success('Cleared your bag.', {
      position: 'top-center',
      autoClose: 100,
      hideProgressBar: true,
      transition: Slide,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  
  const handleCheckout = async () => {
  if (!phone || !email) {
    toast.error('Please enter the details.', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      transition: Slide,
      pauseOnHover: false,
      draggable: false,
    });
    return;
  }

  if (cart.length === 0) {
    toast.error('Your bag is empty!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      transition: Slide,
      pauseOnHover: false,
      draggable: false,
    });
    return;
  }

  const orderData = {
    phone,
    email,
    items: cart.map(item => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
    totalAmount: totalPrice,
  };

  toast.promise(
    axios.post('http://localhost:5000/checkout', orderData),
    {
      pending: 'Placing your order...',
      success: 'Order placed successfully! Check your email.',
      error: 'Failed to place order',
    },
    {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,  
      transition: Slide,
      pauseOnHover: false,
      draggable: false,
    }
  ).then(() => {
    clearCart();
  }).catch((error) => {
    console.error(error);
  });
};



  return (
    <div className="cart-container">
      <ToastContainer />
      <h2>Your Book Bag</h2>
      {cart.length === 0 ? (
        <p className="empty-text">Your bag is empty. Start adding books!</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((book, index) => (
              <div className="cart-item" key={index}>
                <img src={book.cover_id} alt={book.title} />
                <div className="cart-details">
                  <h4>{book.title}</h4>
                  <p className="author">by {book.author}</p>
                  <p className="price">₹{book.price * book.quantity}</p>
                  <div className="quantity-box">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <span>{book.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <p>Total Books: {totalItems}</p>
            <p>Total Price: ₹{totalPrice}</p>

            <input
              type="tel"
              placeholder="Enter your phone number"
              className="checkout-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="checkout-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={clearCart} className="clear-btn">Clear All</button>
            <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
