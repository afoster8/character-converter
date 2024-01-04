import { Outlet, Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="navbar-container">
          <Link to="/">Home</Link>
          <Link to="/converter">Converter</Link>
        </div>
      </nav>

      <Outlet />
    </>
  )
}
export default Navbar;