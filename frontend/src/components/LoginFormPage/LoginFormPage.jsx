import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormPage.css";
import { SiKingstontechnology } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    navigate("/pins");
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = async () => {
    setCredential("CodeWizard");
    setPassword("password");
    await handleSubmit();
  };

  return (
    <div id="signup-form-container">
      <div id="bio-tech" style={{ fontSize: "40px" }}>
        <SiKingstontechnology />
      </div>
      <div id="form-container">
        <h1 id="welcome-tech">Welcome to TechTrist</h1>

        <form id="signup-form" onSubmit={handleSubmit}>
          Credential
          <label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p>{errors.credential}</p>}
          Password
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <button id="login-button-modal" type="submit">
            Log In
          </button>
          <button id="demo-login-button" onClick={handleDemoLogin}>
            Demo User Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
