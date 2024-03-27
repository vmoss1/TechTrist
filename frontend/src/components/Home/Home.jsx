import "./Home.css";
import SignupFormPage from "../SignupFormPage";

export default function Home() {
  return (
    <div id="home-page-container">
      <div id="home-paragraph-container">
        <h2>Sign up to get your ideas</h2>
      </div>
      <div id="home-signup-form">
        <SignupFormPage />
      </div>
    </div>
  );
}
