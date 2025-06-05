import { NavLink } from "react-router-dom";
import '../assets/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Bookaroo</div>
      <div className="links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
          Home
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
          Books
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => (isActive ? "active" : "")}>
          Chatbot
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
          <i className="fa-solid fa-bag-shopping"></i><span className="nos">10</span>
        </NavLink>
        
      </div>
    </nav>
  );
}
