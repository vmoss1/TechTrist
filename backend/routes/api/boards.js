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

//Get single board by id
router.get("/:boardId", async (req, res, next) => {
  let { boardId } = req.params;
  boardId = +boardId;
  try {
    const currentBoard = await Board.findByPk(boardId, {
      include: [
        {
          model: Pin,
        },
      ],
    });

    if (!currentBoard) {
      return res.status(404).json({ message: "Board couldn't be found" });
    }

    return res.json({ Board: currentBoard });
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
//Edit a route
//require auth
router.put("/:boardId", requireAuth, async (req, res, next) => {
  let { boardId } = req.params;
  boardId = +boardId;
  try {
    const { title } = req.body;

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

    if (title !== undefined) currentBoard.title = title; // inputted !==undefined to ensure that the model validators work

    await currentBoard.save();

    return res.json({
      id: currentBoard.id,
      userID: currentBoard.userID,
      title: currentBoard.title,
    });
  } catch (e) {
    next(e);
  }
});
// Delete board
// require auth
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

//Add a pin to a board
// require auth
router.post("/:boardId/pins/:pinId", requireAuth, async (req, res, next) => {
  try {
    let { boardId, pinId } = req.params;
    boardId = +boardId;
    pinId = +pinId;

    const board = await Board.findByPk(boardId);
    const pin = await Pin.findByPk(pinId);

    if (!board || !pin) {
      return res.json({ message: "Pin or Board does not exist" });
    }

    const isCreator = board.userId === req.user.id;
    if (!isCreator) {
      return res
        .status(403)
        .json({ message: "You are not authorized to make this change" });
    }

    // Create a record in BoardPin table to associate the pin with the board
    await BoardPin.create({ boardId, pinId });

    res.status(200).json({ message: "Pin added to board successfully" });
  } catch (e) {
    next(e);
  }
});
// Delete pin from board
// require auth
router.delete("/:boardId/pins/:pinId", requireAuth, async (req, res) => {
  let { boardId, pinId } = req.params;
  boardId = +boardId;
  pinId = +pinId;

  try {
    const board = await Board.findByPk(boardId);
    const pin = await Pin.findByPk(pinId);

    if (!board || !pin) {
      return res.json({ message: "Pin or Board does not exist" });
    }
    // Find and delete the association record from the BoardPin table

    const isCreator = board.userId === req.user.id;
    if (!isCreator) {
      return res
        .status(403)
        .json({ message: "You are not authorized to make this change" });
    }

    const deletedAssociation = await BoardPin.destroy({
      where: { boardId, pinId },
    });

    if (deletedAssociation === 0) {
      return res.status(404).json({ message: "Association not found" });
    }

    res.status(200).json({ message: "Association deleted successfully" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
