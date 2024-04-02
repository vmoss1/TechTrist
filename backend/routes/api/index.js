const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const pinsRouter = require("./pins.js");
const boardsRouter = require("./boards.js");
const commentsRouter = require("./commets.js");
const followerRouter = require("./follower.js");

router.use(restoreUser);
const { requireAuth } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/pins", pinsRouter);

router.use("/boards", boardsRouter);

router.use("/comments", commentsRouter);

router.use("/followers", followerRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
