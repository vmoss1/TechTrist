// import SignupFormPage from "../SignupFormPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Home.css";
import SignupFormPage from "../SignupFormPage";

export default function Home() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);

  if (currentUser) {
    navigate("/pins");
  }

  return (
    <>
      <div id="home-page-container">
        <div id="home-paragraph-container">
          <h2 id="paragraph-home-page">Sign up to get your new tech ideas</h2>
        </div>
        <div id="home-right-side-container">
          <div id="home-right-side-title">
            <SignupFormPage />
          </div>
        </div>
      </div>
      <div id="footer-home">
        <Footer />
      </div>
    </>
  );
}
