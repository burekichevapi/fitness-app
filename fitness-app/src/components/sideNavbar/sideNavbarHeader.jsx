import { Link } from "react-router-dom";
import config from "../../config.json";

const NavbarHeader = () =>
  <div>
    <img src={config.appLogoUrl} alt="pink-dumbbell" width="35" className="mr-3 rounded-circle img-thumbnail shadow-sm" />
    <Link className="navbar-brand" to="/">Fitness App</Link>
  </div>

export default NavbarHeader;