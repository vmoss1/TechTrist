const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Follower, User } = require("../../db/models");
const follower = require("../../db/models/follower");

const router = express.Router();

// GET route to retrieve followers of the current user
router.get("/current", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const followers = await Follower.findAll({
      where: {
        followerId: userId,
      },
    });

    res.json({ followers });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
