import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = () => {
    dispatch(sessionActions.logout());
    closeMenu();
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-dropdown-container">
      {user && (
        <div className="profile-button-container">
          <button
            style={{ fontSize: "30px" }}
            onClick={toggleMenu}
            className="profile-button"
          >
            <CgProfile />
          </button>
        </div>
      )}
      <div id="profile-button-dropdown">
        {user && showMenu && (
          <ul className={ulClassName} ref={ulRef}>
            <p id="currentlyIn">Currently in</p>
            <div id="ul-dropdown">
              <div>{user.firstName}</div>
              <div>{user.email}</div>
              <div>
                <button id="logout-button" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          </ul>
        )}
      </div>
      {!user && (
        <div className="login-signup-buttons">
          <OpenModalButton
            buttonText={<p id="nav-login-button">Log in</p>}
            onItemClick={closeMenu}
            modalComponent={<LoginFormPage />}
          />
          <OpenModalButton
            buttonText={<p id="nav-signup-button">Sign up</p>}
            onItemClick={closeMenu}
            modalComponent={<SignupFormPage />}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
