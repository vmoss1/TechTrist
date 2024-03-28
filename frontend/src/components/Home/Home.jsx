import "./Home.css";
import SignupFormPage from "../SignupFormPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);

  if (currentUser) {
    navigate("/pins");
  }

  return (
    <div id="home-page-container">
      <div id="home-paragraph-container">
        <h2>Sign up to get your new tech ideas</h2>
      </div>
      <div id="home-signup-form">
        <SignupFormPage />
      </div>
    </div>
  );
}
