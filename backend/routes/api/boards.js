const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Board, BoardPin, Pin } = require("../../db/models");

const router = express.Router();

//Get board by user
// require auth
router.get("/current", requireAuth, async (req, res, next) => {
  try {
    const currentBoards = await Board.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Pin,
        },
      ],
    });
    return res.json({ currentBoards });
  } catch (e) {
    next(e);
  }
});

//Create a board
// require auth
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { title } = req.body;

    const newBoard = await Board.create({
      userId: req.user.id,
      title,
    });

    return res.status(201).json(newBoard);
  } catch (e) {
    next(e);
  }
});

router.put("/:boardId", requireAuth, async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

router.delete("/:boardId", requireAuth, async (req, res, next) => {
  try {
    let { boardId } = req.params;
    const currentBoard = await Board.findByPk(boardId);

    if (!currentBoard) {
      return res.status(404).json({ message: "Board couldn't be found" });
    }

    const isCreator = currentBoard.userId === req.user.id;
    if (!isCreator) {
      return res
        .status(403)
        .json({ message: "You are not authorized to make this change" });
    }

    await currentBoard.destroy();

    return res.json({ message: "Successfully Destroyed" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
