import { Link } from "react-router-dom";

const NavbarItems = () =>
  <ul className="nav flex-column bg-transparent mb-0">
    <li className="nav-item">
      <Link className="nav-link text-dark font-italic bg-light" to="/my-workout">Favorites</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-dark font-italic bg-light" to="/goals-progress">My Progress</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-dark font-italic bg-light" to="/">Find Exercises</Link>
    </li>
  </ul>;

export default NavbarItems;