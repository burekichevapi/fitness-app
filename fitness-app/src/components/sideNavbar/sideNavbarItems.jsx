import { Link } from "react-router-dom";

const NavbarItems = () =>
  <ul className="nav flex-column bg-dark mb-0">
    <li className="nav-item">
      <Link className="nav-link text-dark font-italic bg-light" to="/">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-dark font-italic bg-light" to="/my-workout">My Workout</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-dark font-italic bg-light" to="/goals-progress">Goals + Progress</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-dark font-italic bg-light" to="/find-exercises">Find Exercises</Link>
    </li>
  </ul>;

export default NavbarItems;