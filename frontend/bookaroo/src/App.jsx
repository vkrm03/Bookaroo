import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useState} from "react";
import "../src/assets/styles.css";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Chatbot from "./Pages/Chat";
import Books from "./Pages/Books";
import About from "./Pages/About";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
    console.log(cart);
    
  };
  return (
    <div>
    <Router>
      <Navbar cartCount={cart.length ? cart.length : "0"}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books addToCart={addToCart}/>} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
