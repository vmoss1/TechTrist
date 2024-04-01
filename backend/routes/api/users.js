const express = require("express");
const bcrypt = require("bcryptjs");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "",
  singleMulterUpload("profilePicture"),
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const profileImageUrl = await singlePublicFileUpload(req.file);
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      profilePicture: profileImageUrl,
    });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      profilePicture: user.profilePicture,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  }
);

module.exports = router;
