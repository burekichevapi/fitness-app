import Constants from '../../constants';
import { Link } from "react-router-dom";

const NavbarHeader = () =>
  <div>
    <img src={Constants.AppIconUrl} alt="pink-dumbbell" width="35" className="mr-3 rounded-circle img-thumbnail shadow-sm" />
    <Link className="navbar-brand" to="/">Fitness App</Link>
  </div>

export default NavbarHeader;