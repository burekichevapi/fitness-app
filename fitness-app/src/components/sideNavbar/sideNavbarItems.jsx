import { Link } from "react-router-dom";

const NavbarItems = () => (
  <>
    <style>
      {`
        @media (max-width: 710px) {
          .hide-on-small-screen {
            display: none;
          }
        }
      `}
    </style>
    <ul className="nav flex-column bg-transparent mb-0">
      <li className="nav-item">
        <Link
          className="nav-link text-dark font-italic bg-light"
          to="/my-workout"
        >
          Favorites
        </Link>
      </li>
      <li className="nav-item hide-on-small-screen">
        <Link
          className="nav-link text-dark font-italic bg-light"
          to="/goals-progress"
        >
          My Progress
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-dark font-italic bg-light" to="/">
          Find Exercises
        </Link>
      </li>
    </ul>
  </>
);

export default NavbarItems;
