import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { SiKingstontechnology } from "react-icons/si";
import "./SignupFormPage.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      setErrors({ profilePicture: "Please provide an image" });
      return;
    }
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
          profilePicture: image,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div id="signup-form-container">
      <div id="bio-tech" style={{ fontSize: "40px" }}>
        <SiKingstontechnology />
      </div>
      <div id="form-container">
        <h1 id="welcome-tech">Welcome to TechTrist</h1>
        <h3 id="find-new">Find new ideas to try</h3>
        <form id="signup-form" onSubmit={handleSubmit}>
          Email
          <label>
            <input
              placeholder="Add your email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="errors">{errors.email}</p>}
          Username
          <label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="errors">{errors.username}</p>}
          First Name
          <label>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          Last Name
          <label>
            <input
              type="text"
              value={lastName}
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          Password
          <label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="errors">{errors.password}</p>}
          Confirm Password
          <label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p className="errors">{errors.confirmPassword}</p>
          )}
          Upload a profile picture
          <label id="signup-file-upload">
            <input id="signup-file-upload" type="file" onChange={updateFile} />
          </label>
          {errors.profilePicture && (
            <p className="errors">{errors.profilePicture}</p>
          )}
          <button id="signup-button-modal" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
