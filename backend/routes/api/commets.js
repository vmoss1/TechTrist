const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Comment } = require("../../db/models");
const comment = require("../../db/models/comment");

const router = express.Router();

//Delete comment by commentID
router.delete("/:commentId", requireAuth, async (req, res, next) => {
  let { commentId } = req.params;
  commentId = +commentId;

  try {
    const currComment = await Comment.findByPk(commentId);

    if (!currComment) {
      return res.status(404).json({ message: "Comment could not be found" });
    }

    await currComment.destroy();

    return res.json({ message: "Comment deleted" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
