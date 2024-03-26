import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  //   const isLoggedIn = useSelector((state) => state.session.user !== null);

  return (
    <nav>
      <div>
        <NavLink id="nav-home-button" to="/">
          TechTrist
        </NavLink>
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
