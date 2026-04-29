import { useState } from "react";
import { Link } from 'react-router-dom'
import "./Navbar.css"
import navLinks from "../../data/navLinks"
import { FaUser, FaShoppingCart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
// import { useOutletContext } from "react-router-dom";

const Navbar = ({ setCartOpen, cart }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className='Navbar'>
      <Link to="/" className="logo"><p>sheglam.</p></Link>

      <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "show-menu" : ""}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="link"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={menuOpen ? "nav-icons show-icons" : "nav-icons"}>

        <div className="cart-wrapper" onClick={() => setCartOpen(true)}>
          <FaShoppingCart className="cart-icon" />

          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>

        {user ? (
          <>
            <p className="user-name">
              {user.name}
            </p>

            <FaSignOutAlt
              className="logout-icon"
              onClick={logout}
              title="Logout"
            />
          </>
        ) : (
          <Link to="/login" className="login-link" onClick={() => setMenuOpen(false)}>
            <FaUser />
            <p>Log In</p>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
