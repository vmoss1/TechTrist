import { NavLink } from "react-router-dom";
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
          </div>
          <NavLink id="nav-home-button" to="/">
            TechTrist
          </NavLink>
        </div>
      </div>
      {isLoaded && (
        <div id="topButton">
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
