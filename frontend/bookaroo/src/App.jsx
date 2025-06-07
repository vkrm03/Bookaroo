import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "../src/assets/styles.css";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Chatbot from "./Pages/Chat";
import Books from "./Pages/Books";
import About from "./Pages/About";
import Admin from "./Pages/Admin";
import Cart from "./Pages/Bag";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBookIndex = prevCart.findIndex(
        (item) => item.title === book.title
      );

      if (existingBookIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingBookIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Router>
        <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books addToCart={addToCart} />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
