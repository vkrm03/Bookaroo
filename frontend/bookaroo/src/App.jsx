import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/assets/styles.css";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Chatbot from "./Pages/Chat";
import About from "./Pages/About";

function App() {
  return (
    <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
