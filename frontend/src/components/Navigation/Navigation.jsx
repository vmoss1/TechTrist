import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import { Link } from "react-router-dom";
import { SiKingstontechnology } from "react-icons/si";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  //   const isLoggedIn = useSelector((state) => state.session.user !== null);

  return (
    <nav>
      <div>
        <div id="nav-logo-container">
          <div id="bio-tech" style={{ fontSize: "30px" }}>
            <SiKingstontechnology />
            <NavLink id="nav-home-button" to="/pins">
              TechTrist
            </NavLink>
          </div>
          <Link to={"/pins"} id="home-button">
            Home
          </Link>
          <Link to={"/pins/new"} id="home-button">
            Create
          </Link>
        </div>
      </div>

      {isLoaded && <ProfileButton user={sessionUser} />}
    </nav>
  );
}

export default Navigation;
