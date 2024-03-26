import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormPage.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
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
    setCredential("Demo-lition");
    setPassword("password");
    await handleSubmit();
  };

  return (
    <div className="loginForm">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} id="loginForm">
        Username or Email
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        Password
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.message && <p id="invalidCredentials">{errors.message}</p>}
        <div id="loginButton">
          <button type="submit">Log In</button>
          <button id="demoButton" type="button" onClick={handleDemoLogin}>
            Login as Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
