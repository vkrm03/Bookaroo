import { NavLink } from "react-router-dom";
import '../assets/Navbar.css';

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="logo"> Bookaroo</div>
      {/* <img src="./logo.png" alt="logo" style={{paddingTop: '3px', width: '25px', height: '25px'}}/> */}
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
          <i className="fa-solid fa-bag-shopping"></i><span className="nos">{props.cartCount}</span>
        </NavLink>
        
      </div>
    </nav>
  );
}
