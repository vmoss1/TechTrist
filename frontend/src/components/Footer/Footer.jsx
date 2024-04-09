import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div id="footer">
      <p id="about-me">Find Me</p>
      <div id="footer-icons" style={{ fontSize: "35px", color: "black" }}>
        <Link id="github-link" to="https://github.com/vmoss1">
          <FaGithub />
        </Link>
        <Link id="github-link" to="https://www.linkedin.com/in/veronica-moss/">
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
}
