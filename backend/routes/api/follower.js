const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Follower, User } = require("../../db/models");

const router = express.Router();

router.get("/:userId/followers", requireAuth, async (req, res, next) => {
  let { userId } = req.params;
  userId = +userId;

  try {
    const followers = await Follower.findAll({
      include: {
        model: User,
        where: {
          as: "followers",
        },
      },
    });
    return res.json(followers);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
